import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "mayonity_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

const SESSION_MAX_AGE_DEFAULT_SEC = 60 * 60 * 12;
const SESSION_MAX_AGE_REMEMBER_SEC = 60 * 60 * 24 * 30;

/** @param {boolean} [remember] */
export async function createSessionToken(user, remember = false) {
  const lifetime = remember ? "30d" : "12h";
  return new SignJWT({
    sub: String(user.id),
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(lifetime)
    .sign(getSecret());
}

export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

/** @param {boolean} [remember] */
export async function setSessionCookie(token, remember = false) {
  const jar = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };

  if (remember) {
    jar.set(COOKIE, token, { ...options, maxAge: SESSION_MAX_AGE_REMEMBER_SEC });
    return;
  }

  jar.set(COOKIE, token, { ...options, maxAge: SESSION_MAX_AGE_DEFAULT_SEC });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return null;
  }
  return session;
}

export { COOKIE as SESSION_COOKIE };
