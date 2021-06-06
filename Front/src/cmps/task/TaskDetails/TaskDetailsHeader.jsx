import { Component } from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { SectionTitle } from '../../shared/SectionTitle';


export class TaskDetailsHeader extends Component {
    state = {
        task: {
            title: '',
        },
    }

    componentDidMount() {
        const { title } = this.props.task;
        const task = { title };
        this.setState({ task });
    }

    handleChange = (ev) => {
        var task = { ...this.state.task };
        var { name, value } = ev.target;
        task[name] = value;
        this.setState({ task })
    }

    updateTaskTitle = (ev) => {
        ev.preventDefault();
        const { task, updateTask } = this.props
        const newTask = { ...task };
        newTask.title = this.state.task.title;
        updateTask(newTask, `edited ${newTask.title} title`)
    }

    render() {
        const { title } = this.state.task;
        const { group } = this.props;
        return (
            <header className="details-main-header">
                <form className="details-header" onSubmit={this.updateTaskTitle}>
                    <BiCreditCard className="detailsIcon" />
                    <input className="task-title" type="text" name="title" value={title} autoComplete="off" spellCheck="false" onChange={this.handleChange} onBlur={this.updateTaskTitle}/>
                </form>
                <p className="taskDetails-header-subtext">in list <span>{group.title}</span></p>
            </header>
        )
    }

}
