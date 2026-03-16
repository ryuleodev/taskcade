"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Task, CATEGORIES } from "@/types";

interface StageInput {
  name: string;
  dueDate: string;
}

interface Props {
  initial?: Task;
}

export default function TaskForm({ initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? "");
  const [type, setType] = useState<"normal" | "stage">(
    initial?.type ?? "normal",
  );
  const [stages, setStages] = useState<StageInput[]>(
    initial?.stages?.map((s) => ({ name: s.name, dueDate: s.dueDate ?? "" })) ??
      [{ name: "", dueDate: "" }, { name: "", dueDate: "" }, { name: "", dueDate: "" }],
  );

  const dragIndex = useRef<number | null>(null);

  const handleDragStart = (i: number) => {
    dragIndex.current = i;
  };

  const handleDrop = (i: number) => {
    if (dragIndex.current === null || dragIndex.current === i) return;
    const next = [...stages];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(i, 0, moved);
    setStages(next);
    dragIndex.current = null;
  };

  const isEditing = !!initial;

  const handleSubmit = async () => {
    if (isEditing) {
      await fetch(`/api/tasks/${initial!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, dueDate, type, stages }),
      });
    } else {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, dueDate, type, stages }),
      });
    }
    router.push("/tasks");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">タイトル</label>
        <input
          type="text"
          placeholder="タスクのタイトルを入力"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
      </div>

      {/* Task Type */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          タスクタイプ
        </label>
        <div className="flex gap-2">
          {(["normal", "stage"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                type === t
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {t === "normal" ? "通常タスク" : "ステージタスク"}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">カテゴリー</label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === category ? "" : cat)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                category === cat
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Type */}
      {type === "stage" && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            ステップの登録
          </label>
          <div className="flex flex-col gap-2">
            {stages.map((stage, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing"
              >
                {/* Drag handle */}
                <span className="text-gray-400 mt-2.5 select-none leading-none flex flex-col gap-0.5">
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                    <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                  </span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                    <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                  </span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                    <span className="w-1 h-1 rounded-full bg-gray-400 block" />
                  </span>
                </span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <input
                    value={stage.name}
                    onChange={(e) => {
                      const next = [...stages];
                      next[i] = { ...next[i], name: e.target.value };
                      setStages(next);
                    }}
                    placeholder={`ステージ ${i + 1}`}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <input
                    type="datetime-local"
                    value={stage.dueDate}
                    onChange={(e) => {
                      const next = [...stages];
                      next[i] = { ...next[i], dueDate: e.target.value };
                      setStages(next);
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <button
                  onClick={() => setStages(stages.filter((_, j) => j !== i))}
                  className="text-gray-400 hover:text-red-500 transition-colors mt-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => setStages([...stages, { name: "", dueDate: "" }])}
              className="text-sm text-brand-primary hover:underline"
            >
              + ステージを追加
            </button>
          </div>
        </div>
      )}

      {/* Due Date */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">期限</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-brand-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          {isEditing ? '変更を保存' : 'タスクを追加'}
        </button>
      </div>
    </div>
  );
}
