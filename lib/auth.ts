import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";


type User = Prisma.UserGetPayload<{include:{
  role: true
  major: true
}}> & {
  emailVerified: Date | null; // Menambahkan properti emailVerified
};

declare module "next-auth" {
   interface Session {
    user: User; 
  }
  
}


// Ekspor langsung handlers, signIn, signOut, auth
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mencari user berdasarkan ID yang diberikan
        const user = await prisma.user.findUnique({
          where: { id: credentials?.id as string },
          include: {role: true, major: true}
          // Menambahkan role dan major pada user
        });

        // Memeriksa apakah user ditemukan dan password sesuai
        if (user && await bcrypt.compare(credentials.password as string , user.password)) {
         return {
            ...user,
            emailVerified: null, // Set emailVerified menjadi null jika tidak ada
          };
        }
        return null; // Jika tidak ada user atau password salah
      },
    }),
  ],
  pages: {
    signIn: "/login", // Menetapkan halaman login kustom
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Menyimpan informasi user ke dalam token JWT
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        // Menyimpan informasi user ke dalam session
        session.user = token.user as User;
      }
      return session;
    },
  },
    session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, // Menggunakan secret untuk enkripsi JWT
});

