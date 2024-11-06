import Attachments from '@/Components/Attachments/Attachments';
import Comments from '@/Components/Comments/Comments';
import Deliverables from '@/Components/Deliverables/Deliverables';
import OnboardingForm from '@/Components/Project/OnboardingForm';
import ProjectStatusBadge from '@/Components/Project/ProjectStatusBadge';
import PurchaseProjectButton from '@/Components/Project/PurchaseProjectButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import { Head } from '@inertiajs/react';
import ResponseTable from '@/Components/Project/ResponseTable';

export default function ViewProject({project}:{project:any}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Mange {project.title}
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {project.status === "Pending" && (
                        <OnboardingForm questions={project.product.questions} project={project} />
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
                                        <p>{project.product.name}</p>
                                    </div>
                                    <div>
                                        <ProjectStatusBadge status={project.status} />
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
                                <Attachments id={project.id} type="project" attachments={project.attachments} />
                                <Deliverables id={project.id} deliverables={project.deliverables} />
                                <Comments id={project.id} type="project" comments={project.comments} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
