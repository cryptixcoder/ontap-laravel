import ProjectStatusBadge from '@/Components/Project/ProjectStatusBadge';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/Components/ui/select';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import Attachments from '@/Components/Attachments/Attachments';
import Deliverables from '@/Components/Deliverables/Deliverables';
import Comments from '@/Components/Comments/Comments';
import ResponseTable from '@/Components/Project/ResponseTable';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { getInitials } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { FormEventHandler } from 'react';

export default function ViewProject({ project, organization, users }: { project: any, organization: any, users: any[] }) {
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
            label: 'Projects',
            href: route('admin.customer.show', organization.id),
            icon: true
        },
        {
            label: project.title,
            href: '',
            icon: true
        }
    ];

    const { put, data, setData} = useForm({
        user_id: project?.assigned_user_id?.toString()
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('admin.customer.project.assign', {organization:organization.id,  project: project.id}), {
            preserveScroll: true,
            onSuccess: () => {

            },
        })
    }

    return (
        <AdminLayout header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Mange {project.title}
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                    <div className="mb-4">
                        <Breadcrumbs items={links} />
                    </div>

                    {project.status === "Pending" && (
                       <div>
                        Not Onboarded
                       </div>
                    )}

                    {project.status !== "Pending" && (
                        <div className="grid grid-cols-12 gap-8 ">
                            <div className="col-span-4 space-y-4">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Project Name:</h3>
                                        <p>{project.title}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Project Type:</h3>
                                        <p>{project.product.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Expected Delivery Date</h3>
                                        <p>{new Date(project.delivery_at)?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <ProjectStatusBadge status={project.status} />
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-4">
                                    <h3 className="text-sm font-semibold mb-2">Assigned User</h3>

                                    {project.assigned_user ? (
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarFallback className='bg-slate-500 text-white text-sm'>{getInitials(project!.assigned_user.name as string)}</AvatarFallback>
                                            </Avatar>
                                            <p>{project.assigned_user.name}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>No user assigned yet.</p>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-2 space-y-2">
                                                <label>Assign User</label>
                                                <Select
                                                    name="user_id"
                                                    value={data.user_id}
                                                    onValueChange={(value) => setData('user_id', value.toString())}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select user..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {users.map((user) => (
                                                            <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center justify-end mt-6">
                                                <Button>
                                                    Assign
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-4">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Onboarding Questions</AccordionTrigger>
                                            <AccordionContent>
                                                <ResponseTable responses={project.responses} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                            <div className="col-span-8 space-y-4">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-8">
                                    <Attachments id={project.id} type="project" attachments={project.attachments} />
                                    <Deliverables id={project.id} deliverables={project.deliverables} allowUploads  />
                                    <Comments id={project.id} type="project" comments={project.comments} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
