import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { getServerSession } from "next-auth/next";

// Resolve the correct public URL for NextAuth callbacks.
// NEXTAUTH_URL in .env.local is set to localhost; on Vercel we override it
// with the actual deployment URL so OAuth redirects work in production.
(function resolveNextAuthUrl() {
  const current = process.env.NEXTAUTH_URL ?? "";
  if (current && !current.includes("localhost")) return; // already set to a real domain
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  }
  // else: local dev, keep whatever is in NEXTAUTH_URL (localhost)
})();

const ownerEmail = (process.env.OWNER_EMAIL ?? "anuneet.og@gmail.com").trim().toLowerCase();
const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  "ansh-siddhi-naacho-secret";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/test",
  },
  callbacks: {
    async signIn({ profile }: any) {
      return Boolean(profile?.email);
    },
    async jwt({ token, user, profile }: any) {
      const email =
        (user?.email ?? (profile as { email?: string } | undefined)?.email ?? token.email ?? "")
          .trim()
          .toLowerCase();

      if (email) {
        token.email = email;
        token.isOwner = Boolean(ownerEmail && email === ownerEmail);
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.email = (token.email as string | undefined) ?? session.user.email ?? null;
        session.user.isOwner = Boolean(token.isOwner);
      }

      return session;
    },
  },
  secret: authSecret,
};

export function auth() {
  return getServerSession(authOptions as any);
}

export { ownerEmail as OWNER_EMAIL };
export default NextAuth(authOptions as any);
