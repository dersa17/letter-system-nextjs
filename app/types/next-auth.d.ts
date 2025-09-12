import { Prisma } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    idMajor?: string;
    role?: Prisma.RoleGetPayload<object>;
    emailVerified: Date | null;
  }
  
  interface Session {
    user: {
      id: string;
      email: string;
      idMajor?: string;
      role?: Prisma.RoleGetPayload<object>;
      emailVerified: Date | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    email: string;
    majorId?: string;
    role?: Prisma.RoleGetPayload<object>;
    emailVerified: Date | null;
  }
}