import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TaskDetailsHeader } from './TaskDetailsHeader';
import { CheckBox } from './CheckBox';
import { TaskDetailsActivity } from './TaskDetailsActivity';
import { TaskDetailsDescription } from './TaskDetailsDescription';
import { ChecklistList } from '../TaskCheckList/ChecklistList';
import { ChecklistAdd } from '../TaskCheckList/ChecklistAdd';
import { updateBoard, loadBoard } from '../../../store/actions/board.actions';
import { TaskDueDate } from './TaskDueDate';
import { TaskImg } from './TaskImg';
import { TaskMembers } from './TaskMembers';
import { TaskLabel } from './TaskLabel';
import { GrFormClose } from 'react-icons/gr';
import { BiTimeFive } from 'react-icons/bi';
import { MdLabelOutline, MdContentCopy } from 'react-icons/md';
import { BsPerson, BsCheckBox, BsArrowRightShort, BsTrash, BsImage } from 'react-icons/bs';
import { TaskLabelPreview } from './TaskLabelPreview';
import { Loading } from '../../shared/Loading';
import { TaskMembersPreview } from './TaskMembersPreview';


let modalPos;
class _TaskDetails extends Component {
    state = {
        task: null,
        group: null,
        toggleTaskLabel: false,
        isDate: false,
        isImg: false,
       
        isChecklistAdd: false,
        isMembers: false
    }

    taskDetailsRef = React.createRef()

    componentDidMount() {
        this.loadTask();
    }

    loadTask = () => {
        const { boardId, groupId, taskId } = this.props.match.params;
        const { board } = this.props;
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = board.groups[groupIdx].tasks.find(task => task.id === taskId);
        this.setState({ task, group: board.groups[groupIdx] })
    }

    async updateBoard(board) {
        try {
            await this.props.updateBoard(board);
            await this.props.loadBoard(board._id);
        } catch (err) {
            console.log('On Task details, Update Board:', err)
        }
    }

    updateTask = (task) => {
        this.setState({ task })
        const taskId = task.id;
        const { id } = this.state.group;
        const { board } = this.props;
        const groupIdx = board.groups.findIndex(group => group.id === id)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        const updatedBoard = { ...board };
        updatedBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task)
        this.setState({ task: { ...task } })
        this.updateBoard(updatedBoard);
    }

    removeTask = () => {
        const taskId = this.state.task.id;
        const { id } = this.state.group;
        const { board } = this.props;
        const boardId = board._Id;
        const groupIdx = board.groups.findIndex(group => group.id === id);
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId);
        const updatedBoard = { ...board };
        updatedBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
        this.updateBoard(updatedBoard);
        this.props.history.push(`/board/${boardId}`)
    }

    handleChange = ({ target }) => {
        const { value, name, checked, type } = target
        let computedValue = type === 'checkbox' ? checked : value
        this.setState(prevState => (
            { ...prevState, task: { ...prevState.task, [name]: computedValue } }
        ), () => {
            this.updateTask(this.state.task)
        })
    }

    handleDateChange = ({ target }) => {
        const { valueAsNumber, name } = target
        var task = { ...this.state }
        task[name] = valueAsNumber;
        this.setState(prevState => (
            { ...prevState, task: { ...prevState.task, [name]: valueAsNumber } }
        ), () => {
            this.updateTask(this.state.task)
        })
    }

 
    updateImg = (imgUrl) => {
        console.log(imgUrl);
        this.setState(prevState => (
            { ...prevState, task: { ...prevState.task, img: imgUrl } }
        ), () => {
            this.updateTask(this.state.task)
        })
    }

    deletImg = () => {
        const taskId = this.state.task.id;
        const { id } = this.state.group;
        const { board } = this.props;
        const groupIdx = board.groups.findIndex(group => group.id === id);
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId);
        const updatedBoard = { ...board };
        updatedBoard.groups[groupIdx].tasks[taskIdx].img = '';
        this.updateBoard(updatedBoard);
    }

    toggleTaskLabel = (ev) => {
        let { top, left } = this.taskDetailsRef.current.getBoundingClientRect();
        top = parseFloat(top);
        left = parseFloat(left) + 100;
        const { clientX, clientY } = ev;
        modalPos = { left: clientX - left + 'px', top: (clientY - top) + 'px' };
        this.setState({ toggleTaskLabel: !this.state.toggleTaskLabel });
    }

    toggleDate = () => {
        this.setState({ isDate: !this.state.isDate });
    }

    toggleAddCheckList = () => {
        this.setState({ isChecklistAdd: !this.state.isChecklistAdd })
    }

    toggleMembers = () => {
        this.setState({ isMembers: !this.state.isMembers })
    }

    toggleImgUpload = () => {
        this.setState({ isImg: !this.state.isImg })
    }


    render() {
        const { board } = this.props;
        const { task, group, toggleTaskLabel, isDate, isChecklistAdd, isMembers } = this.state;
        if (!task) return <Loading />
        const { checklists, labelIds, comments, members } = this.state.task;
        return (
            <section className="TaskDetails-modal">

                <Link to={`/board/${board._id}/`}>
                    <div className="main-screen">
                    </div>
                </Link>

                <section ref={this.taskDetailsRef} className="taskDetails-container" >

                    <div className="taskDetails-header">
                        <TaskDetailsHeader task={task} group={group} updateTask={this.updateTask} />
                        <Link to={`/board/${board._id}/`}><GrFormClose className="modalHeader icon" /></Link>
                    </div>

                    <div className="taskDetails-body">

                        <div className="task-details">

                            {members && <div className="task-members-preview">
                                {(members.length) > 0 ? <p>MEMBERS</p> : ''}
                                < TaskMembersPreview members={members} isOpen={true} />
                            </div>}

                            {labelIds && <div className="taskDetails-labels">
                                {(labelIds.length) > 0 ? <p>LABELS</p> : ''}
                                <div className="labels-container">
                                    < TaskLabelPreview labelIds={labelIds} isOpen={true} />
                                </div>
                            </div>}

                            {isDate && <TaskDueDate onChange={this.handleDateChange} task={task} dueDate={this.state.task.dueDate} updateTask={this.updateTask} />}
                            {/* {this.state.isImg && onChange={this.handleDateChange} task={task} updateTask={this.updateTask} } */}
                            <CheckBox handleChange={this.handleChange} isChecked={this.state.task.isDone} updateTask={this.updateTask} task={task} />
                            <TaskDetailsDescription task={task} updateTask={this.updateTask} />

                            {task.img && <div>
                                <img className="uploaded-img" src={task.img.url} alt="content" />
                                <button onClick={this.deletImg}>Delete Img</button>
                            </div>
                            }
                            {checklists && <ChecklistList checklists={checklists} task={task} updateTask={this.updateTask} />}
                            {isChecklistAdd && <ChecklistAdd task={task} toggleAddCheckList={this.toggleAddCheckList} updateTask={this.updateTask} />}
                            <TaskDetailsActivity task={task} board={board} updateTask={this.updateTask} />
                        </div>

                        <ul className="task-actions">
                            {/* ADD MEMBERS */}
                            <li className="detail-act-btn" onClick={this.toggleMembers}><BsPerson /><span className="txt">Memebrs</span></li>
                            {isMembers && <TaskMembers toggleMembers={this.toggleMembers} updateTask={this.updateTask} members={board.members} task={task} />}
                            {/* ADD LABELS */}
                            <li className="detail-act-btn" onClick={this.toggleTaskLabel}><MdLabelOutline /><span className="txt">Labels</span></li>
                            {/* ADD DATES */}
                            <li className="detail-act-btn" onClick={this.toggleDate}><BiTimeFive /><span className="txt">Due Date</span></li>
                            {/* ADD CHECLIST */}
                            <li className="detail-act-btn" onClick={this.toggleAddCheckList}><BsCheckBox /><span className="txt">Checklist</span></li>
                            {/* ADD IMAGE */}
                            <li className="detail-act-btn" onClick={this.toggleImgUpload}><BsImage /><span className="txt">Image</span></li>
                            {/* MOVE TASK */}
                            <li className="detail-act-btn"><BsArrowRightShort /><span className="txt">Move</span></li>
                            {/* COPY TASK */}
                            <li className="detail-act-btn"><MdContentCopy /><span className="txt">Copy</span></li>
                            {/* DELETE TASK */}
                            <li className="detail-act-btn" onClick={this.removeTask}><BsTrash /><span className="txt">Delete</span></li>
                        </ul>

                        {toggleTaskLabel && <TaskLabel task={task} modalPos={modalPos} updateTask={this.updateTask} toggleTaskLabel={this.toggleTaskLabel} />}
                        {this.state.isImg && <TaskImg toggleImgUpload={this.toggleImgUpload}  updateImg={this.updateImg}/>}
                    </div>
                </section>
            </section >
        )

    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    updateBoard,
    loadBoard
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)



