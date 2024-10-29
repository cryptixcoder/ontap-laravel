import DeliverableForm from '../forms/deliverable/DeliverableForm';
import DeliverableFeed from './DeliverableFeed';
import { DeliverablesProps } from '@/types/deliverable';

export default function Deliverables({ id, deliverables, allowUploads = false }:DeliverablesProps) {
    return (
        <div className="my-4">
            <DeliverableForm id={id} allowUploads={allowUploads} />
            <DeliverableFeed deliverables={deliverables} />
        </div>
    )
}