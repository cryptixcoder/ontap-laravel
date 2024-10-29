import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { timeAgo } from '@/lib/utils';

const getInitials = (name: string) => {
    return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
}

export default function Comment({ comment }: { comment: any}) {
    return (
        <div key={comment.id} className="flex space-x-3">
            <div>
                <Avatar>
                    <AvatarFallback className='bg-slate-500 text-white text-sm'>{getInitials(comment!.user.name as string)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div>
                    <span className="font-semibold text-xs">{comment?.user.name} - {timeAgo(new Date(comment.created_at))}</span>
                </div>
                <div className="text-sm">
                    {comment.content}
                </div>
            </div>
        </div>
    )
}
