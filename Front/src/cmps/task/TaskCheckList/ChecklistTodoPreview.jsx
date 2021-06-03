import { Component } from "react";
import EasyEdit, { Types } from 'react-easy-edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "../../shared/Loading";


export class ChecklistTodoPreview extends Component {
state ={
    title: ''
}
    onUpdateTodo = (title) => {
        const { todo } = this.props
        this.props.updateTodo({...todo, title})
    }

    toggleIsDone = ({ target }) => {
        const { todo } = this.props
        this.props.updateTodo({ ...todo, isDone: target.checked })
    }

    onEnter = (ev) => {
        ev.preventDefault();
        if (ev.key === "Enter" && ev.shiftKey === false) {
            this.onUpdateTodo()
        }
    }

    
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ [field]: value })
    }

    render() {
        if (!this.props.todo) return <Loading/>
        const { removeTodo } = this.props
        const { title, isDone, id } = this.props.todo
        return (

            <li className="checklist-todo-container">
                <input type="checkbox" onChange={this.toggleIsDone} checked={isDone} value={isDone} />
                <div style={isDone ? { textDecoration: 'line-through' } : {}}>
                    <input type="text" value={title} 
                    onChange={this.handleChange} 
                    onBlur={this.onUpdateTodo} 
                    onKeyDown={this.onEnter}  
                    />
                    {/* <EasyEdit
                        type={Types.TEXT}
                        value={title}
                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                        onSave={this.onUpdateTodo}
                        onBlur={this.onUpdateTodo} /> */}
                </div>
                <button className="secondary-btn" onClick={() => removeTodo(id)}>{<FontAwesomeIcon icon={faTrash} />}</button>
            </li>
        )
    }
}