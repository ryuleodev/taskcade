import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { taskId, name, orderIndex } = body;

  await db.execute({
    sql: "INSERT INTO stages (task_id, name, order_index) VALUES (?, ?, ?)",
    args: [taskId, name, orderIndex],
  });

  return NextResponse.json({ ok: true });
}
