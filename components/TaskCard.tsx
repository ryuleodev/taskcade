"use client";

import { Task } from "@/types";
import { formatDate, categoryStyle, isOverdue } from "@/lib/utils";
import Link from "next/link";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onStageToggle: (stageId: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({
  task,
  onToggle,
  onStageToggle,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 m-3 border border-gray-100 hover:shadow-md transition-shadow">
      {/* 1行目：チェック・タイトル・カテゴリ・削除 */}
      <div className="flex items-center gap-3">
        {/* Check Box */}
        <button
          onClick={() => onToggle(task.id)}
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer"
          style={{
            backgroundColor: task.isDone ? "#22c55e" : "transparent",
            borderColor: task.isDone ? "#22c55e" : "#d1d5db",
          }}
        >
          {task.isDone && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <p
          className={`flex-1 ${task.isDone ? "line-through text-gray-300" : "text-gray-800 font-medium"}`}
        >
          {task.title}
        </p>

        {/* Cetegory */}
        {task.category &&
          (() => {
            const style = categoryStyle[task.category] ?? {
              bg: "bg-gray-100",
              text: "text-gray-700",
            };
            return (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}
              >
                {task.category}
              </span>
            );
          })()}

        {/* Edit Button */}
        <Link
          href={`/tasks/${task.id}/edit`}
          className="text-gray-300 hover:text-brand-primary transition-colors"
          aria-label="編集"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </Link>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
          aria-label="削除"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      </div>

      {/* ステージタスクのみ */}
      {task.type === "stage" && task.stages && (
        <div className="mt-3 ml-9">
          {/* 分割プログレスバー */}
          <div className="flex gap-1 mb-3">
            {task.stages.map((stage, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full"
                style={{
                  backgroundColor: stage.isDone
                    ? "var(--color-brand-accent)"
                    : "#E5E7EB",
                }}
              />
            ))}
          </div>
          {/* ステージ一覧 */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-3 mt-3">
              {task.stages.map((stage) => (
                <div key={stage.id} className="flex items-center gap-1">
                  <button
                    onClick={() => onStageToggle(stage.id)}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer"
                    style={{
                      backgroundColor: stage.isDone ? "#22c55e" : "transparent",
                      borderColor: stage.isDone ? "#22c55e" : "#d1d5db",
                    }}
                  >
                    {stage.isDone && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                  <span className="text-sm whitespace-nowrap">
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 日付 */}
      {task.dueDate && (
        <div
          className={`flex items-center gap-1 text-sm ml-9 mt-2 ${
            isOverdue(task.dueDate)
              ? "text-red-500 font-medium"
              : "text-gray-400"
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>{formatDate(task.dueDate)}</span>
          {isOverdue(task.dueDate) && (
            <span className="text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full ml-1">
              期限超過
            </span>
          )}
        </div>
      )}
    </div>
  );
}
