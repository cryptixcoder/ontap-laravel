import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/Components/ui/select';
import { useForm } from '@inertiajs/react';
import { Button } from '../ui/button';
import { FormEventHandler } from 'react';

type ChangeStatusProps = {
    project: any
    organization: any
}

export default function ChangeStatus({ project, organization }:ChangeStatusProps) {
    const { data, put, setData} = useForm({
        status: project.status
    })

    const handleSave:FormEventHandler = (e) => {
        e.preventDefault();

        put(route('admin.customer.project.status', {project: project.id, organization: organization.id}), {
            preserveScroll: true
        });
    }

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4 space-y-4">
            <h3 className="text-sm font-semibold mb-2">Project Status</h3>
            <form onSubmit={handleSave}>
                <div className="mb-2">
                    <Select
                        name="user_id"
                        value={data.status}
                        onValueChange={(value) => setData('status', value.toString())}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select user..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-end mt-6">
                    <Button>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}
