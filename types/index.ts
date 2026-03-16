export type Task = {
    id: number;
    title: string;
    category: string;
    type: 'normal' | 'stage';
    note: string;
    dueDate: string | null;
    isDone: boolean;
    stages?: Stage[];
    recurRule: string;
    isRecurring: boolean;
    createdAt: string;
}

export type Stage = {
    id: number;
    taskId: number;
    name: string;
    orderIndex: number;
    isDone: boolean;
    dueDate: string | null;
}

export const CATEGORIES = ['仕事', '勉強', '個人', '家事', '健康', 'その他'] as const;