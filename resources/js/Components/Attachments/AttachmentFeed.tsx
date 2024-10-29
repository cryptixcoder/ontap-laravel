import Attachment from '@/Components/Attachments/Attachment';

export default function AttachmentFeed({ attachments }:{attachments: any[]}) {
    return (
        <div>
            {attachments?.length > 0 ? (
                <div className="space-y-2">
                    {attachments.map((attachment) => (
                        <Attachment key={attachment.id} attachment={attachment} />
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-center font-semibold text-sm">No attachments yet</p>
                </div>
            )}
        </div>
    )
}
