import CommentForm from '@/Components/Comments/CommentForm';
import CommentFeed from '@/Components/Comments/CommentFeed';

export default function Comments({ comments, id, type }: { comments: any, id: string, type: string}) {
    return (
        <div>
            <CommentFeed comments={comments} />
            <CommentForm id={id} type={type}/>
        </div>
    )
}
