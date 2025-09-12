import { auth } from "@/lib/auth"; // Import auth function
import { NextResponse } from "next/server";


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

// Gunakan auth() sebagai middleware
export default auth(async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Bypass middleware untuk halaman login dan auth API
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Session data tersedia di request.auth
  const session = request.auth;
  
  console.log("SESSION:", !!session);
  console.log("USER:", session?.user ? {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role
  } : null);
  console.log("SECRET:", !!process.env.NEXTAUTH_SECRET);
  console.log("Cookies:", request.cookies.getAll().map(c => ({ name: c.name, hasValue: !!c.value })));

  // Kalau belum login, redirect ke login page
  if (!session?.user) {
    console.log("No session found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const method = request.method;
  const role = session.user.role?.id;

  console.log("User role ID:", role);

  // Jika mengakses root '/', redirect ke dashboard sesuai role
  if (pathname === "/" || pathname.startsWith("/login")) {
    const redirectPath = roleRedirectMap[role];
    if (redirectPath) {
      console.log("Redirecting to:", redirectPath);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // Cek akses role berdasarkan path dan method
  if (pathname.startsWith("/api")) {
    // API: cek role + method
    const pathEntry = Object.entries(pathMethodAccess)
      .find(([path]) => pathname.startsWith(path));
    
    const allowedRoles = pathEntry?.[1][method] || [];
    
    console.log("API Access Check:", {
      path: pathname,
      method,
      userRole: role,
      allowedRoles,
      hasAccess: allowedRoles.includes(role)
    });
    
    if (!allowedRoles.includes(role)) {
      console.log("API Access denied");
      return new NextResponse("Forbidden", { status: 403 });
    }
  } else {
    // Halaman: cek role untuk GET saja
    const pathEntry = Object.entries(pathMethodAccess)
      .find(([path]) => pathname.startsWith(path));
    
    const allowedRoles = pathEntry?.[1].GET || [];
    
    console.log("Page Access Check:", {
      path: pathname,
      userRole: role,
      allowedRoles,
      hasAccess: allowedRoles.includes(role)
    });
    
    if (!allowedRoles.includes(role)) {
      console.log("Page Access denied");
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  console.log("Access granted, continuing...");
  // Lanjutkan request normal
  return NextResponse.next();
});

// Matcher semua route yang butuh middleware
export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/mo/:path*",
    "/kaprodi/:path*",
    "/mahasiswa/:path*",
    "/api/:path*",
    "/profile",
  ],
};