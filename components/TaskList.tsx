"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const activeTasks = tasks.filter(t => !t.isDone);
  const doneTasks = tasks.filter(t => t.isDone);
  const [showDone, setShowDone] = useState(false);

  const handleToggle = async (id: number) => {
    await fetch(`/api/tasks/${id}/complete`, { method: "PATCH" });
    router.refresh();
  };

  const handleStageToggle = async (stageId: number) => {
    await fetch(`/api/stages/${stageId}/complete`, { method: "PATCH" });
    router.refresh();
  };

  return (
    <main>
      <section className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
          進行中 ({activeTasks.length})
        </p>
        {activeTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={handleToggle} onStageToggle={handleStageToggle} />
        ))}
        {activeTasks.length === 0 && (
          <p className="text-center text-gray-400 py-8">タスクがありません 🎉</p>
        )}
      </section>
      <section className="mb-6">
        {doneTasks.length > 0 && (
          <>
            <button
              onClick={() => setShowDone(!showDone)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2"
            >
              完了済み ({doneTasks.length})
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={showDone ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"} />
              </svg>
            </button>
            {showDone && doneTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggle} onStageToggle={handleStageToggle} />
            ))}
          </>
        )}
      </section>
    </main>
  );
}
