import DeliverableForm from './DeliverableForm';
import DeliverableFeed from './DeliverableFeed';

export default function Deliverables({ id, deliverables, allowUploads = false }:{id:string, deliverables: any[], allowUploads?: boolean}) {
    return (
        <div>
            <DeliverableForm id={id} allowUploads={allowUploads} />
            <DeliverableFeed deliverables={deliverables} />
        </div>
    )
}
