import Attachments from '@/Components/Attachments/Attachments';
import Comments from '@/Components/Comments/Comments';
import CreateTaskModal from '@/Components/Forms/task/CreateTaskForm';
import EditTaskForm from '@/Components/Forms/task/EditTaskForm';
import TaskListContainer from '@/Components/Task/TaskListContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function ViewTask({ task }: PageProps<{task: any}>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Task</h2>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="w-full h-full pb-8">
                    <EditTaskForm task={task} />
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-8 mt-8">
                        <Attachments id={task.id} type='task' attachments={task.attachments} />
                        <Comments id={task.id} type="task" comments={task.comments} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

