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
import { BiCreditCard, BiTimeFive } from 'react-icons/bi';
import { MdLabelOutline, MdContentCopy } from 'react-icons/md';
import { BsPerson, BsCheckBox, BsArrowRightShort, BsTrash, BsImage } from 'react-icons/bs';
import { TaskLabelPreview } from './TaskLabelPreview';
import { Loading } from '../../shared/Loading';
import { TaskMembersPreview } from './TaskMembersPreview';
import { CgClose } from 'react-icons/cg';
import { SectionTitle } from '../../shared/SectionTitle';
import { utilService } from '../../../services/util.service';

let modalPos;

class _TaskDetails extends Component {
    state = {
        task: null,
        group: null,
        isDate: false,
        toggleTaskLabel: false,
        toggleImgUpload: false,
        toggleAddCheckList: false,
        toggleMembers: false,
        toggleDueDate: false,
        toggleTaskCopy: false,
    }

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

    copyTask = () => {
        const { board } = this.props;
        const { task, group } = this.state;
        const copiedTask = {...task}
        copiedTask.id = utilService.makeId()
        console.log('copiedTask', copiedTask);
        const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id);
        const updatedGroup = { ...group };
        updatedGroup.tasks.push(copiedTask);
        console.log('updatedGroup', updatedGroup);
        const updatedBoard = { ...board };
        updatedBoard.groups.splice(groupIdx, 1, updatedGroup)
        console.log('updatedBoard', updatedBoard);
        this.updateBoard(updatedBoard);
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
        this.setState(prevState => (
            { ...prevState, task: { ...prevState.task, img: '' } }
        ), () => {
            this.updateTask(this.state.task)
        })
        this.updateBoard(updatedBoard);
    }

    taskDetailsRef = React.createRef();

    modalPos = (ev) => {
        let { top, left } = this.taskDetailsRef.current.getBoundingClientRect();
        top = parseFloat(top);
        left = parseFloat(left) + 100;
        const { clientX, clientY } = ev;
        modalPos = { left: clientX - left + 'px', top: (clientY - top) + 'px' };
    }
    toggle = (ev, key) => {
        const computed = {
            key
        }
        computed.key = 'toggle' + utilService.capitalize(key);
        console.log(computed.key);
        !this.state[computed.key] && this.modalPos(ev);
        this.setState({ [computed.key]: !this.state[computed.key] });
    }

    render() {
        const { board } = this.props;
        const { task, group, toggleTaskLabel, isDate, toggleTaskCopy, toggleAddCheckList, toggleMembers, toggleImgUpload, toggleDueDate } = this.state;
        if (!task) return <Loading />
        const { checklists, labelIds, comments, members, img, dueDate } = this.state.task;
        const isImg = task.img?.url;
        let dueDateToShow = new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', }).format(dueDate)
        return (
            <section className="TaskDetails-modal">

                <Link to={`/board/${board._id}/`}>
                    <div className="main-screen">
                    </div>
                </Link>

                <section ref={this.taskDetailsRef} className="taskDetails-container" >

                    <div className="taskDetails-header">
                        <TaskDetailsHeader task={task} group={group} updateTask={this.updateTask} />
                        <Link to={`/board/${board._id}/`}><CgClose className="closeIcon" /></Link>
                    </div>

                    <div className="taskDetails-body">

                        <div className="task-details">

                            <section className="taskDetails-task-status">
                                {members && <div className="task-members-preview">
                                    {(members.length) > 0 ? <p>MEMBERS</p> : ''}
                                    < TaskMembersPreview members={members} />
                                </div>}

                                {labelIds && <div className="taskDetails-labels">
                                    {(labelIds.length) > 0 ? <p>LABELS</p> : ''}
                                    <div className="labels-container">
                                        < TaskLabelPreview labelIds={labelIds} isOpen={true} />
                                    </div>
                                </div>}

                                {dueDate && <div className="taskDetails-DueDate">
                                    <p>DUE DATE</p>
                                    <div className="date-dueDate">
                                        <CheckBox task={task} handleChange={this.handleChange} isChecked={task.isDone} updateTask={this.updateTask} />
                                        <p>{dueDateToShow}</p>
                                    </div>
                                </div>}
                            </section>

                            <TaskDetailsDescription task={task} updateTask={this.updateTask} />

                            {isImg && <div className="">
                                <SectionTitle className="img-title" Icon={BsImage}>Images</SectionTitle>
                                <img className="uploaded-img" src={img.url} alt="content" />
                                <button className="secondary-btn" onClick={this.deletImg}>Delete</button>
                            </div>
                            }

                            {checklists && <ChecklistList checklists={checklists} task={task} updateTask={this.updateTask} />}

                            <TaskDetailsActivity task={task} board={board} updateTask={this.updateTask} />
                        </div>

                        {/* POPUPS BUTTONS */}
                        <ul className="task-actions">
                            {/* ADD MEMBERS */}
                            <li className="detail-act-btn" onClick={ev => this.toggle(ev, 'members')}><BsPerson /><span className="txt">Memebrs</span></li>
                            {/* ADD LABELS */}
                            <li className="detail-act-btn" onClick={ev => this.toggle(ev, 'taskLabel')}><MdLabelOutline /><span className="txt">Labels</span></li>
                            {/* ADD DATES */}
                            <li className="detail-act-btn" onClick={ev => this.toggle(ev, 'dueDate')}><BiTimeFive /><span className="txt">Due Date</span></li>
                            {/* ADD CHECLIST */}
                            <li className="detail-act-btn" onClick={ev=>this.toggle(ev,'addCheckList')}><BsCheckBox /><span className="txt">Checklist</span></li>
                            {/* ADD IMAGE */}
                            <li className="detail-act-btn" onClick={ev=>this.toggle(ev,'imgUpload')}><BsImage /><span className="txt">Image</span></li>
                            {/* MOVE TASK */}
                            <li className="detail-act-btn"><BsArrowRightShort /><span className="txt">Move</span></li>
                            {/* COPY TASK */}
                            <li className="detail-act-btn" onClick={this.copyTask}><MdContentCopy /><span className="txt">Copy</span></li>
                            {/* DELETE TASK */}
                            <li className="detail-act-btn" onClick={this.removeTask}><BsTrash /><span className="txt">Delete</span></li>
                        </ul>

                        {/* POPUPS */}
                        {toggleMembers && <TaskMembers modalPos={modalPos} members={board.members} task={task} toggleMembers={ev => this.toggle(ev, 'members')} updateTask={this.updateTask} />}
                        {toggleTaskLabel && <TaskLabel modalPos={modalPos} task={task} updateTask={this.updateTask} toggleTaskLabel={ev => this.toggle(ev, 'taskLabel')} />}
                        {toggleAddCheckList && <ChecklistAdd modalPos={modalPos} task={task} toggleAddCheckList={ev=>this.toggle(ev,'addCheckList')} updateTask={this.updateTask} />}
                        {toggleImgUpload && <TaskImg modalPos={modalPos} updateImg={this.updateImg} toggleImgUpload={ev=>this.toggle(ev,'imgUpload')}/>}
                        {toggleDueDate && <TaskDueDate modalPos={modalPos} task={task} updateTask={this.updateTask} toggleDueDate={ev => this.toggle(ev, 'dueDate')} />}
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



