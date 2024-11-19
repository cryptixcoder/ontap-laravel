import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/Components/ui/dialog';
import { router } from '@inertiajs/react';
import { useState } from 'react';

type ResumeButtonProps = {
    price: number,
    daysRemaining: number
}

export default function ResumeSubscriptionButton({ price, daysRemaining }: ResumeButtonProps) {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

     const resume = async () => {
        setLoading(true)

        router.post(route('subscription.resume'),{},{
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false)
                setIsOpen(false)
            },
            onError: () => {
                setLoading(false)
            }
        })
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                {loading ? "Resuming" : "Resume Subscription"}
            </Button>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Resume Subscription</DialogTitle>
                        </DialogHeader>
                        <div>
                            <div className="flex justify-between items-center mb-4 border-b pb-4 mt-4">
                                <div className="font-semibold">Price</div>
                                <div>{formatter.format(price)}</div>
                            </div>
                            <div className="flex justify-between items-center mb-4 border-b pb-4">
                                <div className="font-semibold">Remaining days</div>
                                <div>{daysRemaining}</div>
                            </div>
                            <div>
                                <p className="text-xs">By resuming your subscription, you&lsquo;ll be able to access On-Tap&lsquo;s subscription services again. Unused days will be credited before your next billing.</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={()=> setIsOpen(false)}>Cancel</Button>
                            <Button disabled={loading} onClick={resume}>{(loading) ? "Resuming" : "Resume Subscription"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
