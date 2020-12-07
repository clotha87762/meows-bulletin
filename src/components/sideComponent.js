import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './css/sideComponent.css'


const sideComponent = ({ isAuthed, userAlias, logout }) => {

    if (isAuthed) {
        return (
            <div className='sidePanel'>
                <div style={{ fontSize: '18px' }}>
                    <b>
                        {"HELLLLO " + userAlias}
                    </b>
                </div>
                <div className='sideBlock'>
                    <NavLink to='/' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-home" /> &nbsp;HOME
                    </NavLink>
                </div>
                <div className='sideBlock'>
                    <NavLink to='/bulletin' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-comments" /> &nbsp;BULLETIN
                </NavLink>
                </div>
                <div className='sideBlock'>
                    <NavLink to='/profile' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-id-badge" /> &nbsp;PROFILE
                </NavLink>
                </div>
                <div className='sideBlock'>
                    <NavLink to='/logout' className='navlink' activeClassName='activeSide' onClick={logout}>
                        <span className="fa fa-user-alt-slash" /> &nbsp;LOGOUT
                </NavLink>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='sidePanel'>
                <div className='sideBlock'>
                    <NavLink to='/' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-home" /> &nbsp;HOME
                    </NavLink>
                </div>
                <div style={{ height: '2px' }} />
                <div className='sideBlock'>
                    <NavLink to='/login' className='navlink' activeClassName='activeSide'>
                    <span className="fa fa-user-circle" /> &nbsp;LOGIN
                    </NavLink>
                </div>
            </div>
        )
    }
}


export default sideComponent