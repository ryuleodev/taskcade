import TaskForm from "@/components/TaskForm";
import { db, rowToTask, rowToStage } from "@/lib/db";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await db.execute({
    sql: "SELECT * FROM tasks WHERE id = ?",
    args: [Number(id)],
  });
  const stagesResult = await db.execute({
    sql: 'SELECT * FROM stages WHERE task_id = ? ORDER BY order_index',
    args: [Number(id)],
  });
  const task = rowToTask(result.rows[0]);
  task.stages = stagesResult.rows.map(rowToStage);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">タスク編集</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <TaskForm initial={task} />
      </div>
    </div>
  );
}
