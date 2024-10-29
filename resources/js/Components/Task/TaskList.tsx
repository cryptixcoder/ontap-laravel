import { Droppable } from '@hello-pangea/dnd'
import { cn } from '@/lib/utils'
import TaskCard from './TaskCard'
import { TaskListProps } from '@/types'

export default function TaskList({ list, index, admin }:TaskListProps) {
    return (
        <div className="shrink-0 h-full w-[272px] select-none">
            <div className="bg-white px-3 w-full rounded-xl shadow-sm hover:shadow dark:shadow-white/20">
                <div className="py-4">
                    <h3 className="text-sm font-medium">{list.title} - ({list.title == "To Do" ? `${list.tasks.length}/1` : list.tasks.length})</h3>
                </div>
                <div>
                    <Droppable droppableId={list.id as string} type="card">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={cn("py-3 flex flex-col gap-y-4 rounded-md", list.tasks.length > 0 ? "mt-2" : "mt-0" )}
                            >
                                {list.tasks.map((card, index) => (
                                    <TaskCard admin={admin} key={card.id} card={card} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    )
}
