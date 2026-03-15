"use client";

import { Task } from "@/types";
import { formatDate, categoryStyle } from "@/lib/utils";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onStageToggle: (stageId: number) => void;
}

export default function TaskCard({ task, onToggle, onStageToggle }: Props) {
    return (
        <div
            key={task.id}
            className="bg-white rounded-xl shadow-sm p-4 m-2 border border-gray-100 flex items-center gap-3"
        >
            <button
            onClick={() => onToggle(task.id)}
            className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
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
            <div className="flex-1">
            <p
                className={
                task.isDone
                    ? "line-through text-gray-300"
                    : "text-gray-800 font-medium"
                }
            >
                {task.title}
            </p>
            {task.type === "stage" &&
                task.stages &&
                (() => {
                const done = task.stages!.filter((s) => s.isDone).length;
                const total = task.stages!.length;
                const percent = Math.round((done / total) * 100);
                return (
                    <div className="flex flex-col gap-2">
                    <div className="w-full bg-gray-100 rounded-full h-1">
                        <div
                        className="h-1 rounded-full transition-all"
                        style={{
                            width: `${percent}%`,
                            backgroundColor: "var(--color-brand-accent)",
                        }}
                        />
                    </div>
                    <div className="flex gap-8">
                        {task.stages.map((stage) => (
                        <div key={stage.id} className="flex items-center gap-1">
                            <button
                            onClick={() => onStageToggle(stage.id)}
                            className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
                            style={{
                                backgroundColor: stage.isDone
                                ? "#22c55e"
                                : "transparent",
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
                            <span>{stage.name}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                );
                })()}
            {task.dueDate && (
                <div className="flex items-center gap-1 text-sm text-gray-400">
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
                </div>
            )}
            </div>
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
        </div>
    );
}
