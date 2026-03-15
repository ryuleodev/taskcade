"use client";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  tasks: Task[];
  dateLabel: string;
  todayTasks: Task[];
  activeTasks: Task[];
  totalCount: number;
  doneCount: number;
  soonCount: number;
}

export default function HomeClient({
  tasks,
  dateLabel,
  todayTasks,
  activeTasks,
  totalCount,
  doneCount,
  soonCount,
}: Props) {
  const router = useRouter();

  const handleToggle = async (id: number) => {
    await fetch(`/api/tasks/${id}/complete`, { method: "PATCH" });
    router.refresh();
  };

  const handleStageToggle = async (stageId: number) => {
    await fetch(`/api/stages/${stageId}/complete`, { method: "PATCH" });
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* 日付ヘッダー */}
      <div className="mb-6">
        <p className="text-sm text-gray-400">{dateLabel}</p>
        <h1 className="text-2xl font-bold text-gray-900">今日のタスク</h1>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <SummaryCard
          label="全タスク"
          value={totalCount}
          color="text-gray-700"
        />
        <SummaryCard label="完了" value={doneCount} color="text-green-600" />
        <SummaryCard
          label="期限近い"
          value={soonCount}
          color="text-orange-500"
        />
      </div>

      {/* 今日期限セクション */}
      {todayTasks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            今日期限
          </h2>
          {todayTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onStageToggle={handleStageToggle}
            />
          ))}
        </section>
      )}

      {/* 進行中セクション */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            進行中
          </h2>
          <a
            href="/tasks"
            className="text-sm text-brand-primary hover:underline"
          >
            すべて見る →
          </a>
        </div>
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onStageToggle={handleStageToggle}
          />
        ))}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
