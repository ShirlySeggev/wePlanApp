import { TaskPreview } from './TaskPreview.jsx';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export function TaskList({ tasks, groupId, board, handleDragEnd }) {
    return (
        <section>
            <Droppable droppableId={groupId} type="task">
                {(provided, snapshot) => (

                    <div className="tasks-container group-layout" {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => {
                            return (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                       <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <TaskPreview
                                                task={task}
                                                key={task.id}
                                                groupId={groupId}
                                                provided={provided}
                                                board={board}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    )
}
