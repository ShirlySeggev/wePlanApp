import { Avatar } from "@material-ui/core";
import { Component } from "react";


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
                <h3>Log out of your WePlan account</h3>

                <div className="user-logout-container">
                    <Avatar src="/broken-image.jpg" />
                    <div>
                        <h5>{fullname}</h5>
                        <h6>{email}</h6>
                    </div>
                </div>

                {!isLogout && <button onClick={this.onUserLogout}>Log out</button>}

                {isLogout && <div className="user-logout-auth">
                    <h6>Are you sure you want to logout?</h6>
                    <div>
                    <button onClick={() => this.onUserLogoutRes(true)} >Yes, logout</button>
                    <button onClick={() => this.onUserLogoutRes(false)} >No</button>
                    </div>
                </div>}

            </main>
        )
    }
}