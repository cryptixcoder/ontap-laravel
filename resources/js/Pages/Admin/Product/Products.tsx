import ManageOnboardingQuestions from '@/Components/Admin/ManageOnboardingQuestions';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/Components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Switch } from '@/Components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Textarea } from '@/Components/ui/textarea';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type ProductsProps = {
    products: any[],
    productCategories: any[]
}

export default function Products({products, productCategories}: ProductsProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<null|any>(false);

    const { data, setData, post, put, reset } = useForm({
       name: '',
       short_description: '',
       description: '',
       deliverables: '',
       price: '',
       product_category_id: "",
       active: false
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if(!editing) {
            post(route('admin.product.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                    setOpen(false);
                },
            });
        }
        else {
            put(route('admin.product.update', editing.id), {
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
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Products</h2>}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-end">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button onClick={() => {
                                        setEditing(null)
                                        reset()
                                    }}>
                                    Create New Product
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>{editing ? 'Edit Product' : 'Create New Product'}</SheetTitle>
                                    <SheetDescription>
                                        Fill in the details for the product below.
                                    </SheetDescription>
                                </SheetHeader>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="mb-2">
                                                <label>Product Name</label>
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
                                                    placeholder="Give product a price..."
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Short Description</label>
                                                <Input
                                                    id="short_description"
                                                    name="short_description"
                                                    value={data.short_description}
                                                    onChange={(e) => setData('short_description', e.target.value)}
                                                    placeholder="Give product a short description..."
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
                                                <label>Deliverables</label>
                                                <Textarea
                                                    id="deliverables"
                                                    name="deliverables"
                                                    value={data.deliverables}
                                                    onChange={(e) => setData('deliverables', e.target.value)}
                                                    placeholder="Let the custommer know what they receive..."
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Product Category</label>
                                                <Select
                                                    name="product_category_id"
                                                    value={data.product_category_id}
                                                    onValueChange={(value) => setData('product_category_id', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select product category..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                    {productCategories.map((productCategory) => (

                                                            <SelectItem key={productCategory.id} value={productCategory.id}>{productCategory.name}</SelectItem>

                                                    ))}
                                                     </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Active
                                                </label>
                                                <Switch
                                                    checked={data.active}
                                                    onCheckedChange={(checked) => setData('active', checked)}
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
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Active Members</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{ product.name }</TableCell>
                                        <TableCell>Credit Card</TableCell>
                                        <TableCell className="text-right">{ product.price }</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setData(product)
                                                            setEditing(product)
                                                            setOpen(true)
                                                        }}
                                                        >
                                                    Edit
                                                    </Button>
                                                </SheetTrigger>
                                            </Sheet>
                                            <ManageOnboardingQuestions productId={product.id} questions={product.questions} />
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
