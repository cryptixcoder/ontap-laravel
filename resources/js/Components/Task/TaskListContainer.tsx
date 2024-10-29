"use client"
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import TaskList from './TaskList'
import { GroupedTasks } from '@/types'
import { Head, Link, useForm, router } from '@inertiajs/react';
// import { updateTaskCard } from '@/actions/tasks'


export default function TaskListContainer({ tasks, admin = false }: {tasks: GroupedTasks[], admin?:boolean}) {
    const [groupedTasks, setGroupedTasks] = useState<GroupedTasks[]>(tasks)
    const { data, setData, put } = useForm({
        draggableId: '',  // Task ID to move
        status: '',       // New status (destination list)
        position: 0       // New position in the destination list
    });

    useEffect(() => {
        setGroupedTasks(tasks);
    }, [tasks]);

    const onDragDrop = async (result: any) => {

        const { destination, source, draggableId } = result;

        if(!destination) return;

        if(destination.droppableId == source.droppableId && destination.index == source.index) {
            return;
        }

        if(destination.droppableId == "To Do") {
            const toDoGroup = groupedTasks.find((group) => group.id == "To Do");
            if(toDoGroup && toDoGroup.tasks.length > 0) {
                return;
            }
        }

        const start = groupedTasks.find((group) => group.id === source.droppableId);
        const finish = groupedTasks.find((group) => group.id === destination.droppableId);

        if (!start || !finish) return // Add type guard

        if(start === finish) {
            const newTaskIds = Array.from(start.tasks);
            const [movedTask] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, movedTask);

            const newGroup = {
                ...start,
                tasks: newTaskIds,
            };

            const newGroupedTasks = groupedTasks.map(group =>
                group.id === newGroup.id ? newGroup : group
            );

            setGroupedTasks(newGroupedTasks)

            return
        }

        // Moving between different lists
        const startTaskIds = Array.from(start.tasks);
        const [movedTask] = startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            tasks: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.tasks);

        finishTaskIds.splice(destination.index, 0, movedTask);

        const newFinish = {
            ...finish,
            tasks: finishTaskIds,
        };

        const newGroupedTasks = groupedTasks.map(group => {

            if (group.id === newStart.id) {
                return newStart;
            }

            if (group.id === newFinish.id) {
                return newFinish;
            }

            return group;
        });


        setGroupedTasks(newGroupedTasks)

        // setData({
        //     draggableId: draggableId,
        //     status: finish.id,
        //     position: destination.index
        // })
        // setData("draggableId", draggableId);
        // setData("status", finish.id)
        // setData("position", destination.index)
        // console.log(data);

        router.put(route('task.update.position', draggableId), {
            draggableId: draggableId,
            status: finish.id,
            position: destination.index
        })

        // setTimeout(() => {
        //      put(route('task.update.position', draggableId), {
        //         preserveScroll: true,
        //         onSuccess: () => {}
        //     });
        // }, 1000)
    }

    return (
        <DragDropContext onDragEnd={onDragDrop}>
            <Droppable droppableId='lists' type="list" direction='horizontal'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-4 h-full mt-4">
                        {groupedTasks.map((list, index) => (
                            <TaskList key={list.id} list={list} index={index} admin={admin} />
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
