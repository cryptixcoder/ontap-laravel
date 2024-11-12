import AdminLayout from '@/Layouts/AdminLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import CreatePlan from '@/Components/Admin/CreatePlan';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';
import { Textarea } from '@/Components/ui/textarea';

export default function Plans({ plans }:{ plans: any[] }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<null|any>(false);

    const { data, setData, post, put, reset } = useForm({
        name: '',
        description: '',
        stripe_statement_descriptor:'',
        price: '',
        features: '',
        limit: "0",
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if(!editing) {
            post(route('admin.plan.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                    setOpen(false);
                },
            });
        }
        else {
            put(route('admin.plan.update', editing.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                    setOpen(false);
                },
            });
        }
    }

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manage Plans</h2>}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-end">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button onClick={() => {
                                        setEditing(null)
                                        reset()
                                    }}>
                                    Create New Plan
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>{editing ? 'Edit Plan' : 'Create New Plan'}</SheetTitle>
                                    <SheetDescription>
                                        Fill in the details for the plan below.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="mb-2">
                                                <label>Plan Name</label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Enter product name"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Price</label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    placeholder="Give plan a price..."
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Description</label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    placeholder="Product description..."
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Features</label>
                                                <Input
                                                    id="features"
                                                    name="features"
                                                    value={data.features}
                                                    onChange={(e) => setData('features', e.target.value)}
                                                    placeholder="Enter product features"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>limit</label>
                                                <Input
                                                    id="limit"
                                                    name="limit"
                                                    value={data.limit}
                                                    onChange={(e) => setData('limit', e.target.value)}
                                                    placeholder="Enter product limit"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Statement Descriptor</label>
                                                <Input
                                                    id="stripe_statement_descriptor"
                                                    name="stripe_statement_descriptor"
                                                    value={data.stripe_statement_descriptor}
                                                    onChange={(e) => setData('stripe_statement_descriptor', e.target.value)}
                                                    placeholder="Description for CC statement"
                                                />
                                            </div>
                                            <Button>
                                                {editing ? 'Update' : 'Create'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Plan Name</TableHead>
                                    <TableHead>Active Members</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plans.map((plan) => (
                                    <TableRow key={plan.id}>
                                        <TableCell className="font-medium">{ plan.name }</TableCell>
                                        <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">{ plan.price }</TableCell>
                                        <TableCell className="text-right">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setData({
                                                                ...plan,
                                                                description: plan.description ? plan.description : '',
                                                                features: plan.features ? plan.features : '',
                                                                stripe_statement_descriptor: plan.stripe_statement_descriptor ? plan.stripe_statement_descriptor : '',
                                                            })
                                                            setEditing(plan)
                                                            setOpen(true)
                                                        }}
                                                        >
                                                    Edit
                                                    </Button>
                                                </SheetTrigger>
                                            </Sheet>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
