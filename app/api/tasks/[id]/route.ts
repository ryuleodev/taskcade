import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await db.execute({
    sql: "DELETE FROM tasks WHERE id = ?",
    args: [Number(id)],
  });

  return NextResponse.json({ ok: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { title, category, dueDate, type, stages } = await req.json();

  await db.execute({
    sql: "UPDATE tasks set title = ?, category = ?, due_date = ?, type = ? WHERE  id = ?",
    args: [title, category, dueDate, type, Number(id)],
  });

  await db.execute({
    sql: "DELETE FROM stages WHERE task_id = ?",
    args: [Number(id)],
  });

  for (let i = 0; i < stages.length; i++) {
    await db.execute({
      sql: "INSERT INTO stages (task_id, name, order_index) VALUES (?, ?, ?)",
      args: [Number(id), stages[i], i],
    });
  }

  return NextResponse.json({ ok: true });
}
