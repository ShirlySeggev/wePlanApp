
import { Component } from 'react';
import React from 'react';
import { ModalHeader } from '../../shared/ModalHeader';


export class TaskDueDate extends Component {
  state = {
    dueDate: ''
  }

  handleDateChange = ({ target }) => {
    const { valueAsNumber } = target;
    this.setState({ dueDate: valueAsNumber })
  }

  onSaveDueDate = () => {
    const { task, updateTask } = this.props;
    const updatedTask = { ...task };
    updatedTask.dueDate = this.state.dueDate;
    updateTask(updatedTask, `edited due date`);
  }


  render() {
    const { modalPos, toggleDueDate } = this.props;
    return (
      <div className="TaskDueDate-modal" style={{ ...modalPos }}>
        <ModalHeader title='Due date' closeModal={toggleDueDate} />
        <div className="dueDate">
          <input
            name="dueDate"
            type="date"
            value={this.props.task.dueDate}
            onChange={this.handleDateChange} />
          <button className="primary-btn" onClick={this.onSaveDueDate}>Save</button>
        </div>
      </div>
    )
  }
}
