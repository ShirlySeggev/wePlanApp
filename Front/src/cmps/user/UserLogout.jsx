import { Component } from "react";
import { CgClose } from 'react-icons/cg';
import MemberAvatar from '../shared/MemberAvatar';


export class UserLogout extends Component {
    state = {
        isLogout: false
    }

    onUserLogout = () => {
        this.setState({ isLogout: true })
    }

    onUserLogoutRes = (res) => {
        if (res) {
            this.props.userLogout()
        }
        else this.setState({ isLogout: false })
    }

    render() {
        const { isLogout } = this.state
        const { fullname, email } = this.props.loggedInUser
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

                {!isLogout && <button onClick={this.onUserLogout}>Log out</button>}

                {isLogout && <div className="user-logout-auth">
                    <h6>Are you sure you want to logout?</h6>

                    <div className="yes-no-btns">
                        <button className="primary-btn" onClick={() => this.onUserLogoutRes(true)}>Yes, logout </button>
                        {/* <button onClick={() => this.onUserLogoutRes(false)} ><CgClose /></button> */}
                        <CgClose className="cancel-btn" onClick={() => this.onUserLogoutRes(false)} />
                    </div>

                </div>}

            </main>
        )
    }
}