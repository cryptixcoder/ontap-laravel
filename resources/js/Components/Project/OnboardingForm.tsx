import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

type FormErrors = {
    [key: string]: string | undefined;
};

interface FormData {
    title: string;
    responses: {
        questionId: number;
        response: string;
    }[];
}

export default function OnboardingForm({ project, questions }: { questions: any[], project: any}) {
    const { data, setData, post, errors } = useForm<FormData>({
        title: project.title,
        responses: questions.map((question) => ({
            questionId: question.id,
            response: ''
        }))
    });

    const handleSubmit:FormEventHandler = (e) => {
        e.preventDefault();

        post(route('project.onboard', project.id), {
            preserveScroll: true,
            onSuccess: () => {

            }
        })
    }

    const getResponseError = (index: number): string | undefined => {
        const formErrors = errors as { [key: string]: string | undefined };
        return formErrors[`responses.${index}.response`] || formErrors[`responses.${index}`];
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Project Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>
                    {questions.map((question, index) => (
                        <div key={question.id} className="space-y-2">
                            <Label>{question.question}</Label>

                            {question.type === 'input' && (
                                <Input
                                    id={`questions[${index}].response`}
                                    name={`questions[${index}].response`}
                                    value={data.responses[index].response}
                                    onChange={(e) =>
                                        setData('responses', data.responses.map((r, i) => (i === index ? { ...r, response: e.target.value } : r)))
                                    }
                                />
                            )}

                            {question.type === 'textarea' && (
                                <Textarea
                                    id={`questions[${index}].response`}
                                    name={`questions[${index}].response`}
                                    value={data.responses[index].response}
                                    onChange={(e) =>
                                        setData('responses', data.responses.map((r, i) => (i === index ? { ...r, response: e.target.value } : r)))
                                    }
                                />
                            )}

                            {getResponseError(index) && (
                                <p className="text-sm text-red-500">{getResponseError(index)}</p>
                            )}
                        </div>
                    ))}

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                Please fix the errors above before submitting the form.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex justify-end mt-4">
                        <Button type="submit">
                            Complete Onboarding
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
