"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/types";

export default function TaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState<"normal" | "stage">("normal");
  const [stages, setStages] = useState<string[]>(["", "", ""]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, dueDate, type, stages }),
    });

    setTitle("");
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
          <div>
            {stages.map((stage, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  key={i}
                  value={stage}
                  onChange={(e) => {
                    const next = [...stages];
                    next[i] = e.target.value;
                    setStages(next);
                  }}
                  placeholder={`ステージ ${i + 1}`}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full mb-2"
                />
                <button
                  onClick={() => setStages(stages.filter((_, j) => j !== i))}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => setStages([...stages, ""])}
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
          タスクを追加
        </button>
      </div>
    </div>
  );
}
