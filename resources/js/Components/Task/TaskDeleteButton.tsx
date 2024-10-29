import { TaskDeleteButtonProps } from '@/types';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
// import { useRouter } from 'next/navigation';
// import { deleteTask } from '@/actions/tasks'

export default function TaskDeleteButton({ id }: TaskDeleteButtonProps) {
    // const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteTask = async () => {
        try {
            router.delete(route('task.delete', id))
            setIsDialogOpen(false);

            // router.push('/tasks')
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <TrashIcon className='w-4' />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Completion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this task?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleDeleteTask}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
