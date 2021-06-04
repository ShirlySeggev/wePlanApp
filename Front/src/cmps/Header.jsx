import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineViewBoards } from 'react-icons/hi';
import { Component } from 'react';
import { Avatar } from "@material-ui/core";
import MemberAvatar from './shared/MemberAvatar'
import { connect } from 'react-redux';
import { utilService } from '../services/util.service';


class _Header extends Component {

    render() {
        const { user } = this.props;
        return (
            <header className="app-header">
                <nav>
                    <div className="header-format"><NavLink to="/"><BiHomeAlt /></NavLink></div>
                    <div className="header-format"><NavLink to="/board" className="boards-btn"><HiOutlineViewBoards /><span className="board">Boards</span></NavLink></div>
                </nav>
                <div ><NavLink to="/"><h1>WePLAN</h1></NavLink></div>
                {!user && <div className="user-avatar"><NavLink to="/login"><span className="header-format">Login</span></NavLink></div>}
                {user && <div className="user-avatar"><NavLink to="/logout"><MemberAvatar member={user} key={user._id} /></NavLink></div>}
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.loggedInUser,
    }
}

export const Header = connect(mapStateToProps)(_Header)
