
import { Component } from 'react';

export class CheckBox extends Component {


    render() {
        // const { isChecked}= this.props.task.isDone
        return (
                <input
                    name="isDone"
                    checked={this.props.isChecked}
                    type="checkbox"
                    id="myCheck"
                    onChange={this.props.handleChange}
                    title="Done?"
                >
                </input>

        )
    }
}