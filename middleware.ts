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

  // Bypass middleware untuk halaman login dan auth API
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/debug")) {
    return NextResponse.next();
  }

  // Ambil token next-auth dari cookie
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production" });

  console.log("TOKEN:", token);
  console.log("SECRET:", process.env.NEXTAUTH_SECRET);
  console.log("Cookies:", request.cookies.getAll());
  console.log("Node Env:", process.env.NODE_ENV);
  console.log("URL:", process.env.NEXTAUTH_URL);

  // Kalau belum login, redirect ke login page
  if (!token?.sub) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const method = request.method;
  const role = token.role?.id;

  // Jika mengakses root '/', redirect ke dashboard sesuai role
  if (pathname === "/") {
    const redirectPath = roleRedirectMap[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // Cek akses role berdasarkan path dan method
  if (pathname.startsWith("/api")) {
    // API: cek role + method
    const allowedRoles = Object.entries(pathMethodAccess)
      .find(([path]) => pathname.startsWith(path))?.[1][method] || [];
    if (!allowedRoles.includes(role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  } else {
    // Halaman: cek role untuk GET saja
    const allowedRoles = Object.entries(pathMethodAccess)
      .find(([path]) => pathname.startsWith(path))?.[1].GET || [];
    if (!allowedRoles.includes(role)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // Lanjutkan request normal
  return NextResponse.next();
}

// Matcher semua route yang butuh middleware
export const config = {
  matcher: [
    "/",
    "/admin/:path",
    "/mo/:path",
    "/kaprodi/:path",
    "/mahasiswa/:path",
    "/api/:path*",
    "/profile",
  ],
};