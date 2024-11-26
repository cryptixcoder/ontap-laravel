import Attachments from '@/Components/Attachments/Attachments'
import Breadcrumbs from '@/Components/Breadcrumbs'
import Comments from '@/Components/Comments/Comments'
import EditTaskForm from '@/Components/Forms/task/EditTaskForm'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'

export default function ViewTask({ task, organization}: { task: any, organization: any }) {
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
            href: route('admin.customer.tasks', {
                organization: organization.id
            }),
            icon: true
        },
        {
            label: 'Manage Task',
            href: '',
            icon: true
        },
    ];

    return (
        <AdminLayout header={(
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-lg font-bold text-gray-800">
                        Manage Task
                    </div>
                </div>
            </div>
        )}>
            <Head title="Manage Task" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Breadcrumbs items={links} />
                </div>
                <div className="w-full h-full pb-8">
                    <EditTaskForm task={task} admin />
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-8 mt-8">
                        <Attachments id={task.id} type='task' attachments={task.attachments} />
                        <Comments id={task.id} type="task" comments={task.comments} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
