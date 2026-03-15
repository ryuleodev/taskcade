export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
}

export const categoryStyle: Record<string, { bg: string; text: string }> = {
  仕事: { bg: 'bg-blue-100',   text: 'text-blue-700' },
  勉強: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  個人: { bg: 'bg-red-100',  text: 'text-red-700' },
  家事: { bg: 'bg-orange-100', text: 'text-orange-700' },
  健康: { bg: 'bg-green-100',    text: 'text-green-700' },
};

export function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}