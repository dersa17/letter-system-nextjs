import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roleRedirectMap: Record<number, string> = {
  1: "/admin/dashboard",
  2: "/mo/dashboard",
  3: "/kaprodi/dashboard",
  4: "/mahasiswa/home",
};

const pathMethodAccess: Record<string, Record<string, number[]>> = {
  "/admin": { GET: [1] },
  "/mo": { GET: [2] },
  "/kaprodi": { GET: [3] },
  "/mahasiswa": { GET: [4] },
  "/profile": { GET: [1, 2, 3, 4], PATCH: [1, 2, 3, 4] },
  "/api/course": { GET: [1, 2, 3, 4], POST: [1] },
  "/api/profile": { GET: [1, 2, 3, 4], PATCH: [1, 2, 3, 4] },
  "/api/letter": { GET: [2, 3, 4], POST: [4], DELETE: [4], PATCH: [2, 3] },
  "/api/user": { GET: [1], POST: [1], DELETE: [1], UPDATE: [1] },
  "/api/major": { GET: [1], POST: [1], DELETE: [1], UPDATE: [1] },
  "/api/role": { GET: [1] },
  "/api/dashboard": { GET: [1, 2, 3] },
  "/api/notification": { GET: [1, 2, 3, 4], PATCH: [1, 2, 3, 4] },
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Bypass middleware untuk auth API
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Ambil token dari cookie
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const role = token?.role?.id;
  const method = request.method;

  // ===== CASE: User belum login =====
  if (!token?.sub) {
    // biarkan akses ke /login
    if (pathname.startsWith("/login")) {
      return NextResponse.next();
    }
    // kalau buka selain login → paksa ke /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ===== CASE: User sudah login =====

  // Jika akses /login → redirect ke dashboard sesuai role
  if (pathname.startsWith("/login")) {
    const redirectPath = roleRedirectMap[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // Jika akses root "/" → redirect ke dashboard sesuai role
  if (pathname === "/") {
    const redirectPath = roleRedirectMap[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // Cek akses role berdasarkan path & method
  if (pathname.startsWith("/api")) {
    const allowedRoles =
      Object.entries(pathMethodAccess).find(([path]) =>
        pathname.startsWith(path)
      )?.[1][method] || [];
    if (!allowedRoles.includes(role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  } else {
    const allowedRoles =
      Object.entries(pathMethodAccess).find(([path]) =>
        pathname.startsWith(path)
      )?.[1].GET || [];
    if (!allowedRoles.includes(role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // lanjut request normal
  return NextResponse.next();
}

// Matcher semua route yang butuh middleware
export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/mo/:path*",
    "/kaprodi/:path*",
    "/mahasiswa/:path*",
    "/api/:path*",
    "/profile",
  ],
};
