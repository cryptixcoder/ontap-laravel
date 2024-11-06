import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/Components/ui/dialog';

type PauseButtonProps = {
    price: number,
    daysRemaining: number
}

export default function PauseSubscriptionButton({ price, daysRemaining }: PauseButtonProps) {
    const [ loading, setLoading ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handlePause = async () => {
        setLoading(true)

        fetch(route('subscription.pause'), {
            method: 'POST',
            body: null
        }).then((response) => {

        }).catch((error) => {

        })
        .finally(()=> {
            setLoading(false)
            setIsOpen(false)
        })
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Pause Subscription
            </Button>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Pause Subscription</DialogTitle>
                        </DialogHeader>
                        <div>
                            <div className="flex justify-between items-center mb-4 border-b pb-4 mt-4">
                                <div className="font-semibold">Price</div>
                                <div>{formatter.format(price)}</div>
                            </div>
                            <div className="flex justify-between items-center mb-4 border-b pb-4">
                                <div className="font-semibold">Business Days Remaining</div>
                                <div>{daysRemaining}</div>
                            </div>
                            <div>
                                <p className="text-xs">By pausing your subscription, you won&lsquo;t be able to access On-Tap&lsquo;s subscription services anymore. Resuming anytime; unused days will be credited before your next billing. When pausing, a day started is a day used,</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={()=> setIsOpen(false)}>Cancel</Button>
                            <Button disabled={loading} onClick={handlePause}>{(loading) ? "Pausing" : "Pause Subscription"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
