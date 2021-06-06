import { Component } from "react";
import { utilService } from '../../../services/util.service';
import { CgClose } from 'react-icons/cg';



export class CheckListAddTodo extends Component {
    state = {
        title: ''
    }

    // onEnter = (ev) => {
    //     if (ev.key === "Enter" && ev.shiftKey === false) {
    //         ev.preventDefault()
    //         this.onAddTodo()
    //     }
    // }

    onAddTodo = () => {
        const { title } = this.state
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
            [field]: value
        }
        )
    }

    render() {
        const { title } = this.state
        return (
            <div className="checklist-add-todo-container">
                <input className="add-item" type="text" value={title} name="title"
                    onBlur={this.onAddTodo}
                    onChange={this.handleChange}
                    autoFocus={true}
                    spellCheck="false"
                    placeholder="Add an item"
                // onKeyDown={this.onEnter} 
                ></input>
                <div className="yes-no-btns">
                    <button className="primary-btn" onClick={this.onAddTodo}>Add</button>
                    <CgClose className="cancel-btn" onClick={this.props.toggleAddTodo} />
                </div>
            </div>
        )
    }

}