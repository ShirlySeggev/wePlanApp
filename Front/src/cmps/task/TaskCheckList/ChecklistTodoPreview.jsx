import { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CgClose } from 'react-icons/cg';
import { Loading } from "../../shared/Loading";


export class ChecklistTodoPreview extends Component {
    state = {
        title: '',
        isTodoClick: false
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

    // onEnter = (ev) => {
    //     ev.preventDefault();
    //     if (ev.key === "Enter" && ev.shiftKey === false) {
    //         this.onUpdateTodo()
    //     } 
    //     else return
    // }


    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ [field]: value })
    }

    render() {
        if (!this.props.todo) return <Loading />
        const { removeTodo } = this.props
        const { isDone, id } = this.props.todo
        const { title, isTodoClick } = this.state
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
                        // onKeyDown={this.onEnter} 
                        ></input>
                        <div className="yes-no-btns">
                            <button className="primary-btn" onClick={this.onUpdateTodo}>Save</button>
                            <CgClose className="cancel-btn" onClick={this.toggleTodoClick} />
                        </div>
                    </div>}
                </div>
                <button className="secondary-btn" onClick={() => removeTodo(id)}>{<FontAwesomeIcon icon={faTrash} />}</button>
            </li>
        )
    }
}