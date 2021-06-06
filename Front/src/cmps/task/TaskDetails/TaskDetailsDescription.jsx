import { Component } from 'react';
import { BsTextLeft } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
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
        this.props.updateTask(newTask, `edited description`);
        this.toggleUpdate();
    }

    render() {
        const { description, toggleUpdate } = this.state;
        return (
            <section className="taskDetails-description">
                 <SectionTitle className="detailsIcon" Icon={BsTextLeft}>Description</SectionTitle>
                {(description)
                    ? <textarea className="text-area-description" value={description} name="description" spellCheck="false" onChange={this.handleChange} onFocus={this.toggleUpdate} />
                    : <textarea className="text-area-description" value={description} name="description" placeholder="Add a more detailed description..." spellCheck="false" onChange={this.handleChange} rows="2"
                        onBlur={this.updateTaskDescription} onFocus={this.toggleUpdate}
                    />
                }
                {toggleUpdate &&
                    <div className="yes-no-btns">
                        <button className="primary-btn" onClick={this.updateTaskDescription}>Save</button>
                        <CgClose className="cancel-btn" onClick={this.toggleUpdate}/> 
                    </div>}
            
            </section>
        )
    }

}