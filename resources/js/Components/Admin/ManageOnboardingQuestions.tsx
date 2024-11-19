import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Button } from '../ui/button';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { ScrollArea } from "@/Components/ui/scroll-area"

import { Label } from '../ui/label';

interface Question {
    id: number,
    question: string,
    type: 'input' | 'textarea' | 'file' | string
}

type QuestionProps = {
   questions: Array<Question>
}

type ManageOnboardingQuestionsProps = {
    productId: string
    questions: Array<Question>
}

export default function ManageOnboardingQuestions({ questions = [], productId}: ManageOnboardingQuestionsProps) {
    const { data, setData, post } = useForm<QuestionProps>({
        questions: questions
    })

    const handleSave:FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.product.store.questions', productId), {
            preserveScroll: true,
            onSuccess: () => {

            },
        })
    }

    const addQuestion = () => {
        setData('questions', [...(data.questions || []), { id: 0, question: '', type: 'input'}])
    }

    const removeQuestion = (index:number) => {
        const questions = [...(data.questions || [])]
        questions.splice(index, 1)
        setData('questions', questions)
    }

    const updateQuestion = (index: number, field: 'question' | 'type', value: string) => {
        setData(
            'questions',
            data.questions.map((question, i) => (
                i === index ?
                { ...question, [field]: value } :
                question
            ))
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    Manage Questions
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Manage Onboarding Questions</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    <p>Manage the onboarding questions for your users.</p>
                </SheetDescription>

                <ScrollArea className="h-full w-full pb-[50px]">
                    <form onSubmit={handleSave} className="mt-4 space-y-4 ">
                        {data.questions?.map((field, index) => (
                            <div key={index} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Question</Label>
                                    <Input
                                        id={`questions[${index}].question`}
                                        name={`questions[${index}].question`}
                                        value={field.question}
                                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Question Type</Label>
                                    <Select
                                        defaultValue={field.type}
                                        onValueChange={(value) => updateQuestion(index, 'type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Input" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="input">Input</SelectItem>
                                            <SelectItem value="textarea">Textarea</SelectItem>
                                            <SelectItem value="file">File</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Button type="button" variant="ghost" onClick={() =>removeQuestion(index)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div>

                        </div>
                        <div className="pt-8 flex justify-between">
                            <Button type="button" variant="ghost" onClick={addQuestion}>
                                Add Question
                            </Button>
                            <Button type="submit">
                                Save Questions
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
