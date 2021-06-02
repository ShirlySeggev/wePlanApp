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
        const task = this.createTask(taskTitle);
        const { group, updateGroup } = this.props;
        const updatedGroup = { ...group };
        updatedGroup.tasks.push(task);
        updateGroup(updatedGroup);
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
            byMember: {},
            style: {
                bgColor: utilService.getRandomColor()
            }
        }
        return task;
    }
    render() {
        const { title } = this.state.task;
        const { toggleUpdate } = this.state;
        return (
            <Fragment>
                <form className="task-add group-layout" onSubmit={this.onAddTask}>
                    <input type="text"
                        name="title"
                        value={title}
                        placeholder="+ Add another card"
                        autoComplete="off"
                        onChange={this.handleChange}
                        onFocus={this.toggleUpdate}
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






