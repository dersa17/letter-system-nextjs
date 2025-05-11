import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mapping role ke path dashboard
const roleRedirectMap: Record<number, string> = {
  1: "/admin/dashboard",
  2: "/mo/dashboard",
  3: "/kaprodi/dashboard",
  4: "/mahasiswa/home",
};

// Akses yang diizinkan per role
const roleAccessPaths: Record<number, string[]> = {
  1: ["/admin"],
  2: ["/mo"],
  3: ["/kaprodi"],
  4: ["/mahasiswa"],
};




export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const pathname = request.nextUrl.pathname;
  const role = token.user?.idRole;

  if (pathname === "/") {
    const redirectPath = roleRedirectMap[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  const allowedPaths = roleAccessPaths[role] || [];
  const isAllowed = allowedPaths.some((allowedPath) => pathname.startsWith(allowedPath));

  if (!isAllowed) {
    return new NextResponse("Forbidden", { status: 403 }); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/mo/:path*", "/kaprodi/:path*", "/mahasiswa/:path*"],
};
