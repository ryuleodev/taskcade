import { createClient } from "@libsql/client";
import type { Stage, Task } from "@/types";

export const db = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

export function rowToTask(row: Record<string, unknown>): Task {
  return {
    id:          row.id as number,
    title:       row.title as string,
    type:        row.type as string,
    category:    row.category as string,
    note:        row.note as string,
    dueDate:     row.due_date as string | null,
    isDone:      row.is_done === 1,
    isRecurring: row.is_recurring === 1,
    recurRule:   row.recur_rule as string,
    createdAt:   row.created_at as string
  };
}

export function rowToStage(row: Record<string, unknown>): Stage {
  return {
    id:          row.id as number,
    taskId:       row.task_id as number,
    name:        row.name as string,
    orderIndex:    row.order_index as number,
    isDone:      row.is_done === 1,
  };
}