import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import DeliverableDeleteButton from './DeliverableDeleteButton';
import { DeliverableProps } from '@/types/deliverable';

export default function Deliverable({ deliverable }:DeliverableProps) {
    return (
        <div className="bg-white border rounded-md p-4 flex justify-between">
            <div className="flex items-center">
                <div className='flex space-x-2'>
                    <DocumentTextIcon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{deliverable.name}</span>
                </div>
            </div>
            <div>
                <div className="flex space-x-2 items-center">
                    <Link href={deliverable.url}>
                        <ArrowDownTrayIcon className="w-4 h-4" />
                    </Link>
                    <DeliverableDeleteButton id={deliverable.id} />
                </div>
            </div>
        </div>
    )
}