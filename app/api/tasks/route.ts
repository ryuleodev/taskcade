import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json(); // リクエストのbodyを取得
  const { title } = body;

  await db.execute({
    sql: "INSERT INTO tasks (title) VALUES (?)",
    args: [title],
  });

  return NextResponse.json({ ok: true });
}
