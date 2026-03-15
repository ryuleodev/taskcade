import TaskForm from "@/components/TaskForm";
import { db, rowToTask } from "@/lib/db";

export default async function Home() {
  const result = await db.execute("SELECT * FROM tasks");
  const tasks = result.rows.map(rowToTask);
  return (
    <main>
      <h1>TodoApp</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <p>{task.isDone ? "完了" : "未完了"}</p>
        </div>
      ))}
      <TaskForm />
    </main>
  );
}
