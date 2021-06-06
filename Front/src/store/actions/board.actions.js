import { boardService } from '../../services/board.service.js'
import { socketService } from '../../services/socket.service'



export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('BoardActions: err in loading boards', err)
        }
    }
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function addBoard(board) {
    return async dispatch => {
        try {
            const newBoard = await boardService.save(board)
            dispatch({ type: 'ADD_BOARD', board: newBoard })
            socketService.emit('board added', 'creating new board')
        } catch (err) {
            console.log('BoardActions: err in save board', err)
        }
    }
}

export function updateBoard(board, activity) {
    return async dispatch => {
        try {
            const boardCopy = JSON.parse(JSON.stringify(board));
            dispatch({ type: 'SET_BOARD', board: boardCopy })
            delete board.activities
            await boardService.update(board, activity)
            socketService.emit('board updated', board._id)
        } catch (err) {
            console.log('BoardActions: err in updateBoard', err)
        }
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            dispatch({ type: 'REMOVE_BOARD', boardId })
            await boardService.remove(boardId)
            socketService.emit('board removed', 'removing board')
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
        }
    }
}



