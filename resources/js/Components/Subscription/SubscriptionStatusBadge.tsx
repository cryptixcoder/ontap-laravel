import { Badge } from "@/Components/ui/badge";

export default function SubscriptionStatusBadge({ subscription, plan }: { subscription: any, plan: any }) {
    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'active':
                return "border-transparent bg-green-400 text-destructive-foreground hover:bg-green-400/80";
            case 'paused':
                return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
            case 'canceled':
                return "border-transparent bg-red-400 text-destructive-foreground hover:bg-red-400/80";
            default:
                return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Active';
            case 'paused':
                return 'Paused';
            case 'canceled':
                return 'Canceled';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="p-4 flex justify-between items-center">
            <div>
                <h3 className="text-md font-bold">{plan.name}</h3>
                {subscription.nextBillingDate && subscription.status === 'active' && (
                    <p className="text-sm text-gray-600">
                        Renews: {subscription.nextBillingDate}
                    </p>
                )}
                {subscription.formattedEndsAt && (
                    <p className="text-sm text-gray-600">
                        Ends On: {subscription.formattedEndsAt}
                    </p>
                )}
            </div>
            <div>
                <Badge className={getBadgeVariant(subscription.status)}>
                    {getStatusText(subscription.status)}
                </Badge>
            </div>
        </div>
    );
}
