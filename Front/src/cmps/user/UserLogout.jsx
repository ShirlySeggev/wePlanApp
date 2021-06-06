import { Avatar } from "@material-ui/core";
import { Component, Fragment } from "react";
import { CgClose } from 'react-icons/cg';
import { LogoutGoogle } from './GoogleLogout';
import MemberAvatar from '../shared/MemberAvatar';


export class UserLogout extends Component {
    state = {
        isCheckLogout: false
    }

    onUserLogout = () => {
        this.setState({ isCheckLogout: true })
    }

    onUserLogoutRes = (res) => {
        if (res) {
            this.props.userLogout()
        }
        else this.setState({ isCheckLogout: false })
    }

    render() {
        const { isCheckLogout } = this.state
        const { setMsg, loggedInUser } = this.props
        const { fullname, email } = loggedInUser
        return (
            <main>
                <h3>Logout of your WePlan account</h3>

                <div className="user-logout-container">
                    <MemberAvatar member={this.props.loggedInUser} />
                    <div>
                        <h5>{fullname}</h5>
                        <h6>{email}</h6>
                    </div>
                </div>

                {!isCheckLogout && <button onClick={this.onUserLogout}>Log out</button>}

                {isCheckLogout && <div className="user-logout-auth">
                    <h6>Are you sure you want to logout?</h6>

                    <div className="yes-no-btns">
                      <div onClick={this.onUserLogoutRes}><LogoutGoogle /></div>
                        <button onClick={() => this.onUserLogoutRes(false)}><CgClose /></button>
                    </div>

                </div>}

            </main>
        )
    }
}