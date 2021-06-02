import { Component } from 'react';
import { BsTextLeft } from 'react-icons/bs';
import { utilService } from '../../../services/util.service';
import { formatDistance } from 'date-fns'
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
        const comment = this.addComment();
        const { task, updateTask } = this.props;
        const newTask = { ...task };
        if (newTask.comments) newTask.comments.unshift(comment);
        else {
            newTask.comments = [];
            newTask.comments.unshift(comment);
        }
        updateTask(newTask);
        this.clearComment();
        console.log('newTask', newTask);
    }

    addComment = () => {
        const newComment = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            txt: this.state.comment.txt,
            byMember: {
                _id: "u101",
                fullname: "Neil Seggev",
                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }
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
            <section>
                <div className="taskDetails-coment">
                    <span className="avatar"><MemberAvatar member={{
                        "_id": "u1001",
                        "fullname": "Guess User",
                        "imgUrl": "http://some-img"
                    }} /></span>
                    <textarea className="text-area-comment"
                        value={comment.txt}
                        name="txt"
                        placeholder="Write a comment..."
                        spellCheck="false"
                        onChange={this.handleChange}
                        onFocus={this.toggleUpdate}
                    />
                </div>
                {toggleUpdate && <button className="primary-btn" onClick={this.saveComment}>Save</button>}
            </section>
        )
    }

}