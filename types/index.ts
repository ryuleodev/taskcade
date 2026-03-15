export type Task = {
    id: number;
    title: string;
    category: string;
    type: string;
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
}