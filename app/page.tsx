import HomeClient from "@/components/HomeClient";
import { db, rowToTask, rowToStage } from "@/lib/db";

export default async function Home() {
  const result = await db.execute("SELECT * FROM tasks");
  const stagesResult = await db.execute('SELECT * FROM stages');
  const tasks = result.rows.map(row => {
  const task = rowToTask(row);
    task.stages = stagesResult.rows
      .map(rowToStage)
      .filter(stage => stage.taskId === task.id);
    return task;
  });
  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.isDone).length;
  const now = new Date();
  const soonCount = tasks.filter((t) => {
    if (!t.dueDate || t.isDone) return false;
    const due = new Date(t.dueDate);
    const diff = due.getTime() - now.getTime();
    return diff > 0 && diff < 24 * 60 * 60 * 1000;
  }).length;

  const todayTasks = tasks.filter((t) => {
    if (!t.dueDate || t.isDone) return false;
    const due = new Date(t.dueDate);
    return due.toDateString() === now.toDateString();
  });

  const activeTasks = tasks.filter((t) => !t.isDone).slice(0, 5);

  return (
    <HomeClient
      tasks={tasks}
      dateLabel={now.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })}
      todayTasks={todayTasks}
      activeTasks={activeTasks}
      totalCount={totalCount}
      doneCount={doneCount}
      soonCount={soonCount}
    />
  );
}
