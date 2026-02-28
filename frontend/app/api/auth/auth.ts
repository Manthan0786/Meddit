import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Endpoints, Gateway } from "@/app/_services/api";

console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET);
console.log("GOOGLE_CLIENT_ID exists:", !!process.env.AUTH_GOOGLE_ID);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account }) {
      console.log("Inside api", account);
      if (account) {
        token.id_token = account.id_token;
        const response = await fetch(`${Gateway}${Endpoints.AUTH.GOOGLE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_token: account.id_token,
          }),
        });
        console.log("response status", response.status);
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
