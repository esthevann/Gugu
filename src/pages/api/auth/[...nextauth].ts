import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET! 
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    newUser: '/auth/new-user',
    //signIn: "/auth/signin"
  },
  callbacks: {
    session({session, user}){
      if (session.user) {
        session.user.id = user.id;
      }
      return session
    },
  },
  debug: true
};

export default NextAuth(authOptions);
