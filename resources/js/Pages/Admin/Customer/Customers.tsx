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
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import { ImpersonateButton } from '@/Components/Impersonate';
import { Button } from '@/Components/ui/button';
import { PageProps } from '@/types';

export default function Customers({ organizations, auth}: PageProps<{organizations: any[]}>) {
    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Customers</h2>}>
            <Head title='Customers' />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Organization Name</TableHead>
                                <TableHead>Subscription</TableHead>
                                <TableHead>Joined On</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {organizations.map((organization) => (
                                 <TableRow key={organization.id}>
                                    <TableCell className="font-medium">{organization.name}</TableCell>
                                    <TableCell>{ organization.plan ? organization.plan.name : "No Subscription"}</TableCell>
                                    <TableCell>{new Date(organization.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</TableCell>
                                    <TableCell className="flex justify-end space-x-4">
                                        {auth.user.role == "admin" && <ImpersonateButton userId={organization.owner_id} />}
                                        <Button asChild variant="outline">
                                            <Link href={`/admin/customers/${organization.id}`} className="flex flex-row items-center space-x-4">View Customer <ArrowRightIcon className="ml-4 w-4" /></Link>
                                        </Button>
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
