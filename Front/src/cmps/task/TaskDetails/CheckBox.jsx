
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';

export class CheckBox extends Component {


    render() {
        // const { isChecked}= this.props.task.isDone
        return (
            <div className="tasks-container">
                <label htmlFor="myCheck">Done: </label>
                <input
                    name="isDone"
                    checked={this.props.isChecked}
                    type="checkbox"
                    id="myCheck"
                    onChange={this.props.handleChange}
                >
                </input>
             
            </div>

        )
    }
}