import AttachmentForm from '@/Components/Attachments/AttachmentForm';
import AttachmentFeed from '@/Components/Attachments/AttachmentFeed';

export default function Attachments({ id, type, attachments }:{ id: string, type: string, attachments: any[]}) {
    return (
        <div>
            <AttachmentForm id={id} type={type} />
            <AttachmentFeed attachments={attachments} />
        </div>
    )
}
