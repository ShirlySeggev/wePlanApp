import { Component } from "react";
import { utilService } from '../../../services/util.service';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTimes } from '@fortawesome/free-solid-svg-icons';



export class CheckListAddTodo extends Component {
    state = {
        title: ''
    }
    
    onEnter = (ev) => {
        if (ev.key === "Enter" && ev.shiftKey === false) {
            ev.preventDefault()
            this.onAddTodo()
        }
    }

    onAddTodo = () => {
        const {title} = this.state
        if (!title) return
        const todo = this.createNewTodo(title)
        this.props.addNewTodo(todo)
    }

    createNewTodo = (title) => {
        const todo = {
            id: utilService.makeId(),
            title,
            isDone: false
        }
        return todo
    }


    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({
            [field]: value}
            )
    }

    render() {
        const { title } = this.state
        return (
            <div className="checklist-add-todo-container">
                <TextField name="title" value={title} placeholder="Write a comment..." 
                onChange={this.handleChange} 
                onKeyDown={this.onEnter}>
                </TextField>
                <div className="checklist-add-todo-actions">
                <button onClick={this.onAddTodo}>Add</button>
                <button onClick={this.props.toggleAddTodo}>{<FontAwesomeIcon icon={faTimes}/>}</button>
                </div>
            </div>
        )
    }

}