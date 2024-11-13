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
import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/Components/ui/select';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { FormEventHandler, useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import UserDeleteButton from '@/Components/Admin/UserDeleteButton';

export default function Team({ users }: { users: any[] }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);

    const { post, put, data, setData, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'contractor'
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if(!editing) {
            post(route('admin.team.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                    setOpen(false);
                },
            })
        }
        else {
            put(route('admin.team.update', editing.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setEditing(null);
                    setOpen(false);
                },
            })
        }
    }

    return (
        <AdminLayout header={(
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Manage Team</h2>
                <div>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger>
                            <Button onClick={() => {
                                    setEditing(null)
                                    reset()
                                }}>
                                Add User
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                    <SheetTitle>{editing ? 'Edit User' : 'Add User'}</SheetTitle>
                                    <SheetDescription>
                                        Add or edit a user.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label>User Name</label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Email Address</label>
                                            <Input
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="example@syncwaretech.com"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Password</label>
                                            <Input
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                type="password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Enter a password..."
                                            />
                                        </div>
                                        <div className="mb-2">
                                                <label>Product Category</label>
                                                <Select
                                                    name="role"
                                                    value={data.role}
                                                    onValueChange={(value) => setData('role', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select product category..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="contractor">Contractor</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        <div className="flex items-center justify-end mt-6">
                                            <Button>
                                                {editing ? 'Update' : 'Create'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        )}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {users.map((user) => (
                                 <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{ user.email }</TableCell>
                                    <TableCell className="capitalize">{ user.role }</TableCell>
                                    <TableCell className="flex items-center justify-end space-x-4">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => {
                                                    setData(user)
                                                    setEditing(user)
                                                    setOpen(true)
                                                }}>
                                                    Edit
                                                </Button>
                                            </SheetTrigger>
                                        </Sheet>
                                        {user.id !== auth.user.id && <UserDeleteButton id={user.id} />}
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
