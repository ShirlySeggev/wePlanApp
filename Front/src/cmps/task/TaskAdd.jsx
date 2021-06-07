import { Component, Fragment } from 'react';
import { utilService } from '../../services/util.service.js';
import { CgClose } from 'react-icons/cg';


export class TaskAdd extends Component {
    state = {
        toggleUpdate: false,
        task: {
            title: '',
        }
    }

    toggleUpdate = () => {
        this.setState({ toggleUpdate: !this.state.toggleUpdate })
    }

    handleChange = (ev) => {
        var task = { ...this.state.task }
        var { name, value } = ev.target
        task[name] = value;
        this.setState({ task })
    }

    onAddTask = (ev) => {
        ev.preventDefault()
        const taskTitle = this.state.task.title;
        if (!taskTitle) return this.toggleUpdate();
        const task = this.createTask(taskTitle);
        const { group, updateGroup } = this.props;
        const updatedGroup = { ...group };
        updatedGroup.tasks.push(task);
        updateGroup(updatedGroup, `added ${taskTitle}`);
        this.clearTask();
    }

    clearTask = () => {
        this.setState({
            toggleUpdate: false,
            task: {
                title: '',
            }
        })
    }

    createTask = (title) => {
        const {loggedInUser} = this.props
        let user
        loggedInUser ? user = {...loggedInUser} : user = {_id: 'guest', fullname: 'Guest', username: 'Guest'}
        const task = {
            id: utilService.makeId(),
            title,
            isDone: false,
            description: '',
            comments: [],
            checklists: [],
            members: [],
            labelIds: [],
            createdAt: Date.now(),
            dueDate: '',
            byMember: user,
            style: {
                bgColor: utilService.getRandomColor()
            }
        }
        console.log(task);
        return task;
    }
    render() {
        const { title } = this.state.task;
        const { toggleUpdate } = this.state;
        return (
            <Fragment>
                <form className="taskAdd" onSubmit={this.onAddTask}>
                    <input type="text"
                        name="title"
                        value={title}
                        placeholder="+ Add another card"
                        autoComplete="off"
                        spellCheck="false"
                        onChange={this.handleChange}
                        onFocus={this.toggleUpdate}
                        // onBlur={this.onAddTask}
                    />
                </form>
                {toggleUpdate &&
                    <div className="yes-no-btns">
                        <button className="primary-btn" onClick={this.onAddTask}>Add card</button>
                        <CgClose className="cancel-btn" onClick={this.toggleUpdate}/> 
                    </div>}
            </Fragment>

        )
    }
}






