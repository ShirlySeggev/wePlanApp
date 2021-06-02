import { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCheckBox, BsCalendar } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { FiCheckSquare } from 'react-icons/fi';
import { GrEdit } from 'react-icons/gr';
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
                <div className="task-preview-header">
                    {labelIds && <div className="taskDetails-labels" >
                        <TaskLabelPreview labelIds={labelIds} isOpen={false} />
                    </div>}
                    <Link to={`/board/${board._id}/group/${groupId}/task/${id}`}><BiEditAlt className="editable" /></Link>
                </div>
                <Link className="task-preview-info" to={`/board/${board._id}/group/${groupId}/task/${id}`}>
                    <span className="task-preview-title">{title}</span>
                    {task.img?.url ? <img className="img-task-preview" src={task.img.url} /> : ''}
                    <div className="task-preview-status">
                        <div className="">
                            {task.isDone &&
                                <div className="badges"> <FiCheckSquare /> </div>}
                            {task.dueDate &&
                                <div className="badges"> <BsCalendar /> {date}</div>}
                        </div>
                        {members && <div className="task-preview-members" >
                            < TaskMembersPreview members={members} />
                        </div>}
                    </div>
                </Link>
            </div>
        )

    }
}


