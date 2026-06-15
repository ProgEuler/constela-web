import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const ROLE_HOME: Record<string, string> = {
  "super-admin": "/super-admin",
  admin: "/admin",
  moderator: "/moderator",
  support: "/support",
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function proxy(request: NextRequest) {
//   const token = request.cookies.get("session")?.value

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET)
//     const role = payload.role as string
//     const destination = ROLE_HOME[role] ?? "/login"
//     return NextResponse.redirect(new URL(destination, request.url))
//   } catch {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }
}

export const config = {
  matcher: ["/"],
}
