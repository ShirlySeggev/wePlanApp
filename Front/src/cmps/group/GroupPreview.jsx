import { TaskList } from '../task/TaskList';
import { GroupHeader } from './GroupHeader';
import { TaskAdd } from '../task/TaskAdd';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';




export function GroupPreview({ group, board, updateGroup, removeGroup, handleDragEnd }) {
    const { id, title, tasks } = group;


    return (
        <section>
            <Link to={`/board/${board._Id}/`}>
                <div className="main-screen">
                </div>
            </Link>
            <section className="group-preview">
                <div className="group-container">
                    <GroupHeader group={group} updateGroup={updateGroup} removeGroup={removeGroup} />
                    <TaskList tasks={tasks} groupId={id} board={board} handleDragEnd={handleDragEnd} />
                    <TaskAdd group={group} updateGroup={updateGroup} removeGroup={removeGroup}/>
                </div>
            </section>
        </section>

    )
}









