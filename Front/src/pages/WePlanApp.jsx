import { connect } from 'react-redux';
import { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import { loadBoard, updateBoard, removeBoard } from '../store/actions/board.actions.js';
import { GroupList } from '../cmps/group/GroupList';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { TaskDetails } from '../cmps/task/TaskDetails/TaskDetails';
import { Loading } from '../cmps/shared/Loading';
import { Fragment } from 'react';
import { socketService } from '../services/socket.service';
import { utilService } from '../services/util.service.js';

class _WePlanApp extends Component {
    state = {
    }

    componentDidMount() {
        this.loadBoard();
        socketService.setup();
        socketService.on('board updated', boardId => {
            if (boardId === this.props.match.params.boardId) {
                this.loadBoard();
            }
        })
    }

    loadBoard = async () => {
        const { boardId } = this.props.match.params;
        try {
            await this.props.loadBoard(boardId);
        } catch (err) {
            console.log('Load Board:', err)
        }
    }

    updateBoard = async (board, activity) => {
        try {
            await this.props.updateBoard(board, activity);
        } catch (err) {
            console.log('Update Board:', err)
        }
    }

    onUpdateBoard = (board, txt = null) => {
        const { loggedInUser } = this.props;
        const user = loggedInUser ? loggedInUser : utilService.getGuestUser();
        /*  board.activities.unshift(utilService.addActivity(user, txt, null, null, null, 'this board')); */
        const activity = utilService.addActivity(user, txt, null, null, null, 'this board');
        this.props.updateBoard(board, activity);
    }

    onRemoveBoard = async (boardId) => {
        // const {loggedInUser, board} = this.props
        // if (!loggedInUser._id || loggedInUser._id !== board.createdBy._id) console.log('not creator');
        // console.log('loggedInUser', loggedInUser);
        // console.log('board', board);
        try {
            await this.props.removeBoard(boardId);
            this.props.history.push('/board')
        } catch (err) {
            console.log('couldnt remove board', err)
        }
    }

    updateGroup = (newGroup, txt = null) => {
        const { board, loggedInUser } = this.props;
        const groupIdx = board.groups.findIndex(group => group.id === newGroup.id);
        const updatedBoard = { ...board };
        const user = loggedInUser ? loggedInUser : utilService.getGuestUser();
        /* updatedBoard.activities.unshift(utilService.addActivity(user, activity, null, newGroup, null, null));  */
        const activity = utilService.addActivity(user, txt, null, newGroup, null, null);
        updatedBoard.groups[groupIdx] = newGroup;
        this.updateBoard(updatedBoard, activity);
    }

    removeGroup = (groupId) => {
        const { board, loggedInUser } = this.props;
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const updatedBoard = { ...board };
        const user = loggedInUser ? loggedInUser : utilService.getGuestUser();
        const activity = utilService.addActivity(user, `deleted list`, null, null, board, null);
        // updatedBoard.activities.unshift(utilService.addActivity(user, `deleted list`, null, null, board, null));
        updatedBoard.groups.splice(groupIdx, 1)
        this.updateBoard(updatedBoard, activity);
    }

    addGroup = (group) => {
        console.log(group);
        const { board, loggedInUser } = this.props;
        const updatedBoard = { ...board };
        const user = loggedInUser ? loggedInUser : utilService.getGuestUser();
        // updatedBoard.activities.unshift(utilService.addActivity(user, `added ${group.title}`, null, null, board, null));
        const activity = utilService.addActivity(user, `added ${group.title}`, null, null, board, null);
        updatedBoard.groups.push(group);
        console.log(updatedBoard);
        this.updateBoard(updatedBoard, activity);
    }

    handleDragEnd = async (res) => {
        console.log('in handleDragEnd')
        const { source, destination, type } = res;
        const { board } = this.props;
        const updatedBoard = { ...board };
        if (!destination) return;
        if (destination.droppableId === source.droppableId
            &&
            destination.index === source.index) return;
        if (type === 'group') {
            const newGroups = this._reorder(board.groups, source.index, destination.index);
            updatedBoard.groups = newGroups;
        } else if (type === 'task') {
            if (destination.droppableId === source.droppableId) {
                var groupIdx = board.groups.findIndex(group => group.id === source.droppableId)
                const newTasks = this._reorder(board.groups[groupIdx].tasks, source.index, destination.index);
                updatedBoard.groups[groupIdx].tasks = newTasks;
            } else if (destination.droppableId !== source.droppableId) {
                const sourceGroup = source.droppableId;
                const destinationGroup = destination.droppableId;
                //remove task from source group
                const sourceGroupIdx = board.groups.findIndex(group => group.id === sourceGroup)
                const sourceGroupItems = Array.from(board.groups[sourceGroupIdx].tasks)
                const [transferedItem] = sourceGroupItems.splice(source.index, 1);
                //add task to destination group
                const destinationGroupIdx = board.groups.findIndex(group => group.id === destinationGroup);
                const destinationGroupItems = Array.from(board.groups[destinationGroupIdx].tasks);
                destinationGroupItems.splice(destination.index, 0, transferedItem);
                //update groups in data
                updatedBoard.groups[sourceGroupIdx].tasks = sourceGroupItems;
                updatedBoard.groups[destinationGroupIdx].tasks = destinationGroupItems;
            }
        }
        await this.props.updateBoard(updatedBoard);
        this.loadBoard();
    }

    _reorder = (list, sourceIdx, destIdx) => {
        const items = Array.from(list);
        const [removedItem] = items.splice(sourceIdx, 1);
        items.splice(destIdx, 0, removedItem);
        return items;
    }


    render() {
        const { board } = this.props;
        if (!board) return <Loading />
        const { title, groups, style, loggedInUser } = this.props.board;
        const bg = style.img ? { backgroundImage: `url(${style.img})` } : { backgroundColor: style.bgc };
        return (
            <Fragment>
                <section className="wePlanApp-main-content" style={bg}>
                    <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} onRemoveBoard={this.onRemoveBoard} />
                    <Switch>
                        <Route path='/board/:boardId/group/:groupId/task/:taskId' component={TaskDetails} />
                    </Switch>
                    <GroupList groups={groups} loggedInUser={loggedInUser} board={board} updateGroup={this.updateGroup} removeGroup={this.removeGroup} addGroup={this.addGroup} handleDragEnd={this.handleDragEnd} />
                </section >
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    removeBoard
}

export const WePlanApp = connect(mapStateToProps, mapDispatchToProps)(_WePlanApp)