import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function mariadbConfigFromUrl(raw) {
  const parsed = new URL(raw.replace(/^mysql:\/\//i, "http://"));
  const database = decodeURIComponent((parsed.pathname || "/").replace(/^\//, "").split("?")[0]);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username || ""),
    password: decodeURIComponent(parsed.password || ""),
    database,
    // cPanel often allows only a few connections per MySQL user.
    connectionLimit: process.env.NODE_ENV === "production" ? 1 : 5,
    connectTimeout: 15000,
    acquireTimeout: 15000,
    idleTimeout: 10,
    allowPublicKeyRetrieval: true,
  };
}

function createPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaMariaDb(mariadbConfigFromUrl(url));
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma || createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
