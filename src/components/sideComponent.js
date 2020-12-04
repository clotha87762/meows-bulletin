import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/sideComponent.css'


const sideComponent = ({ isAuthed, logout }) => {

    if (isAuthed) {
        return (
            <div className='sidePanel'>
                isAuthed?

                <NavLink to='/' className='sideBlock' activeClassName='activeSide'>
                    HOME
                </NavLink>
                <NavLink to='/search' className='sideBlock' activeClassName='activeSide'>
                    SEARCH
                </NavLink>
                <NavLink to='/history' className='sideBlock' activeClassName='activeSide'>
                    HISTORY
                </NavLink>
                <NavLink to='/explore' className='sideBlock' activeClassName='activeSide'>
                    EXPLORE
                </NavLink>
                <NavLink to='/logout' className='sideBlock' activeClassName='activeSide' onclick={logout}>
                    LOGOUT
                </NavLink>
            </div>
        )
    }
    else {
        return (
            <div className='sidePanel'>
                <div className='sideBlock'>
                    <NavLink to='/' className='navlink' activeClassName='activeSide'>
                        HOME
                    </NavLink>
                </div>
                <div style={{height:'2px'}}/>
                <div className='sideBlock'>
                    <NavLink to='/login'  className='navlink' activeClassName='activeSide'>
                        LOGIN
                    </NavLink>
                </div>
            </div>
        )
    }
}


export default sideComponent