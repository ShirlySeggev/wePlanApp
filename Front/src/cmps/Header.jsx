import React from 'react';
import { NavLink } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { HiOutlineViewBoards } from 'react-icons/hi';
import { Component } from 'react';
import MemberAvatar from './shared/MemberAvatar'
import { connect } from 'react-redux';


class _Header extends Component {

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <header className="app-header">
                <nav>
                    <NavLink to="/" ><div className="header-format first"><ImHome className="home" /></div></NavLink>
                    <NavLink to="/board" className="header-format"><div className="boards-btn"><HiOutlineViewBoards className="home"/><span className="board">Boards</span></div></NavLink>
                </nav>
                <NavLink to="/"><h1>WePLAN</h1></NavLink>
                { !user && <div className="user-avatar"><NavLink to="/login"><span className="header-format">Login</span></NavLink></div>}
                { user && <div className="user-avatar"><NavLink to="/logout"><MemberAvatar member={user} key={user._id} /></NavLink></div>}
            </header >
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.loggedInUser,
    }
}

export const Header = connect(mapStateToProps)(_Header)
