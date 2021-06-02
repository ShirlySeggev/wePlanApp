import { Component } from "react";
import {  faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MemberAvatar from '../../shared/MemberAvatar'
import { ModalHeader } from "../../shared/ModalHeader";


export class TaskMembers extends Component {
    state = {
        taskMembers: [],
        notTaskMembers: []
    }


    componentDidMount() {
        this.setState({
            taskMembers: this.loadTaskMembers(),
            notTaskMembers: this.loadNotTaskMembers()
        })
    }

    loadTaskMembers() {
        const { task } = this.props
        return task.members
    }

    loadNotTaskMembers() {
        const { members, task } = this.props
        if (!task.members) return members
        const notTaskMembers = members.filter(member => {
            return !task.members.find(currMember => currMember._id === member._id)
        })
        return notTaskMembers
    }


    onClickMember = (member) => {
        const { task } = this.props
        const { taskMembers } = this.state
        if (!taskMembers) task.members = [member]
        else {
            const isTaskMember = taskMembers.find(taskMember => taskMember._id === member._id)
            !isTaskMember ? task.members.push(member) : task.members = task.members.filter(currMember => currMember._id !== member._id)
            this.setState({
                taskMembers: this.loadTaskMembers(),
                notTaskMembers: this.loadNotTaskMembers()
            }, console.log('1', this.state))
        }
        this.props.updateTask(task)
    }


    render() {
        const { toggleMembers } = this.props
        const { taskMembers, notTaskMembers } = this.state
        return (
            <div className="task-add-members-container">
                <ModalHeader title='Members' closeModal={toggleMembers} />
                <ul>
                <h4 className="task-members-ul-title">Board members</h4>
                    {taskMembers && taskMembers.map(member =>
                        <li key={member._id} className="task-add-member-container" onClick={() => this.onClickMember(member)}>
                            <MemberAvatar member={member} />
                            <h4>{member.fullname}</h4>
                            <h4>({member.username})</h4>
                            {<FontAwesomeIcon icon={faCheck} />}
                        </li>)}

                    {!notTaskMembers && <div>No available members to add</div>}
                    {notTaskMembers && notTaskMembers.map(member =>
                        <li key={member._id} className="task-add-member-container" onClick={() => this.onClickMember(member)}>
                            <MemberAvatar member={member} />
                            <h4>{member.fullname}</h4>
                            <h4>({member.username})</h4>
                        </li>)}

                </ul>
            </div>

        )
    }
}

