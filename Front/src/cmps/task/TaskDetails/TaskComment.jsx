import { Component } from 'react';
import { utilService } from '../../../services/util.service';
import { userService } from '../../../services/user.service';
import MemberAvatar from '../../shared/MemberAvatar';




export class TaskComment extends Component {
    state = {
        comment: {
            txt: ''
        },
        toggleUpdate: false
    }

    componentDidMount() {

    }

    toggleUpdate = () => {
        this.setState({ toggleUpdate: !this.state.toggleUpdate })
    }

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => {
            return {
                comment: {
                    ...prevState.comment,
                    [name]: value
                }
            }
        })
    }

    saveComment = () => {
        const { txt } = this.state.comment;
        if (!txt) return;
        const comment = this.addComment();
        const { task, updateTask } = this.props;
        const newTask = { ...task };
        if (newTask.comments) newTask.comments.unshift(comment);
        else {
            newTask.comments = [];
            newTask.comments.unshift(comment);
        }
        updateTask(newTask, 'added a new comment');
        this.clearComment();
    }

    addComment = () => {
        const { txt } = this.state.comment;
        const newComment = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            txt,
            byMember: userService.getLoggedinUser() || utilService.getGuestUser()
        }
        return newComment;
    }

    clearComment = () => {
        const comment = {
            txt: ''
        }
        this.setState({ comment });
    }

    render() {
        const { comment, toggleUpdate } = this.state;

        return (
            <section className="comment-container">
                <div className="taskDetails-coment" >
                    <span className="avatar"><MemberAvatar member={userService.getLoggedinUser() || utilService.getGuestUser()} /></span>
                    <textarea className="text-area-comment"
                        value={comment.txt}
                        name="txt"
                        placeholder="Write a comment..."
                        spellCheck="false"
                        onChange={this.handleChange}
                        onFocus={this.toggleUpdate}
                    // onBlur={this.toggleUpdate}
                    />
                </div>
                {toggleUpdate && <button className="primary-btn" onClick={this.saveComment}>Save</button>}
            </section>
        )
    }

}