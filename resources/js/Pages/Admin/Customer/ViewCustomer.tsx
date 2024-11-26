import AdminLayout from '@/Layouts/AdminLayout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button, buttonVariants } from '@/Components/ui/button';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import ProjectStatusBadge from '@/Components/Project/ProjectStatusBadge';
import { Badge } from '@/Components/ui/badge';
import PauseSubscriptionButton from '@/Components/Subscription/PauseSubscriptionButton';
import ResumeSubscriptionButton from '@/Components/Subscription/ResumeSubscriptionButton';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { PageProps } from '@/types';
import { ImpersonateButton } from '@/Components/Impersonate';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

type Organization = {
    id: string;
    name: string;
    plan: any;
    owner: any;
    subscriptions: any[];
    users: any[];
    owner_id: number;
}

export default function ViewCustomer({ organization, isSubscribed, isPaused, daysUntilEnd, projects, subscription, auth }: PageProps<{ organization: Organization, isSubscribed: boolean, isPaused: boolean, daysUntilEnd: number, projects: any[], subscription: any }>) {
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
        }
    ];
    return (
        <AdminLayout header={(
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">{organization.name}</h2>

                <div className="space-x-4">
                    <Link className={buttonVariants({variant:"outline"})} href={route('admin.customer.tasks', organization.id)}>Tasks</Link>
                    {auth.user.role == "admin" && <ImpersonateButton userId={organization.owner_id} />}
                </div>
            </div>
        )}>
            <Head title={organization.name} />
            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                     <Breadcrumbs items={links} />
                     <div className="space-y-8 mt-8">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 space-y-4">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Organization:</h3>
                                        <p>{organization.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Owner Name:</h3>
                                        <p>{organization.owner.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2">Owner Email:</h3>
                                        <p>{organization.owner.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-8 space-y-4">
                                {isSubscribed && (
                                    <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200">
                                            <div className="p-4 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-md font-bold">{organization.plan.name}</h3>
                                                    { subscription.nextBillingDate && <p>Renews: {subscription.nextBillingDate}</p> }
                                                    { !subscription.nextBillingDate && <p>Ends On: {subscription.ends_at}</p> }
                                                </div>
                                                <div>
                                                    {!isPaused && (<Badge className="border-transparent bg-green-400 text-destructive-foreground hover:bg-green-400/80">Active</Badge>)}
                                                    {isPaused && (<Badge className="border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Paused</Badge>)}
                                                </div>
                                            </div>
                                            <div className="p-4 flex justify-between items-center">
                                                <div>
                                                    <h6>Total</h6>
                                                </div>
                                                <div>
                                                    {formatter.format(organization.plan.price)}
                                                </div>
                                            </div>
                                            <div className="p-4 flex justify-between items-center">
                                                <div>
                                                    <p>{daysUntilEnd} business days remaining</p>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-semibold text-sm mb-4">Purchased Sprints</h3>
                                    <div className="space-y-4">
                                        {projects.map((project) => (
                                            <Link className="block" href={route('admin.customer.project.show', { organization: organization.id, project: project.id })}>
                                                <div className="flex justify-between items-center w-full bg-white border p-4 rounded-md">
                                                    <div>
                                                        <h6 className="text-xs font-medium">{project.title}</h6>
                                                        <p className="text-xs">{new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-1 items-center w-36">
                                                            <ProjectStatusBadge status={project.status} />
                                                        </div>
                                                        <div>
                                                            <Button variant="ghost">
                                                                View Project
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm mb-4">Team Members</h3>
                                    {organization.users.length > 0 && (
                                        <div>
                                            {organization.users.map((user) => (
                                                <div className="flex justify-between items-center w-full bg-white border p-4 rounded-md">
                                                    <div>
                                                        <h6 className="text-xs font-medium">{user.name}</h6>
                                                        <p className="text-xs">{user.email}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-1 items-center w-36">
                                                            {/* <span className="text-sm text-primary/60 capitalize">{user.role}</span> */}
                                                        </div>
                                                        <div>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost">
                                                                        <EllipsisVerticalIcon className="w-[16px]" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <DropdownMenuItem>Remove User</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {organization.users.length == 0 && (
                                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-4">
                                            <p>No users added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </AdminLayout>
    )
}
