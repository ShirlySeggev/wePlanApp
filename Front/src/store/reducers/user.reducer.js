let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  users: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'SET_USER':
      return { ...state, loggedInUser: action.loggedUser }
      case "CLEAR_USER":
        return { ...state, loggedInUser: null };
    // case 'REMOVE_USER':
    //   return { ...state, users: state.users.filter(user => user._id !== action.userId) }
    default:
      return state
  }
}
