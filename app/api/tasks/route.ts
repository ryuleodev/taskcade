import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, category, dueDate, type, stages } = body;

  const result = await db.execute({
    sql: "INSERT INTO tasks (title, category, due_date, type) VALUES (?, ?, ?, ?)",
    args: [title, category, dueDate, type],
  });
  
  if (stages) {
    const taskId = Number(result.lastInsertRowid);
    for (let i = 0; i < stages.length; i++) {
      await db.execute({
        sql: "INSERT INTO stages (task_id, name, order_index) VALUES (?, ?, ?)",
        args: [taskId, stages[i], i],
      });
    }
  }

  return NextResponse.json({ ok: true });
}
