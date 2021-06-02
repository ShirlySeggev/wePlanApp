import { Component } from 'react';
import { BsTextLeft } from 'react-icons/bs';
import { SectionTitle } from '../../shared/SectionTitle';



export class TaskDetailsDescription extends Component {
    state = {
        description: '',
        toggleUpdate: false
    }

    componentDidMount() {
        const description = this.props.task.description;
        this.setState({ description });
    }

    toggleUpdate = () => {
        this.setState({ toggleUpdate: !this.state.toggleUpdate })
    }

    handleChange = ({ target }) => {
        var description = { ...this.state }
        description = target.value;
        this.setState({ description })
    }

    updateTaskDescription = () => {
        const { description } = this.state;
        const newTask = { ...this.props.task, description }
        this.props.updateTask(newTask);
        this.toggleUpdate();
    }

    render() {
        const { description, toggleUpdate } = this.state;
        return (
            <section className="taskDetails-description">
                 <SectionTitle Icon={BsTextLeft}>Description</SectionTitle>
                {(description)
                    ? <textarea className="text-area-description" value={description} name="description" spellCheck="false" onChange={this.handleChange} onFocus={this.toggleUpdate} />
                    : <textarea className="text-area-description" value={description} name="description" placeholder="Add a more detailed description..." spellCheck="false" onChange={this.handleChange} rows="2"
                        onBlur={this.updateTaskDescription} onFocus={this.toggleUpdate}
                    />
                }
                {toggleUpdate && <button className="primary-btn" onClick={this.updateTaskDescription}>Save</button>}
            </section>
        )
    }

}