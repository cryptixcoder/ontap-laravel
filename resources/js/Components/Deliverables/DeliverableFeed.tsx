import Deliverable from './Deliverable';
import { DeliverableFeedProps } from '@/types/deliverable';

export default function DeliverableFeed({ deliverables }:DeliverableFeedProps) {
    return (
        <div>
            {deliverables?.length > 0 ? (
                <div className="space-y-2">
                    {deliverables.map((deliverable) => (
                        <Deliverable key={deliverable.id} deliverable={deliverable} />
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-center font-semibold text-sm">No deliverables yet</p>
                </div>
            )}
        </div>
    )
}