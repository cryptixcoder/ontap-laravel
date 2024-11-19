import ManageSubscriptionButton from '@/Components/Subscription/ManageSubscriptionButton';
import PauseSubscriptionButton from '@/Components/Subscription/PauseSubscriptionButton';
import ResumeSubscriptionButton from '@/Components/Subscription/ResumeSubscriptionButton';
import SubscriptionOptions from '@/Components/Subscription/SubscriptionOptions';
import { Badge } from '@/Components/ui/badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Subscription({ isSubscribed, isPaused, plan, daysUntilEnd, expires, plans, subscription }: { isSubscribed: boolean, isPaused: boolean, plan: any, daysUntilEnd: number, expires: string, plans: any[], subscription: any }) {
    return (
        <AuthenticatedLayout
            header={
                (<div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Subscription
                    </h2>
                    <div className="space-x-4">
                        {isSubscribed && !isPaused && <ManageSubscriptionButton />}
                    </div>
                </div>)
            }
        >
            <Head title="Subscription" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {isSubscribed && (
                       <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200">
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-md font-bold">{plan.name}</h3>
                                    { subscription.nextBillingDate && <p>Renews: {subscription.nextBillingDate}</p> }
                                    { !subscription.nextBillingDate && <p>Ends On: {subscription.ends_at}</p> }
                                </div>
                                <div>
                                    {!isPaused && (<Badge className="border-transparent bg-green-400 text-destructive-foreground hover:bg-green-400/80">Active</Badge>)}
                                    {isPaused && (<Badge className="border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Paused</Badge>)}
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h6>Total</h6>
                                </div>
                                <div>
                                    {formatter.format(plan.price)}
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <p>{daysUntilEnd} business days remaining</p>
                                </div>
                                <div>
                                    {isSubscribed && !isPaused && <PauseSubscriptionButton price={plan.price} daysRemaining={daysUntilEnd} />}
                                    {isSubscribed && isPaused && <ResumeSubscriptionButton price={plan.price} daysRemaining={daysUntilEnd} />}
                                </div>
                            </div>
                       </div>
                    )}


                    {!isSubscribed && <SubscriptionOptions plans={plans} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
