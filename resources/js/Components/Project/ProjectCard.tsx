import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Button } from '@/Components/ui/button';
import ProjectStatusBadge from './ProjectStatusBadge';
import { Link } from '@inertiajs/react';

export default function ProjectCard({ href, project }:{ href: string, project: any}) {
    return (
        <Link className="block" href={href}>
            <div className="flex justify-between items-center w-full bg-white border p-4 rounded-md">
                <div className="space-y-1">
                    <h6 className="text-md font-medium">{project.title}</h6>
                    <p className="text-xs"><span className="font-medium">Purchased:</span> {(new Date(project.created_at)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
    )
}
