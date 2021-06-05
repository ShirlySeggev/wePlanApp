import { userService } from '../../services/user.service.js';

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}


export function setUser(user, isNewUser, isGoogle) {
  return async (dispatch) => {
    var loggedUser;
    try {
      if (isNewUser || isGoogle) loggedUser = await userService.signup(user, isGoogle);
      else loggedUser = await userService.login(user);
      delete loggedUser.password
      const action = {
        type: "SET_USER",
        loggedUser,
      };
      dispatch(action);
    } catch (err) {
      console.log("UserActions: err in seting the user:", err);
      return ('no match')
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      userService.logout();
      const action = {
        type: "CLEAR_USER",
      };
      // sessionService.clear()
      dispatch(action);
    } catch {
      console.log("couldnt log out!!");
    }
  };
}

// ---------------------------------------------------------------------------------
// export function removeUser(userId) {
//   return async dispatch => {
//     try {
//       await userService.remove(userId)
//       dispatch({ type: 'REMOVE_USER', userId })
//     } catch (err) {
//       console.log('UserActions: err in removeUser', err)
//     }
//   }
// }
// export function setUserAfterRefresh(loggedUser) {
//   return (dispatch) => {
//     const action = {
//       type: "SET_USER",
//       loggedUser,
//     };
//     dispatch(action);
//   };
// }

