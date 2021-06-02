import { boardService } from '../../services/board.service.js'


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
        } catch (err) {
            console.log('BoardActions: err in save board', err)
        }
    }
}

export function updateBoard(board) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board })
            await boardService.update(board)
            // const updatedBoard = await boardService.update(board)
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
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
        }
    }
}



