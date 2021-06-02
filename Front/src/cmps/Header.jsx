import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineViewBoards } from 'react-icons/hi';
import { Avatar } from '@material-ui/core';
import logo from '../assets/img/mainlogo03.png';
import { Component } from 'react';


export class Header extends Component {

    render() {
        return (
            <header className="app-header">
                <nav>
                    <div className="header-format"><NavLink to="/"><BiHomeAlt /></NavLink></div>
                    <div className="header-format"><NavLink to="/board" className="boards-btn"><HiOutlineViewBoards /><span>Boards</span></NavLink></div>
                </nav>
                <div ><NavLink to="/"><h1>WePLAN</h1></NavLink></div>
                <div ><Avatar /></div>
                {/* <img src={logo} alt="" /> */}
            </header>
        )
    }
}
