import { Component } from "react";
import { connect } from 'react-redux';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MemberAvatar from '../shared/MemberAvatar'
import { ModalHeader } from '../shared/ModalHeader';
import { loadUsers } from '../../store/actions/user.actions'
import { updateBoard } from '../../store/actions/board.actions'

class _BoardMembers extends Component {
    state = {
        boardMembers: [],
        notBoardMembers: []
    }


    componentDidMount() {
        this.loadAllUsers()
    }

    async loadAllUsers() {
        try {
            await this.props.loadUsers()
            this.setState({
                boardMembers: this.loadBoardMembers(),
                notBoardMembers: this.loadNotBoardMembers()
            })
        } catch (err) {
            console.log('Error at loading usrers:', err)
        }
    }

    loadBoardMembers() {
        const { members } = this.props
        return members
    }

    loadNotBoardMembers() {
        const { members, users } = this.props
        if (!members) return users
        const notBoardMembers = users.filter(user => {
            return !members.find(member => member._id === user._id)
        })
        return notBoardMembers
    }


    async onClickMember(member) {
        const { users, board, onUpdateBoard } = this.props
        const { boardMembers } = this.state
        if (!boardMembers) board.members = [member]
        else {
            let newBoard
            const isBoardMember = boardMembers.find(boardMember => boardMember._id === member._id)
            isBoardMember ?
                newBoard = { ...board, members: board.members.filter(currMember => currMember._id !== member._id) }
                : newBoard = { ...board, members: [...board.members, member] }
                onUpdateBoard(newBoard);
            this.setState({
                boardMembers: this.loadBoardMembers(),
                notBoardMembers: this.loadNotBoardMembers()
            },() => this.loadAllUsers())
        }

    }


    render() {
        const { toggleMembers } = this.props
        const { boardMembers, notBoardMembers } = this.state
        return (
            <div className="add-members-container">
                <ModalHeader title='Members' closeModal={toggleMembers} />
                <ul>
                    <h4 className="task-members-ul-title">Invite users</h4>
                    {boardMembers && boardMembers.map(member =>
                        <li key={member._id} className="task-add-member-container" onClick={() => this.onClickMember(member)}>
                            <MemberAvatar member={member} />
                            <h4>{member.fullname}</h4>
                            <h4>({member.username})</h4>
                            {<FontAwesomeIcon icon={faCheck} />}
                        </li>)}

                    {!notBoardMembers && <div>No available members to add</div>}
                    {notBoardMembers && notBoardMembers.map(member =>
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



function mapStateToProps(state) {
    return {
        users: state.userModule.users,
    }
}
const mapDispatchToProps = {
    loadUsers,
    updateBoard
}



export const BoardMembers = connect(mapStateToProps, mapDispatchToProps)(_BoardMembers)