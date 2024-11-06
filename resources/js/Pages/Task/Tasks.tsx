import CreateTaskModal from '@/Components/Forms/task/CreateTaskForm';
import TaskListContainer from '@/Components/Task/TaskListContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';



export default function Tasks({ tasks, isSubscribed, isPaused }:PageProps<{tasks?: any, isSubscribed?: boolean, isPaused?: boolean}>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Tasks</h2>
                    {isSubscribed && !isPaused && <CreateTaskModal />}
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                {!isSubscribed && (
                    <div className="max-w-4xl mx-auto my-8">
                        <div className="p-4 bg-white border">
                            <p className="text-center">You don&lsquo;t have an active subscription.</p>
                        </div>
                    </div>
                )}


                {isSubscribed && !isPaused && (
                    <div className='w-fit mx-auto'>
                        <div className="w-full h-full">
                            <TaskListContainer tasks={tasks} />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
