import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import MRR from '@/Components/Admin/MRR';
import { Head, Link, usePage } from '@inertiajs/react';
import ProjectStatusBadge from '@/Components/Project/ProjectStatusBadge';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Button } from '@/Components/ui/button';

export default function Dashboard({ projects }: { projects: any[]}) {
    const { auth } = usePage().props
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            { auth.user.role === 'admin' && (
                <div className='mt-4 space-y-4 container mx-auto h-full'>
              <MRR />
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <h3>Active Subscribers</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Paused Subscribers</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Tasks Worked On</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Median task completion time</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - New</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - Onboarded</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - Completed</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h3>Sprints - Total</h3>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-2xl">1 <small className='text-sm text-gray-400'>1 previous period</small></h1>
                  </CardContent>
                </Card>
              </div>
            </div>
            ) }
            <div className='mt-8 space-y-4 max-w-7xl mx-auto h-full'>
                <div>
                    <h3 className="font-semibold text-sm mb-4">Assign Projects</h3>

                    <div className="space-y-4">
                        {projects.length === 0 && (
                            <div className="p-4 bg-white border">
                                <p className="text-center">You don&lsquo;t have an assigned projects yet.</p>
                            </div>
                        )}

                        {projects.map((project) => (
                            <Link className="block" href={route('admin.customer.project.show', { organization: project.organization_id, project: project.id })}>
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
                                                <EllipsisVerticalIcon className="w-[16px]" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
