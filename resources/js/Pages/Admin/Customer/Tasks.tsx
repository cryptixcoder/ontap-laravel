import Breadcrumbs from '@/Components/Breadcrumbs';
import CreateTaskModal from '@/Components/Forms/task/CreateTaskForm';
import TaskListContainer from '@/Components/Task/TaskListContainer';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Tasks({ tasks, organization }:PageProps<{tasks?: any, organization: any}>) {
     const links = [
        {
            label: 'Customers',
            href: route('admin.customer.index'),
            icon: false,
        },
        {
            label: organization.name,
            href: route('admin.customer.show', organization.id),
            icon: true,
        },
        {
            label: 'Tasks',
            href: route('admin.customer.show', organization.id),
            icon: true
        },
    ];

    return (
        <AdminLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Tasks</h2>
                    <CreateTaskModal />
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="">
                <div className='w-fit mx-auto'>
                    <div className="mb-8">
                        <Breadcrumbs items={links} />
                    </div>
                    <div className="w-full h-full">
                        <TaskListContainer tasks={tasks} admin />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
