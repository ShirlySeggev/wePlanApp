import { Component } from "react";
import EasyEdit, { Types } from 'react-easy-edit';
import { ChecklistTodoPreview } from './ChecklistTodoPreview'
import { CheckListAddTodo } from './ChecklistAddTodo'
import { ChecklistProgressBar } from './ChecklistProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BsCheckBox } from 'react-icons/bs';



export class ChecklistPreview extends Component {
    state = {
        isAddTodo: false
    }

    // --- CHECKLIST FUNCTIONS --- \\
    updateChecklistTitle = (title) => {
        const { checklist, task } = this.props
        const idx = this.findChecklistIdx()
        const newChecklist = { ...checklist, title }
        task.checklists.splice(idx, 1, newChecklist)
        this.props.updateTask(task)
    }

    removeChecklist = () => {
        const { task } = this.props
        const idx = this.findChecklistIdx()
        task.checklists.splice(idx, 1)
        this.props.updateTask(task)
    }

    findChecklistIdx = () => {
        const { task, checklist } = this.props
        const { id } = checklist
        return task.checklists.findIndex(checklist => checklist.id === id)
    }


    // --- TODOS FUNCTIONS --- \\
    removeTodo = (todoId) => {
        const { task } = this.props
        const idx = this.findChecklistIdx()
        const newTodos = task.checklists[idx].todos.filter(todo => todo.id !== todoId)
        task.checklists[idx].todos = newTodos
        this.props.updateTask(task)
    }

    updateTodo = (todo) => {
        const { task } = this.props
        const listIdx = this.findChecklistIdx()
        const todoIdx = task.checklists[listIdx].todos.findIndex(currTodo => currTodo.id === todo.id)
        task.checklists[listIdx].todos.splice(todoIdx, 1, todo)
        this.props.updateTask(task)
    }

    addNewTodo = (todo = null) => {
        const { task } = this.props
        if (todo) {
            const Idx = this.findChecklistIdx()
            if (task.checklists[Idx].todos) task.checklists[Idx].todos.push(todo)
            else task.checklists[Idx].todos = [todo]
            this.props.updateTask(task)
        }
        this.toggleAddTodo()
    }

    toggleAddTodo = () => {
        this.setState({ isAddTodo: !this.state.isAddTodo })
    }


    render() {
        if (!this.props.checklist) return <div>Loading...</div>
        const { checklist } = this.props
        const { isAddTodo } = this.state
        const { title, todos } = checklist
        return (
            <ul className="task-details-checklist-container">
                <header className="checklist-header">
                    <div className="checklist-title-container">
                        <div className="checklist-title">
                            <BsCheckBox />
                            <EasyEdit
                                type={Types.TEXT}
                                value={title}
                                focus={true}
                                saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                onBlur={this.updateChecklistTitle}
                                onSave={this.updateChecklistTitle}
                            />
                        </div>
                        <button className="secondary-btn" onClick={this.removeChecklist}>Delete</button>
                    </div>
                </header>
                <ChecklistProgressBar todos={todos}>
                </ChecklistProgressBar>
                <div className="checklist-todos-container">
                    {todos && todos.map(todo =>
                        <ChecklistTodoPreview
                            key={todo.id}
                            todo={todo}
                            updateTodo={this.updateTodo}
                            removeTodo={this.removeTodo}
                        />)}
                    {!isAddTodo && <button className="checklist-todo-add-btn secondary-btn" onClick={this.toggleAddTodo}>Add an item</button>}
                    {isAddTodo && <CheckListAddTodo
                        toggleAddTodo={this.toggleAddTodo}
                        addNewTodo={this.addNewTodo} />}
                </div>
            </ul>
        )
    }

}