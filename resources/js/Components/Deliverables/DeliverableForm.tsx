import { useRef, useState } from 'react'
import { Button } from '@/Components/ui/button'
import { PaperClipIcon } from '@heroicons/react/24/solid'
import { useForm, router } from '@inertiajs/react';

export default function DeliverableForm({ id, allowUploads = false }:{ id: string, allowUploads?: boolean }) {
    const inputRef = useRef<HTMLInputElement|null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [processing, setProcessing] = useState<boolean>(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('file', file);

        router.post(route(`/deliverable/${id}`), formData, {
            preserveScroll: true,
            onProgress: (e) => {

            },
            onSuccess: (e) => {

            },
            onError: (e) => {

            }
        })
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        inputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleUpload(e);
    }


    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-semibold">Deliverables</h3>
                </div>
                {allowUploads && (
                    <div>
                        <input type="file" ref={inputRef} className="hidden" onChange={handleFileChange}/>
                        <Button variant="ghost" onClick={handleClick}>
                            {!processing ? <PaperClipIcon className="w-4 h-4 max-w-[20px]" /> : (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                        </Button>
                    </div>
                )}
            </div>
            {progress > 0 && (
                <div className="bg-white border rounded-md p-4 mb-2">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-slate-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            )}
        </div>
    )
}
