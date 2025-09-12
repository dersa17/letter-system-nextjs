import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import type { NextAuthConfig } from "next-auth";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          throw new Error("Invalid username or password");
        }

        const user = await prisma.user.findUnique({
          where: { id: credentials.id as string },
          include: { role: true },
        });

        if (!user) {
          throw new Error("Invalid username or password");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }

        return {
          id: user.id,
          email: user.email,
          idMajor: user.idMajor || undefined,
          role: user.role,
          emailVerified: null
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect ke login jika ada error
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // TAMBAHAN PENTING UNTUK VERCEL
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? "__Secure-authjs.session-token" 
        : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" 
          ? ".vercel.app" 
          : undefined,
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.callback-url"
        : "authjs.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Host-authjs.csrf-token"
        : "authjs.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      // Debug logging untuk production
      if (process.env.NODE_ENV === "production") {
        console.log("JWT Callback - Token:", !!token, "User:", !!user);
      }
      
      if (user) {
        token.majorId = user.idMajor;
        token.userId = user.id;
        token.role = user.role;
        token.email = user.email;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      // Debug logging untuk production
      if (process.env.NODE_ENV === "production") {
        console.log("Session Callback - Token:", !!token, "Session:", !!session);
      }
      
      if (token) {
        session.user = {
          id: token.userId as string,
          idMajor: token.majorId,
          email: token.email as string,
          role: token.role,
          emailVerified: token.emailVerified as Date | null,
        };
      }
      return session;
    },
  },
  // Pastikan secret ada
  secret: process.env.NEXTAUTH_SECRET,
  // Tambahan untuk debugging
  debug: process.env.NODE_ENV === "development",
  // Trust host untuk Vercel
  trustHost: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);