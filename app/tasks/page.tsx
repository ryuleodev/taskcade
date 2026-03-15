import TaskList from "@/components/TaskList";
import { db, rowToTask, rowToStage } from "@/lib/db";

export default async function TasksPage() {
  const result = await db.execute("SELECT * FROM tasks");
  const stagesResult = await db.execute('SELECT * FROM stages');
  const tasks = result.rows.map(row => {
  const task = rowToTask(row);
    task.stages = stagesResult.rows
      .map(rowToStage)
      .filter(stage => stage.taskId === task.id);
    return task;
  });
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto px-4">
        <h1>タスク一覧 <span className="text-gray-400 text-base font-normal">{tasks.length}件</span></h1>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
