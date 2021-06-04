import { GroupPreview } from './GroupPreview.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GroupAdd } from './GroupAdd';

export function GroupList({ groups, board, loggedInUser, updateGroup, removeGroup, addGroup, handleDragEnd }) {
    return (
        <section className="group-list" >
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="groups" type="group"  direction="horizontal">
                    {(provided) => (
                        <div className="groupList-container" {...provided.droppableProps} ref={provided.innerRef} >
                            {groups.map((group, index) =>
                                <Draggable key={group.id} draggableId={group.id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <GroupPreview
                                                group={group}
                                                board={board}
                                                key={group.id}
                                                updateGroup={updateGroup}
                                                removeGroup={removeGroup}
                                                handleDragEnd={handleDragEnd}
                                                provided={provided}
                                                loggedInUser={loggedInUser}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                            }
                            {provided.placeholder}
                            <GroupAdd loggedInUser={loggedInUser} addGroup={addGroup} />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}

