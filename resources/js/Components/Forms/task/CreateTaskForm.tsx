"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Form, FormField } from '@/Components/ui/form';
import {Button} from '@/Components/ui/button'
import { Input } from '@/Components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEventHandler, useState } from 'react';
// import { createTask } from '@/actions/tasks';
import './blocknotes.css'

const NewTaskSchema = z.object({
    title: z.string(),
    content: z.string(),
    status: z.string()
});

const uploadFile = async (file: File) => {
    const body = new FormData();

    body.append("file", file);
    body.append("object", "embeds");

    const response = await fetch('/api/upload', {
        method: "POST",
        body: body
    });

    return (await response.json()).data.url.replace("tmpfiles.org/",
    "tmpfiles.org/dl/");
}


export default function CreateTaskModal() {
    const [ isOpen, setIsOpen ] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        status: 'Not Started'
    });

    const editor = useCreateBlockNote({
        uploadFile
    });

    // const onSubmit = async (values: z.infer<typeof NewTaskSchema>) => {
    //     post(route('task.store'), {

    //     });
    //     setIsOpen(false);
    // }

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('task.store'), {
            preserveScroll: true,
            onSuccess: () => {
                editor.removeBlocks(editor.document);
                reset('title');
                setIsOpen(false);
            },
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} variant="outline">Create Task</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div>
                        <div className="mb-2">
                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter a title for this task..."
                                className="font-bold pl-0 text-xl outline-none shadow-none focus:outline-none focus-visible:ring-0 border-0"
                            />
                        </div>
                        <BlockNoteView
                            editor={editor}
                            sideMenu={false}
                            className="h-[500px]"
                            onChange={() => setData('content', JSON.stringify(editor.document))}
                        />
                    </div>
                    <DialogFooter>
                        <Button>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
