import { z } from "zod"

import { ApiError, AuthError, NetworkError } from "./errors"

/**
 * Base URL for the backend.
 *
 * Set `NEXT_PUBLIC_API_URL` in `.env.local` to override.
 * Cookies are sent automatically because we use `credentials: "include"`.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://dev2.projectyard.top"

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown
  query?: Record<string, string | number | boolean | undefined>
  /** Skip the singleton 401-refresh logic (used by the refresh call itself). */
  skipRefresh?: boolean
}

/**
 * Internal singleton to deduplicate concurrent refresh attempts.
 * Multiple 401s share one in-flight refresh — no thundering herd.
 */
let refreshPromise: Promise<{ access: string; refresh: string }> | null = null

async function performRefresh(): Promise<{ access: string; refresh: string }> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      // We call refresh through Next.js's own /api/auth/refresh route handler,
      // which has access to the httpOnly cookies. This keeps refresh tokens
      // out of JavaScript entirely.
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      })
      if (!res.ok) throw new AuthError("Refresh failed", res.status)
      const data = await res.json()
      return data as { access: string; refresh: string }
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

/**
 * Build a full URL with optional query string.
 */
function buildUrl(
  path: string,
  query?: FetchOptions["query"]
): string {
  const base = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
  if (!query) return base
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined) continue
    params.set(k, String(v))
  }
  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
}

/**
 * Low-level fetch wrapper. Most callers should use `apiFetch` instead.
 *
 * Behaviour:
 * - Always sends `credentials: "include"` so httpOnly cookies travel.
 * - Sends `Content-Type: application/json` for requests with bodies.
 * - On 401 (and not `skipRefresh`), attempts a singleton refresh, then
 *   replays the original request once.
 * - Throws `ApiError` on non-2xx; `AuthError` on 401/403; `NetworkError`
 *   on connection failures.
 */
export async function apiFetch<T = unknown>(
  path: string,
  opts: FetchOptions = {}
): Promise<T> {
  const { body, query, skipRefresh, headers, ...rest } = opts

  const init: RequestInit = {
    credentials: "include",
    ...rest,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
  }

  if (body !== undefined) {
    init.body = typeof body === "string" ? body : JSON.stringify(body)
  }

  const url = buildUrl(path, query)

  const startedAt =
    typeof performance !== "undefined" ? performance.now() : Date.now()

  // eslint-disable-next-line no-console
  console.log("[api] → request", {
    method: init.method ?? "GET",
    url,
    body: body !== undefined ? safeStringify(body) : undefined,
    skipRefresh,
  })

  let response: Response
  try {
    response = await fetch(url, init)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api] ✗ network error", { url, error: err })
    throw new NetworkError("Network request failed", err)
  }

  // Attempt refresh on 401 once.
  if (response.status === 401 && !skipRefresh) {
    // eslint-disable-next-line no-console
    console.warn("[api] ↻ 401 received, attempting refresh", { url })
    try {
      await performRefresh()
      // Replay the original request with new cookies.
      // eslint-disable-next-line no-console
      console.log("[api] ↻ replaying original request after refresh", { url })
      response = await fetch(url, {
        ...init,
        // New RequestInit — no replay of headers object reference issues.
      })
    } catch (refreshErr) {
      // eslint-disable-next-line no-console
      console.error("[api] ✗ refresh failed", { url, error: refreshErr })
      throw new AuthError("Unauthorized", 401)
    }
  }

  if (!response.ok) {
    const errorBody = await safeJson(response)
    const message =
      (errorBody && typeof errorBody === "object" && "detail" in errorBody
        ? String((errorBody as { detail: unknown }).detail)
        : null) ??
      response.statusText ??
      `Request failed with status ${response.status}`

    const elapsed =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      startedAt

    // eslint-disable-next-line no-console
    console.error("[api] ✗ response error", {
      method: init.method ?? "GET",
      url,
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
      message,
      elapsedMs: Math.round(elapsed),
    })

    if (response.status === 401 || response.status === 403) {
      throw new AuthError(message, response.status, errorBody)
    }
    throw new ApiError(message, response.status, errorBody)
  }

  // 204 No Content — return undefined cast.
  if (response.status === 204) {
    // eslint-disable-next-line no-console
    console.log("[api] ← response", {
      method: init.method ?? "GET",
      url,
      status: response.status,
      body: null,
    })
    return undefined as T
  }

  const data = await safeJson(response)
  const elapsed =
    (typeof performance !== "undefined" ? performance.now() : Date.now()) -
    startedAt
  // eslint-disable-next-line no-console
  console.log("[api] ← response", {
    method: init.method ?? "GET",
    url,
    status: response.status,
    elapsedMs: Math.round(elapsed),
    body: data,
  })
  return data as T
}

/**
 * Best-effort JSON serialiser for console logs that won't throw on
 * circular references. Falls back to a placeholder.
 */
function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value)
  } catch {
    return "[unserialisable]"
  }
}

/**
 * Same as `apiFetch` but validates the response shape with a zod schema.
 */
export async function apiFetchSchema<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  opts: FetchOptions = {}
): Promise<z.infer<TSchema>> {
  const data = await apiFetch<unknown>(path, opts)
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    // Surface a clear error if the backend changes shape.
    throw new Error(
      `Response validation failed for ${path}: ${parsed.error.message}`
    )
  }
  return parsed.data
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}