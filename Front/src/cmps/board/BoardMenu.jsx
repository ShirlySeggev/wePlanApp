import { Component } from 'react';
import { ModalHeader } from '../shared/ModalHeader.jsx';
import { BoardBackground } from './BoardBackground.jsx';
import { ActivityLog } from './ActivityLog.jsx';
import { CgClose } from 'react-icons/cg';
import { BoardMembers } from './BoardMembers';
import { BoardBackgroundImg } from './BoardBackgroundImg.jsx';

export class BoardMenu extends Component {
    state = {
        toggleBoardBcg: false,
        toggleRemoveBoard: false,
        toggleActivity: false,
    }

    componentDidMount() {
    }


    toggleBoardBcg = () => {
        this.setState({ toggleBoardBcg: !this.state.toggleBoardBcg })
    }

    toggleRemoveBoard = () => {
        this.setState({ toggleRemoveBoard: !this.state.toggleRemoveBoard })
    }
    toggleActivity = () => {
        this.setState({ toggleActivity: !this.state.toggleActivity })
    }
    toggleMembers = () => {
        this.setState({ isMembers: !this.state.isMembers })
    }


    onRemove = () => {
        console.log('here');
        const { board, onRemoveBoard } = this.props;
        onRemoveBoard(board._id);
        // this.props.history.push('/board');
    }

    onUpdateBgc = (newStyle) => {
        const { board, onUpdateBoard } = this.props;
        const updatedBoard = { ...board };
        updatedBoard.style = newStyle;
        onUpdateBoard(updatedBoard);
    }

    onUpdateBgImg = (newStyle) => {
        const { board, onUpdateBoard } = this.props;
        const updatedBoard = { ...board };
        updatedBoard.style.img = newStyle;
        console.log(updatedBoard.style);
        onUpdateBoard(updatedBoard);
    }


    render() {
        const { toggleBoardBcg, toggleRemoveBoard, toggleActivity } = this.state;
        const { toggleBoardMenu, toggleMembers, isMembers, board, onUpdateBoard } = this.props;
        const { activities } = this.props.board;
        return (
            <section className="wePlanApp-menu open" >
                <ModalHeader title='About this board' closeModal={toggleBoardMenu} />
                <ul className="menu-options">
                    <li onClick={this.toggleBoardBcg}>Change board background</li>

                    <li onClick={toggleMembers} >Add a member</li>
                    {isMembers && <BoardMembers toggleMembers={toggleMembers} onUpdateBoard={onUpdateBoard} members={board.members} board={board} />}

                    <li onClick={this.toggleRemoveBoard}>Delete board</li>
                    <li onClick={this.toggleActivity}>Activity menu</li>
                    <li>Board dashboard</li>
                    {toggleBoardBcg &&
                        <div>
                            <BoardBackground onUpdateBgc={this.onUpdateBgc} />
                            <BoardBackgroundImg chooseBgcImg={this.onUpdateBgImg} />
                        </div>
                    }
                    {toggleRemoveBoard &&
                        <div className="delete-board-container">
                            <p>Are you shure?</p>
                            <div className="yes-no-btns">
                                <button className="primary-btn" onClick={this.onRemove}>Yes, delete board</button>
                                <CgClose className="cancel-btn" onClick={this.toggleRemoveBoard} />
                            </div>
                        </div>
                    }
                    {toggleActivity && <ActivityLog activities={activities} />}
                </ul>

            </section >
        )
    }
}
