import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

export const authOptions = {
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
          where: { id: credentials.id },
          include: { role: true }, // cukup ambil role
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

        // Hanya return data minimal
        return {
          id: user.id,
          email: user.email,
          idMajor: user.idMajor,
          role: user.role, // simpan role name / bisa juga id
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.majorId = user.idMajor;
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId as string,
        idMajor: token.majorId as string,
        email: token.email as string,
        role: token.role as string,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
