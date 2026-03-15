import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const current = await db.execute({
    sql: "SELECT is_done FROM stages WHERE id = ?",
    args: [Number(id)],
  });

  const isDone = current.rows[0].is_done === 1;

  await db.execute({
    sql: "UPDATE stages set is_done = ? WHERE  id = ?",
    args: [isDone ? 0 : 1, Number(id)],
  });

  return NextResponse.json({ ok: true });
}
