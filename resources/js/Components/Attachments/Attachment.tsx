import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import AttachmentDeleteButton from '@/Components/Attachments/AttachmentDeleteButton';
import { Link } from '@inertiajs/react';

export default function Attachment({ attachment }:{attachment:any}) {
    return (
        <div className="bg-white border rounded-md p-4 flex justify-between">
            <div className="flex items-center">
                <div className='flex space-x-2'>
                    <DocumentTextIcon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{attachment.name}</span>
                </div>
            </div>
            <div>
                <div className="flex space-x-2 items-center">
                    <a href={attachment.url}>
                        <ArrowDownTrayIcon className="w-4 h-4" />
                    </a>
                    <AttachmentDeleteButton id={attachment.id} />
                </div>
            </div>
        </div>
    )
}
