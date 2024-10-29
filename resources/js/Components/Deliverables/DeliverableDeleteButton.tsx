"use client"
import { TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { deleteDeliverable } from '@/actions/deliverable';
import { DeleteDeliverableButtonProps } from '@/types/deliverable';

export default function DeliverableDeleteButton({ id }:DeleteDeliverableButtonProps) {
    const [isOpen, setIsOpen ] = useState(false)

    const handleDelete = async () => {
        await deleteDeliverable(id);
        setIsOpen(false);
    }

    return (
        <>
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
                <TrashIcon className="w-4 h-4" />
            </Button>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Confirm Deletion
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this item?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button 
                                className="bg-gray-200 text-gray-800 py-2 px-4 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button  
                                className="bg-red-500 text-white py-2 px-4 rounded"
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}