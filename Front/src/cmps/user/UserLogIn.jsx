import { Component } from "react";
import { NavLink } from 'react-router-dom';


export class UserLogin extends Component {
    state = {
        txt: '',
        password: '',
    }


    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState({ [field]: value })
    }

    onSubmitUser = (ev) => {
        ev.preventDefault()
        const { txt, password } = this.state
        const { submitUser, setMsg } = this.props

        if (password.length < 7) return setMsg('Password must include 7 letters or numbers')
        if (txt.length < 4) return setMsg('User name / email must include 4 letters or numbers')
        if (!password || !txt) return setMsg('Please fill all fields')
        submitUser(this.state)
    }

    render() {
        const {toggleNewUser} = this.props

        return (
            <main className="user-login-container">
                <h3>Log in to WePlan</h3>
                <form className="inputs-container">
                    <input type="text" name="txt" placeholder="Enter username or email" autofocus="autofocus" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <button onClick={this.onSubmitUser}>Log In</button>
                </form>
                <NavLink to="/signup" onClick={toggleNewUser}>Dont have account yet? <span>Sign up for free!</span></NavLink>
            </main>
        )
    }
}