"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-brand-primary">
      <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-brand-light">
          <Link href={"/"}>Taskcade</Link>
        </h1>
        <nav className="flex gap-6 items-center">
          <Link
            href="/tasks"
            className="text-sm text-brand-light hover:text-gray-900 transition-colors"
          >
            タスク一覧
          </Link>
          <Link
            href="/tasks/new"
            className="text-sm bg-brand-accent text-brand-primary px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ＋ 新規追加
          </Link>
        </nav>
      </div>
    </header>
  );
}
