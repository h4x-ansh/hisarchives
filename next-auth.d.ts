import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isOwner?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isOwner?: boolean;
  }
}
