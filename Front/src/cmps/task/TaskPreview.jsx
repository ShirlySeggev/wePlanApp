import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { FiCheckSquare } from 'react-icons/fi';
import { TaskLabelPreview } from './TaskDetails/TaskLabelPreview';
import { TaskMembersPreview } from './TaskDetails/TaskMembersPreview';

export class TaskPreview extends Component {
    state = {
        isChecked: false,
    }

    componentDidMount() {
    }

    render() {
        const { task, board, groupId } = this.props;
        const { id, title, dueDate, labelIds, members } = task;
        let date = new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', }).format(dueDate)
        return (
            <div className="task-preview">
                {labelIds && <div className="taskDetails-labels" >
                    <TaskLabelPreview labelIds={labelIds} isOpen={false} />
                </div>}
                <Link className="task-preview-info" to={`/board/${board._id}/group/${groupId}/task/${id}`}>
                    <div className="task-preview-header">
                        <span className="task-preview-title">{title}</span>
                        <Link to={`/board/${board._id}/group/${groupId}/task/${id}`}><BiEditAlt className="editable" /></Link>
                    </div>
                    {task.img?.url ? <img className="task-preview-img" src={task.img.url} /> : ''}
                    <div className="task-preview-status">
                        {members && <div className="task-preview-members" >
                            < TaskMembersPreview members={members} />
                        </div>}
                        {task.isDone &&
                            <div className="badges done"><FiCheckSquare /> <span>1/1</span></div>}
                        {/* <FiCheckSquare className="badges"/>} */}
                        {task.dueDate &&
                            <div className="badges date"> <AiOutlineClockCircle /><span> {date}</span></div>}
                    </div>
                </Link>
            </div>
        )

    }
}


