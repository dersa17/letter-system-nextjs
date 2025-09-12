import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

// Role → path tujuan hanya digunakan client-side, bukan di middleware
const pathMethodAccess: Record<string, Record<string, number[]>> = {
  "/admin": {
    GET: [1],
  },
  "/mo": {
    GET: [2],
  },
  "/kaprodi": {
    GET: [3],
  },
  "/mahasiswa": {
    GET: [4],
  },
  "/profile": {
    GET: [1, 2, 3, 4],
    PATCH: [1, 2, 3, 4],
  },
  "/api/course": {
    GET: [1, 2, 3, 4],
    POST: [1],
  },
  "/api/profile": {
    GET: [1, 2, 3, 4],
    PATCH: [1, 2, 3, 4],
  },
  "/api/letter": {
    GET: [2, 3, 4],
    POST: [4],
    DELETE: [4],
    PATCH: [2, 3],
  },
  "/api/user": {
    GET: [1],
    POST: [1],
    DELETE: [1],
    UPDATE: [1],
  },
  "/api/major": {
    GET: [1],
    POST: [1],
    DELETE: [1],
    UPDATE: [1],
  },
  "/api/role": {
    GET: [1],
  },
  "/api/dashboard": {
    GET: [1, 2, 3],
  },
  "/api/notification": {
    GET: [1, 2, 3, 4],
    PATCH: [1, 2, 3, 4],
  },
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Bypass auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Get JWT token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  }) as {
    sub: string;
    role?: Prisma.RoleUserGetPayload<true>;
    [key: string]: string | number | boolean | object | undefined;
  };

  // Kalau tidak login, redirect ke /login
  if (!token?.sub) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const method = request.method;
  const role = token.role?.id as number;

  // Cek akses
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

  return NextResponse.next();
}

// Middleware aktif untuk path berikut:
export const config = {
  matcher: [
    "/admin/:path*",
    "/mo/:path*",
    "/kaprodi/:path*",
    "/mahasiswa/:path*",
    "/profile",
    "/api/:path*",
  ],
};
