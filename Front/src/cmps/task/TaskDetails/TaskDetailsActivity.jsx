import { Component, Fragment } from 'react';
import { formatDistance } from 'date-fns';
import { utilService } from '../../../services/util.service.js';
import { SectionTitle } from '../../shared/SectionTitle.jsx';
import { BiCommentDots } from 'react-icons/bi';
import MemberAvatar from '../../shared/MemberAvatar.jsx';
import { TaskComment } from './TaskComment.jsx';

export class TaskDetailsActivity extends Component {
    state = {
        toggleActivity: false,
        activities: []
    }

    componentDidMount() {
        const { board } = this.props;
        const { id } = this.props.task;
        const activities = board.activities.filter(activity => {
            if (activity.task) {
                return activity.task.id === id;
            }
        })
        this.setState({ activities })
    }

    onToggleActivity = () => {
        this.setState({ toggleActivity: !this.state.toggleActivity })
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => {
            return {
                comment: {
                    ...prevState.comment,
                    [field]: value
                }
            }
        })
    }

    render() {
        const { toggleActivity, activities } = this.state;
        const { task } = this.props;
        let comments;
        if (task.comments) comments = true;
        else comments = false;
        return (

            <div className="taskActivity-container" >
                <div className="activity-header">
                    <SectionTitle className="detailsIcon" Icon={BiCommentDots}>Activity</SectionTitle>
                    <button className="secondary-btn" onClick={this.onToggleActivity}>{toggleActivity ? 'Hide details' : 'Show details'}</button>
                </div>

                <TaskComment task={this.props.task} updateTask={this.props.updateTask} />
                {comments &&
                    task.comments.map((comment, idx) => {
                        return <div key={comment.id} className="activity">
                            <span className="avatar"><MemberAvatar member={comment.byMember} /></span>
                            <div className="activity-description">
                                <p><span>{comment.byMember.fullname}</span> {formatDistance(comment.createdAt, Date.now())} </p>
                                <p className="comment-txt">{comment.txt}</p>
                            </div>

                        </div>
                    })
                }
                {toggleActivity && <Fragment>
                    {activities.map(activity => {
                        return <div key={activity.id}>
                            <div className="activity">
                                <span className="avatar"><MemberAvatar member={activity.byMember} /></span>
                                <div className="activity-description">
                                    <p ><span>{activity.byMember.fullname}</span> {activity.txt} to {activity.task.title}</p>
                                    <p>{formatDistance(activity.createdAt, Date.now())} ago</p>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </Fragment>
                }

            </div>

        )
    }
}