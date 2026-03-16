import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  const { stageIds } = await req.json();

  for (let i = 0; i < stageIds.length; i++) {
    await db.execute({
      sql: "UPDATE stages SET order_index = ? WHERE id = ?",
      args: [i, stageIds[i]],
    });
  }

  return NextResponse.json({ ok: true });
}
