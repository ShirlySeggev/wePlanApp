import { userService } from '../../services/user.service.js';
// import {sessionService} from '../../services/sessionStorageService'

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


export function setUser(user, isNewUser) {
  return async (dispatch) => {
    var loggedUser;
    try {
      if (isNewUser) loggedUser = await userService.signup(user);
      else loggedUser = await userService.login(user);
      delete loggedUser.password
      const action = {
        type: "SET_USER",
        loggedUser,
      };
      // sessionService.store('loggedUserDB', loggedUser)
      dispatch(action);
    } catch (err) {
      console.log("UserActions: err in seting the user", err);
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

