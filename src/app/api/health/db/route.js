import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function dbHint() {
  const raw = process.env.DATABASE_URL || "";
  if (!raw) {
    return { databaseUrlSet: false, host: null, port: null, database: null };
  }

  try {
    const parsed = new URL(raw.replace(/^mysql:\/\//, "http://"));
    return {
      databaseUrlSet: true,
      host: parsed.hostname || null,
      port: parsed.port || "3306",
      database: decodeURIComponent((parsed.pathname || "/").replace(/^\//, "").split("?")[0]) || null,
    };
  } catch {
    return { databaseUrlSet: true, host: "(unparseable)", port: null, database: null };
  }
}

export async function GET() {
  const hint = dbHint();

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        mysql: "failed",
        tables: null,
        userCount: null,
        error: error?.message || String(error),
        code: error?.code || null,
        ...hint,
      },
      { status: 503 }
    );
  }

  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      ok: true,
      mysql: "connected",
      tables: "ok",
      userCount,
      ...hint,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: true,
        mysql: "connected",
        tables: "failed",
        userCount: null,
        error: error?.message || String(error),
        code: error?.code || null,
        ...hint,
      },
      { status: 200 }
    );
  }
}
