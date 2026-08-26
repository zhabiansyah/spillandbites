import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "sb_session";

// Halaman-halaman di bawah /admin/superadmin hanya boleh diakses role superadmin.
const SUPERADMIN_ONLY_PREFIXES = ["/admin/users", "/admin/promos-manage", "/admin/analytics"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const raw = req.cookies.get(SESSION_COOKIE)?.value;
  if (!raw) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  let role: string | null = null;
  try {
    const decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    role = decoded.role;
  } catch {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const needsSuperadmin = SUPERADMIN_ONLY_PREFIXES.some((p) =>
    pathname.startsWith(p)
  );
  if (needsSuperadmin && role !== "superadmin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
