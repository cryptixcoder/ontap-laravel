import ProjectCard from '@/Components/Project/ProjectCard';
import PurchaseProjectButton from '@/Components/Project/PurchaseProjectButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Projects({ projects }: { projects: any[]}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Projects
                    </h2>

                    <PurchaseProjectButton />
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mt-4 space-y-4 container mx-auto">
                        {projects.length === 0 && (
                            <div className="p-4 bg-white border">
                                <h3 className="font-semibold text-xl text-center mb-4">No Projects</h3>
                                <p className="text-center">You currently have no active projects. Click &quot;Buy Sprint&quot; button to get started</p>
                            </div>
                        )}

                        {projects.map((project) => (
                            <ProjectCard key={project.id} href={route('project.show', {'project': project.id})} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
