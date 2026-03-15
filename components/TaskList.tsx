"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task, CATEGORIES } from "@/types";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const activeTasks = tasks.filter((t) => !t.isDone);
  const doneTasks = tasks.filter((t) => t.isDone);
  const [showDone, setShowDone] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActive = activeTasks.filter(t => 
    (!filterCategory || t.category === filterCategory) &&
    (!searchQuery || t.title.includes(searchQuery))
  );
  const filteredDone = doneTasks.filter(t =>
    (!filterCategory || t.category === filterCategory) &&
    (!searchQuery || t.title.includes(searchQuery))
  );

  const handleToggle = async (id: number) => {
    await fetch(`/api/tasks/${id}/complete`, { method: "PATCH" });
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const handleStageToggle = async (stageId: number) => {
    await fetch(`/api/stages/${stageId}/complete`, { method: "PATCH" });
    router.refresh();
  };

  return (
    <main>
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="タスクを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setFilterCategory("")}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            !filterCategory
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-white text-gray-600 border-gray-200"
          }`}
        >
          すべて
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat === filterCategory ? "" : cat)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              filterCategory === cat
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
          進行中 ({filteredActive.length})
        </p>
        {filteredActive.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onStageToggle={handleStageToggle}
            onDelete={handleDelete}
          />
        ))}
        {filteredActive.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">✨</p>
            <p className="text-gray-500 font-medium">すべて完了しています！</p>
            <p className="text-gray-400 text-sm mt-1">
              新しいタスクを追加しましょう
            </p>
          </div>
        )}
      </section>
      <section className="mb-6">
        {filteredDone.length > 0 && (
          <>
            <button
              onClick={() => setShowDone(!showDone)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2"
            >
              完了済み ({filteredDone.length})
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={showDone ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"} />
              </svg>
            </button>
            {showDone &&
              filteredDone.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onStageToggle={handleStageToggle}
                  onDelete={handleDelete}
                />
              ))}
          </>
        )}
      </section>
    </main>
  );
}
