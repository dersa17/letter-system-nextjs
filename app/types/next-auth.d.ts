// types/next-auth.d.ts
import "next-auth";
import { Prisma } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      idMajor?: string;
      email: string;
      role?: string;
    };
  }

  interface User {
    idMajor?: string;
    role?: Prisma.RoleUserGetPayload;
  }

  interface JWT {
    majorId?: string;
    userId?: string;
    email?: string;
    role?: string;
  }
}
