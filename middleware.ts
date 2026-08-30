import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin login page ko direct access allow karo
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Admin ke tamam pages protect karo
  if (pathname.startsWith("/admin")) {
    const isLoggedIn =
      request.cookies.get("admin_logged_in")?.value === "true";

    // Login nahi hai to login page par redirect
    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", request.url);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};