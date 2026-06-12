import { auth, OWNER_EMAIL } from "@/auth";

type SessionLike = {
  user?: {
    email?: string | null;
    isOwner?: boolean;
  };
} | null;

export function isOwnerEmail(email?: string | null) {
  const normalizedEmail = email?.trim().toLowerCase();
  return Boolean(normalizedEmail && OWNER_EMAIL && normalizedEmail === OWNER_EMAIL);
}

export function isOwnerSession(session: SessionLike) {
  return isOwnerEmail(session?.user?.email);
}

export async function getOwnerSession() {
  const session = (await auth()) as SessionLike;
  return {
    session,
    isOwner: isOwnerSession(session),
  };
}
