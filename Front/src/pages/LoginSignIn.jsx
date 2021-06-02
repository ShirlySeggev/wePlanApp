import React, { Component } from 'react'


export class LoginSignIn extends Component {
    state = {
        signupCred: {
            username: '',
            fullname: '',
            password: '',
            imgUrl: ''
        },
        loginCred: {
            username: '',
            password: ''
        },
        // googleCreds: {}
    }


    render(){
        return(
            <div>Users!!!</div>
        )
    }

}





// const mapStateToProps = state => {
//     return {
//       users: state.userModule.users,
//       loggedInUser: state.userModule.loggedInUser,
//       isLoading: state.systemModule.isLoading
//     }
//   }
//   const mapDispatchToProps = {
//     login,
//     logout,
//     signup,
//     removeUser,
//     loadUsers
//   }


// export const LoginSignIn = connect(mapStateToProps, mapDispatchToProps)(_LoginSignIn)
