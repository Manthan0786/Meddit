import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Endpoints, Gateway } from "@/app/_services/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
        const response = await fetch(`${Gateway}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_token: account.id_token,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          token.user = data;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});
