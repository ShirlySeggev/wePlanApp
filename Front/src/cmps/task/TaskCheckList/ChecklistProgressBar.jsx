import { Component } from "react";



export class ChecklistProgressBar extends Component {


    getCompletedRatio = (todos = []) => {
        const todoDone = todos.filter(todo => todo.isDone)
        const completeRatio = Math.floor((todoDone.length / todos.length) * 100)
        if (!completeRatio) return 0
        return completeRatio
    }

    render() {
        // const { completed } = this.state
        const { todos } = this.props
        const completed = { width: `${this.getCompletedRatio(todos)}%` }
        return (
            <section className="checklist-progress-bar-container">
                <h4>{completed.width}</h4>
                <div className="checklist-progress-bar-main">
                    <div className="checklist-progress-bar-secondery" style={completed}>
                    </div>
                </div>
            </section>
        )
    }
}