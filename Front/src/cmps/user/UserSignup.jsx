import { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import {LoginGoogle} from './GoogleLogin';

export class UserSignup extends Component {
    state = {
        fullname: '',
        username: '',
        email: '',
        imgUrl: '',
        password: '',
        passwordConfirm: '',
        googleId: ''
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { fullname, password, email, passwordConfirm, username } = this.state
        const { submitUser, setMsg } = this.props

        if (!password || !fullname || !email || !passwordConfirm || !username) return setMsg('Please fill all fields')
        if (password.length < 7) return setMsg('Password must include 7 letters or numbers')
        if (password !== passwordConfirm) return setMsg('Passwords not match')
        if (username.length < 4) return setMsg('User name must include at least 4 letters or numbers')

        delete this.state.passwordConfirm
        submitUser(this.state, false)
        this.setState({
            fullname: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            googleId: ''
        })
    }




    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState({ [field]: value })
    }



    render() {
        const { toggleNewUser, submitUser, setMsg } = this.props
        return (
            <Fragment>

            <main>
                <h3>Sign Up!</h3>

                <form className="user-signup-container ">

                    <label htmlFor="fullname">Full name</label>
                    <input type="text" name="fullname" placeholder="full name" id="fullname" onChange={this.handleChange} spellCheck="false"/>

                    <label htmlFor="username">User name</label>
                    <input type="text" name="username" placeholder="user name" id="username" onChange={this.handleChange} spellCheck="false"/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="example@mail.com" onChange={this.handleChange} spellCheck="false"/>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="enter password, must contain at least 7 letters or numbers" name="password" id="password" onChange={this.handleChange} spellCheck="false"/>

                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <input type="password" placeholder="confirm password" name="passwordConfirm" id="passwordConfirm" onChange={this.handleChange} spellCheck="false"/>

                </form>
                <button className="user-signup-btn" onClick={this.onSubmit}>Submit!</button>
                <NavLink to="/login" onClick={toggleNewUser}>Already have an account? Login!</NavLink>
                
                <h5 className="social-login">or</h5>
 
                    {/* GOOGLE LOGIN */}
                <LoginGoogle submitUser={submitUser} setMsg={setMsg}/>
    
            </main>


            </Fragment>
        )
    }
}