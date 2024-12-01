import CreateTaskModal from '@/Components/Forms/task/CreateTaskForm';
import TaskListContainer from '@/Components/Task/TaskListContainer';
import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Tasks({ tasks, isSubscribed, isPaused, subscription }:PageProps<{tasks?: any, isSubscribed?: boolean, isPaused?: boolean, subscription?: any}>) {
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
                            <h2 className="text-center text-xl font-semibold mb-2">Let's get started!</h2>
                            <p className="text-center">You don&lsquo;t have an active subscription.</p>
                            <p className="text-center">Get started by subscribing to a plan, or by purchasing a sprint project.</p>

                            <div className="space-x-4 mt-8 flex justify-center">
                                <Link href="/subscription">
                                    <Button variant="outline">
                                        Choose a Plan
                                    </Button>
                                </Link>
                                <Link href="/projects">
                                    <Button>
                                        Buy a project sprint
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {isPaused && (
                    <div className="max-w-4xl mx-auto my-8">
                        <div className="p-4 bg-white border">
                            <p className="text-center">You're subscription is currently paused.</p>
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
