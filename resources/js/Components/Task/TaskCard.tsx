import { Draggable } from '@hello-pangea/dnd'
// import { Task } from '@prisma/client'
import { Link } from '@inertiajs/react';

type TaskCardProps = {
    card: any,
    index: number,
    admin: boolean
}

export default function TaskCard({ card, index, admin }:TaskCardProps) {
    return (
        <Draggable draggableId={`${card.id}`} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Link href={admin ? `/admin/customers/${card.organizationId}/tasks/${card.id}` : `/tasks/${card.id}`}>
                        <div className="w-full group relative py-3 text-primary border border-b-2 border-r-2 rounded-lg shadow-sm hover:shadow dark:shadow-white/20 flex flex-col gap-2 border-border/85 hover:border-border focus-within:border-primary/15 bg-white dark:bg-[#161616] transition-colors hover:cursor-pointer active:cursor-grabbing px-3">
                            <span className="text-sm">{card.title}</span>
                        </div>
                    </Link>
                </div>
            )}
        </Draggable>
    )
}
