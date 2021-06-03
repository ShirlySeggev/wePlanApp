import { Component } from 'react';
import MemberAvatar from '../shared/MemberAvatar';
import { BoardMenu } from './BoardMenu.jsx';
import { BsThreeDots } from 'react-icons/bs';
import { Loading } from '../shared/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { BoardMembers } from './BoardMembers';

export class BoardHeader extends Component {
    state = {
        isMembers: false,
        toggleMenu: false,
        board: {
            title: '',
        }
    }

    componentDidMount() {
        const { title } = this.props.board;
        const board = { title };
        this.setState({ board });
    }

    handleChange = (ev) => {
        var board = { ...this.state.board };
        var { name, value } = ev.target;
        board[name] = value;
        this.setState({ board })
    }

    onChangeBoardHeader = (ev) => {
        ev.preventDefault();
        const { board, onUpdateBoard } = this.props;
        const updatedBoard = { ...board };
        updatedBoard.title = this.state.board.title;
        onUpdateBoard(updatedBoard);
    }



    toggleBoardMenu = () => {
        this.setState({ toggleMenu: !this.state.toggleMenu })
    }

    toggleMembers = () => {
        this.setState({ isMembers: !this.state.isMembers })
    }

    render() {
        const { board , onUpdateBoard} = this.props;
        const { toggleMenu, isMembers } = this.state;
        const { title } = this.state.board;
        if (!board) return <Loading />
        const { groups, style, members } = this.props.board;
        return (
            <section className="wePlanApp-header" >
                <form onSubmit={this.onChangeBoardHeader}>
                    <input className="board-header" type="text" name="title" value={title} autoComplete="off" spellCheck="false" onChange={this.handleChange} />
                </form>
                <div className="board-members">
                    {members.map(member => <MemberAvatar member={member} key={member._id} />)}
                    <div onClick={this.toggleMembers}><MemberAvatar member={{ fullname: '+' }} key={Date.now()} /></div>
                </div>
                <div className="board-menu-btn btn" onClick={this.toggleBoardMenu}>
                    <BsThreeDots />
                    <span>Show menu</span>
                </div>
                {toggleMenu && <BoardMenu board={board} toggleMembers={this.toggleMembers} isMembers={isMembers} toggleBoardMenu={this.toggleBoardMenu} onRemoveBoard={this.props.onRemoveBoard} onUpdateBoard={this.props.onUpdateBoard} />}
               {isMembers && <BoardMembers toggleMembers={this.toggleMembers} onUpdateBoard={onUpdateBoard} members={board.members} board={board} />}
                {/* {toggleMenu && <BoardMenu board={board} toggleBoardMenu={this.toggleBoardMenu} onRemoveBoard={this.props.onRemoveBoard} onUpdateBoard={this.props.onUpdateBoard} />} */}
            </section >
        )
    }
}

