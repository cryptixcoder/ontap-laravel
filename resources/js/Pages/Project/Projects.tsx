import ProjectCard from '@/Components/Project/ProjectCard';
import PurchaseProjectButton from '@/Components/Project/PurchaseProjectButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"

import { Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    stripe_price_id: string;
}

type Category = {
    id: string;
    name: string;
    products: Product[];
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


export default function Projects({ projects, categories, isAdmin }: { projects: any[], categories: Category[], isAdmin?:boolean }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Projects
                    </h2>

                    {isAdmin && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline">
                                    Buy Project Sprint
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Project Sprints</SheetTitle>
                                    <SheetDescription>
                                        Choose the best project sprint for your needs.
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="my-8">
                                    <Tabs defaultValue={categories[0]?.id.toString()} className="w-full">
                                        <TabsList className="w-full flex-wrap h-auto">
                                            {categories.map((cat) => (
                                                <TabsTrigger key={cat.id} value={cat.id.toString()} >{cat.name}</TabsTrigger>
                                            ))}
                                        </TabsList>
                                        <div className="mt-4">
                                            {categories.map((cat) => (
                                                <TabsContent key={cat.id} value={cat.id.toString()} className="space-y-8">
                                                    {cat.products.map((product) => (
                                                        <div className="space-y-2 border p-4 rounded-md shadow-sm">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                                                <div>
                                                                    <p>{formatter.format(product.price)}</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600">{product.description}</p>
                                                            <PurchaseProjectButton productId={product.id}>
                                                                {product.name}
                                                            </PurchaseProjectButton>
                                                        </div>
                                                    ))}
                                                </TabsContent>
                                            ))}
                                        </div>
                                    </Tabs>
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
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
