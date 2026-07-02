/**
 * Typed error classes for the API layer.
 *
 * - `ApiError` — base class. Carries `status` and `message`.
 * - `AuthError` — thrown on 401/403. Used by the client to trigger refresh or logout.
 * - `NetworkError` — thrown on connection failures (no status code).
 * - `ValidationError` — thrown when the response fails zod parsing.
 */
export class ApiError extends Error {
  readonly status: number
  readonly data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

export class AuthError extends ApiError {
  constructor(message: string, status: number, data?: unknown) {
    super(message, status, data)
    this.name = "AuthError"
  }
}

export class NetworkError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message)
    this.name = "NetworkError"
  }
}

export class ValidationError extends Error {
  constructor(message: string, readonly issues?: unknown) {
    super(message)
    this.name = "ValidationError"
  }
}