import CreateTaskModal from '@/Components/Forms/task/CreateTaskForm';
import TaskListContainer from '@/Components/Task/TaskListContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Tasks({ tasks }:PageProps<{tasks?: any}>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Tasks</h2>
                    <CreateTaskModal />
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className='w-fit mx-auto'>
                    <div className="w-full h-full">
                        <TaskListContainer tasks={tasks} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
