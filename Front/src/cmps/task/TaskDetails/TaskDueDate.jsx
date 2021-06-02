
import { Component } from 'react';
import React from 'react';


export class TaskDueDate extends Component {
  
  render() {

    return (
      <div>
        <label for="start">Due date:</label>
        <input
          name="dueDate"
          type="date"
          id="start"
          value={this.props.task.dueDate}
          onChange={this.props.onChange} />
      </div>
    );
  }
}
