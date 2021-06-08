import React, { Component } from 'react'
import logo from '../assets/img/logo.jpeg'
import { connect } from 'react-redux'
import { UserLogin } from '../cmps/user/UserLogin'
import { UserSignup } from '../cmps/user/UserSignup'
import { UserLogout } from '../cmps/user/UserLogout'
import { setUser, logout } from '../store/actions/user.actions'

class _LoginSignup extends Component {
    state = {
        msg: '',
        isNewUser: false,
    }

    submitUser = async (user, isGoogle) => {
        const { isNewUser } = this.state
        const { setUser } = this.props
        try {
            await setUser(user, isNewUser, isGoogle)
            this.setState({ msg: '' })
            if (this.props.loggedInUser) this.props.history.push(`/board`)
            else {
                this.props.history.push(`/login`)
                this.setState({ msg: 'user name or password not matching' })
            }

        } catch (err) {
            this.setState({ msg: 'having some issues, try again please' })
            console.log(err, 'error in submitUser: ', err);
            this.props.history.push(`/login`)
        }
    }

    userLogout = async () => {
        await this.props.logout()
        try {
            this.props.history.push(`/`)
            this.setState({ isNewUser: true })
        } catch (err) {
            console.log(err, 'error in userLogout: ', err);
        }
    }


    toggleNewUser = () => {
        this.setState({ isNewUser: !this.state.isNewUser });
    }
    // toggleGoogle = () => {
    //     this.setState({ isGoogle: !this.state.isGoogle });
    // }

    setMsg = (msg) => {
        this.setState({ ...this.state, msg })
    }




    render() {
        const { msg, isNewUser } = this.state
        const { setUser, loggedInUser } = this.props
        return (
            <section className='user-log-page'>

                <header >
                    <img src={logo} alt="logo" />
                    <h1>WePlan</h1>
                </header>

                <span className="msg-user">{msg}</span>

                {/* LOGIN */}
                {!loggedInUser && !isNewUser && <UserLogin
                    setMsg={this.setMsg}
                    submitUser={this.submitUser}
                    setUser={setUser}
                    toggleNewUser={this.toggleNewUser}
                />}

                {/* SIGNUP */}
                {!loggedInUser && isNewUser && <UserSignup
                    setMsg={this.setMsg}
                    submitUser={this.submitUser}
                    toggleNewUser={this.toggleNewUser}
                />}

                {/* LOGOUT */}
                {loggedInUser && <UserLogout
                    userLogout={this.userLogout}
                    loggedInUser={loggedInUser}
                />}



            </section>
        )
    }

}





const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    setUser,
    logout
}


export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
