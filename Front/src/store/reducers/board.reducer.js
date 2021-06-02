const initialState = {
    boards: null,
    board: null,

}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'ADD_BOARD':
            return { ...state, boards: [action.board, ...state.boards] }
        case 'REMOVE_BOARD':
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
        case 'UPDATE_BOARD':
            return { ...state, boards: [action.board, ...state.boards.filter(board => action.board._id !== board._id)] }
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        default:
            return state
    }
}
