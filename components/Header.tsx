"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-100 bg-brand-primary">
      <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-brand-light">
          <Link href={"/"}>Taskcade</Link>
        </h1>
        <nav className="flex gap-6 items-center">
          <Link
            href="/tasks"
            className={
              pathname === "/tasks"
                ? "text-brand-accent font-semibold"
                : "text-gray-300 hover:text-white"
            }
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
