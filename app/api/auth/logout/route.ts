import { NextResponse } from "next/server"

import { clearAuthCookies } from "@/server/auth/actions"

/**
 * POST /api/auth/logout
 *
 * Clears the httpOnly auth cookies. The backend's logout endpoint is
 * best-effort — even if it fails, we always clear local cookies so the
 * browser stops treating the user as authenticated.
 */
export async function POST() {
  await clearAuthCookies()
  return NextResponse.json({ ok: true }, { status: 200 })
}