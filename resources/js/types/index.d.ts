export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    isAdmin: boolean;
    isCollaborator: boolean;
    auth: {
        user: User;
        impersonating: number;
    };
};

export type TaskCardProps = {
    card: Task,
    index: number,
    admin: boolean
}

export type GroupedTasks = {
    id: string
    title: string
    tasks: Task[]
}

export type TaskListProps = {
    list: GroupedTasks
    index: number
    admin: boolean
}

export type EditTaskFormProps = {
    task: Task
}

export type TaskDeleteButtonProps = {
    id: string
}
