"use client"

import { Form, FormControl, FormField } from '@/Components/ui/form'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Input } from '@/Components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { debounce } from 'lodash';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { useCallback, useEffect, useMemo, useState } from 'react';
// import TaskDeleteButton from '@/Components/task/TaskDeleteButton';
import './blocknotes.css'
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import TaskDeleteButton from '@/Components/Task/TaskDeleteButton';


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


export default function EditTaskForm({ task, admin = false }: { task: any, admin?: boolean }) {
    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | "loading">("loading")
    const { data, setData, put} = useForm({
        title: task.title,
        status: task.status,
        content: task.content
    })

    useEffect(() => {
        setInitialContent(JSON.parse(task.content) as PartialBlock[]);
    },[])


    const editor = useMemo(() => {
        if (initialContent === "loading") {
            return undefined;
        }

        return BlockNoteEditor.create({
            initialContent,
            uploadFile
        })
    }, [initialContent])

    const debounceSubmit = useCallback(
        debounce((taskId: string, key: string, value: string) => {
        router.put(route('task.update', taskId), {
            ...data,
            admin: admin,
            [key]: value
        },{
            preserveScroll: true
        })
    }, 500), [])


    const handleChange = (key: "title"|"content"|"status", value: string) => {
        setData(key, value);

        debounceSubmit(task.id, key, value)
    }

if (editor === undefined) {
    return "Loading content...";
  }
    return (
        <div className="p-4 bg-white border rounded-md mt-8">
            <form>
                    <div>
                        <div className="mb-2 flex">
                            <div className="flex-grow">
                                <Input
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    placeholder="Enter a title for this task..." className="px-0 font-bold text-xl ring-0 shadow-none outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none focus:shadow-none" />
                            </div>
                            <div className="flex-none">
                                <TaskDeleteButton id={task.id} />
                            </div>
                        </div>
                        <div>
                            <div className="flex space-x-4">
                                <div>
                                    <span className="text-xs">Status</span>
                                </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="text-xs">{task.status}</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleChange("status", "Not Started")}>Not Started</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleChange("status", "To Do")}>To Do</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleChange("status", "Awaiting Feedback")}>Awaiting Feedback</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleChange("status", "Revisions Needed")}>Revisions Needed</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleChange("status", "Done")}>Done</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-hidden mt-8">
                            <BlockNoteView
                                editor={editor}
                                sideMenu={false}
                                className="h-[500px]"
                                onChange={() => handleChange("content", JSON.stringify(editor.document))}
                            />
                        </div>
                    </div>
                </form>
        </div>
    )
}
