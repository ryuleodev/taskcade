import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新規タスク</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <TaskForm />
      </div>
    </div>
  );
}