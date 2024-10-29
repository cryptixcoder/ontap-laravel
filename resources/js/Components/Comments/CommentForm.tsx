import { Textarea } from '@/Components/ui/textarea'
import { Button } from '@/Components/ui/button'
import { FormEventHandler } from 'react'
import { useForm } from '@inertiajs/react'

export default function CommentForm({ id, type }:{ id: string, type: string}) {
    const { data, setData, post, reset, processing } = useForm({
        id: id,
        type: type,
        comment: ''
    })

    const onSubmit:FormEventHandler = (e) => {
        e.preventDefault();

        post(route('comment.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('comment');
            }
        })
    }

    return (
        <div className="mt-8">
            <form onSubmit={onSubmit}>
                <Textarea
                    id="comment"
                    name="comment"
                    value={data.comment}
                    onChange={(e) => setData("comment", e.target.value)}
                    className='bg-white'
                    placeholder="Leave a comment"
                    disabled={processing}
                />

                <div className="mt-4">
                    <Button type='submit' disabled={processing}>Post Comment</Button>
                </div>
            </form>
        </div>
    )
}
