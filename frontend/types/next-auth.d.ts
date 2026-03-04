import "next-auth";

declare module "next-auth" {
  interface User {
    Id?: number;
    Token?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    image?: string | null;
  }

  interface Session {
    user: User;
    backendToken?: string;
    expires: string;
  }
}
