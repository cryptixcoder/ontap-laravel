import Comment from '@/Components/Comments/Comment'

export default function CommentFeed({comments}: {comments: any[]}) {
    return (
        <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2">Feed</h3>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    )
}
