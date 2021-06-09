import { Component, Fragment } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CgClose } from 'react-icons/cg';
import { Loading } from "../../shared/Loading";
import { connect } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { ModalHeader } from '../../shared/ModalHeader';
import { utilService } from '../../../services/util.service'
import { updateBoard, loadBoard } from '../../../store/actions/board.actions';


let modalPos;
class _ChecklistTodoPreview extends Component {
    state = {
        title: '',
        isTodoClick: false,
        toggleActions: false
    }

    componentDidMount() {
        this.setState({ title: this.props.todo.title })
    }

    onUpdateTodo = () => {
        const { title } = this.state
        const { todo } = this.props
        this.props.updateTodo({ ...todo, title })
        this.toggleTodoClick()
    }

    toggleIsDone = ({ target }) => {
        const { todo } = this.props
        this.props.updateTodo({ ...todo, isDone: target.checked })
    }

    toggleTodoClick = () => {
        this.setState({ isTodoClick: !this.state.isTodoClick })
    }

    toggleActions = (ev) => {
        const { clientX, clientY } = ev
        modalPos = { left: (clientX - 190) + 'px', top: (clientY - 100) + 'px' }
        this.setState({ toggleActions: !this.state.toggleActions })
    }

    convertToTask = () => {
        const { group, board, loggedInUser } = this.props
        const { title } = this.state
        const user = loggedInUser ? loggedInUser : utilService.getGuestUser();
        const newTask = this.createTask(title, user)
        const updatedGroup = { ...group, tasks: [...group.tasks, newTask] }
        const groupIdx = board.groups.findIndex(currGroup => group.id === currGroup.id)
        const updatedBoard = { ...board }
        updatedBoard.groups.splice(groupIdx, 1, updatedGroup)
        const activity = utilService.addActivity(user, 'convert Todo into task', newTask, null, null, null);
        this.updateBoard(updatedBoard, activity)
    }

    async updateBoard(board, activity) {
        try {
            await this.props.updateBoard(board, activity);
            await this.props.loadBoard(board._id);
        } catch (err) {
            console.log('On Task details, Update Board:', err)
        }
    }

    createTask = (title, user) => {
        const { loggedInUser } = this.props
        const task = {
            id: utilService.makeId(),
            title,
            isDone: false,
            description: '',
            comments: [],
            checklists: [],
            members: [user],
            labelIds: [],
            createdAt: Date.now(),
            dueDate: '',
            byMember: user,
            style: {
                bgColor: utilService.getRandomColor()
            }
        }
        return task;
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ [field]: value })
    }

    render() {
        if (!this.props.todo) return <Loading />
        const { removeTodo } = this.props
        const { isDone, id } = this.props.todo
        const { title, isTodoClick, toggleActions } = this.state
        return (

            <li className="checklist-todo-container">

                <input id="myCheck" type="checkbox" onChange={this.toggleIsDone} checked={isDone} value={isDone} />

                <div >

                    {!isTodoClick && <h6 style={isDone ? { textDecoration: 'line-through' } : {}} onClick={this.toggleTodoClick} className="checklist-todo">{title}</h6>}

                    {isTodoClick && <div className="todo-edit">
                        <input className="todo-edit-input" type="text" value={title} name="title"
                            onBlur={this.onUpdateTodo}
                            onChange={this.handleChange}
                            autoFocus={true}
                            spellCheck="false"
                        ></input>
                        <div className="yes-no-btns">
                            <button className="primary-btn" onClick={this.onUpdateTodo}>Save</button>
                            <CgClose className="cancel-btn" onClick={this.toggleTodoClick} />
                        </div>
                    </div>}
                </div>

                {/* TOOGLE ACTION MODAL */}
                <div className="todo-action-icon primary-btn" onClick={this.toggleActions}>
                <BsThreeDots  />
                </div>
                {toggleActions && <div className="todo-action-modal" style={{ ...modalPos }}>
                    <ModalHeader title='Item actions' closeModal={this.toggleActions} />

                    <div className="todo-action-btn-container">

                        <button className="todo-convert" onClick={ev => {
                            this.convertToTask()
                            this.toggleActions(ev)
                        }}>Convert to card</button>

                        <button className="todo-remove" onClick={ev => {
                            removeTodo(id)
                            this.toggleActions(ev)
                        }}>Delete</button>
                    </div>

                </div>}
            </li>
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    updateBoard,
    loadBoard
}

export const ChecklistTodoPreview = connect(mapStateToProps, mapDispatchToProps)(_ChecklistTodoPreview)


