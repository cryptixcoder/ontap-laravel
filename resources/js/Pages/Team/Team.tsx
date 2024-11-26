import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';

export default function Team({ members, invites}:{  members: any[], invites: any[] }) {

    const { post, data, setData, reset} = useForm({
        email:'',
        role: 'collaborator'
    })

    const handleCancelInvite = async (id: string) => {
        router.delete(route('team.invite.remove', {invite: id}), {
            preserveScroll: true
        });
    }

    const handleRemoveTeamMember = async (id: string) => {
        router.delete(route('team.user.remove', {user: id}), {
            preserveScroll: true
        });
    }

    const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('team.invite'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                // setOpen(false);
            },
        });
    }

    return (
        <AuthenticatedLayout
             header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Team</h2>}>
            <Head title="Team" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mt-4 space-y-4 container mx-auto">
                        <div>
                        <div>
                            <h3 className="font-medium mb-4">Invite</h3>

                            <div className="bg-white border rounded-md p-4">
                                <form onSubmit={handleInvite} className="flex gap-2 w-full">
                                    <div className="flex flex-grow items-center gap-2">
                                        <div className="flex-1">
                                            <Label>Email</Label>
                                            <Input
                                                placeholder="user@example.com"
                                                className="w-full"
                                                type="email"
                                                name="email"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                             <Label>Role</Label>
                                            <Select onValueChange={(value) => setData('role', value)} value={data.role}>
                                                <SelectTrigger className='min-w-[200px]'>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="collaborator">Collaborator</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mt-6">
                                        <Button type='submit'>Invite</Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {invites.length > 0 && (
                            <div className="mt-8">
                                <h3 className="font-medium mb-4">Invites</h3>
                                <div className="space-y-2">
                                    {invites.map((invite) => (
                                        <div className="flex justify-between items-center w-full bg-white border p-4 rounded-md">
                                            <div>
                                                <p className="text-xs">{invite.email}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1 items-center w-36">
                                                    <span className="text-sm text-primary/60 capitalize">{invite.role}</span>
                                                </div>
                                                <div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <EllipsisVerticalIcon className="w-[16px]" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem onClick={() => handleCancelInvite(invite.id)}>Cancel Invite</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            <h3 className="font-medium mb-4">Team Members</h3>

                            {members.length == 0 && (
                                <div className="bg-white rounded-lg shadow-sm p-4 space-y-8 mt-8">
                                    <p className="text-center">You don&lsquo;t have any team members yet.</p>
                                </div>
                            )}

                            {members.length > 0 && (
                                <div className="space-y-2">
                                    {members.map((member) => (
                                        <div className="flex justify-between items-center w-full bg-white border p-4 rounded-md">
                                            <div>
                                                <h6 className="text-xs font-medium">{member.name}</h6>
                                                <p className="text-xs">{member.email}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1 items-center w-36">
                                                    <span className="text-sm text-primary/60 capitalize">{member.pivot.role}</span>
                                                </div>
                                                <div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost">
                                                                <EllipsisVerticalIcon className="w-[16px]" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem onClick={() => handleRemoveTeamMember(member.id)}>Remove User</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
