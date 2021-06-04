import { connect } from 'react-redux';
import { Component } from 'react';
import { loadBoards, addBoard } from '../store/actions/board.actions.js';
import { SectionTitle } from '../cmps/shared/SectionTitle';
import { HiOutlineViewBoards } from 'react-icons/hi';
import { BoardList } from '../cmps/board/BoardList';
import { BsPlus } from 'react-icons/bs';
import { BoardBackground } from '../cmps/board/BoardBackground.jsx';
import { ModalHeader } from '../cmps/shared/ModalHeader.jsx';
import { Loading } from '../cmps/shared/Loading.jsx';
import { BoardBackgroundImg } from '../cmps/board/BoardBackgroundImg.jsx';
import { socketService } from '../services/socket.service';
import { utilService } from '../services/util.service.js';
import { MdSpeakerGroup } from 'react-icons/md';

class _Boards extends Component {
    state = {
        isModalOpen: false,
        board: {
            title: '',
            style: {
                bgc: '#00AECC',
                bgcImg: ''
            }
        }
    }

    async componentDidMount() {
        this.loadBoards();
        socketService.setup();
        socketService.on('board added', msg => {
           this.loadBoards();
        })
        socketService.on('board removed', msg => {
            console.log(msg);
            this.loadBoards();
         })
    }

    async loadBoards() {
        try {
            this.props.loadBoards();
        } catch (err) {
            console.log('Error at loading boards:', err)
        }
    }

    newBoardModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    chooseBgc = (style) => {
        const board = { ...this.state.board };
        board.style = style;
        this.setState({ board });
    }

    chooseBgcImg = (style) => {
        const board = { ...this.state.board };
        board.style.bgcImg = style;
        this.setState({ board });
    }

    handleChange = (ev) => {
        var board = { ...this.state.board };
        var { name, value } = ev.target;
        board[name] = value;
        this.setState({ board })
    }

    onAddBoard = (ev) => {
        ev.preventDefault();
        const boardTitle = this.state.board.title;
        const boardBgc = this.state.board.style.bgc;
        const boardBgcImg = this.state.board.style.bgcImg;
        const board = this.createBoard(boardTitle, boardBgc, boardBgcImg);
        const { addBoard } = this.props;
        addBoard(board);
        this.loadBoards();
        this.newBoardModal()
        // this.props.history.push(`/board/${board._id}`);
    }


    createBoard = (title, bgc, img) => {
        const {user} = this.props
        const board = {
            title,
            createdAt: Date.now(),
            createdBy: user,
            style: {
                bgc,
                img
            },
            labels: [],
            members: [user],
            groups: [],
            activities: [],
        }
        if (!user){
            board.createdBy = {fullname: 'Guest', username: 'Guest', _id: 'guest'}
            board.members = [{fullname: 'Guest', username: 'Guest', _id: 'guest'}]
        } 
        return board;
    }


    render() {
        const { boards } = this.props;
        const { isModalOpen } = this.state;
        if (!boards) return <Loading />
        return (
            <section className="boardApp-main">
                <span className="boardApp-header">
                    <SectionTitle Icon={HiOutlineViewBoards}> Boards</SectionTitle>
                </span>
                <div className="boards-container">
                    <div className="boardAdd" onClick={this.newBoardModal}><BsPlus /> Add a new board</div>
                    <BoardList boards={boards} />
                </div>
                {isModalOpen && <div className="boardAdd-modal">
                    <ModalHeader title='New Board' closeModal={this.newBoardModal} />
                    <input className="boardAdd-input" type="text" name="title" id="title" placeholder="Board title" autoComplete="off" spellCheck="false" required onChange={this.handleChange} />
                    <BoardBackground onBoardsCompose={true} chooseBgc={this.chooseBgc} />
                    <BoardBackgroundImg chooseBgcImg={this.chooseBgcImg} />
                    <button className="secondary-btn" onClick={this.onAddBoard}>Create Board</button>
                </div>
                }
            </section >
        )
    }
}
function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        user: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    loadBoards,
    addBoard
}



export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)