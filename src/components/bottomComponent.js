import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './css/bottomComponent.css'





const NavPanel = ({ setPopout, isPopped, isAuthed , userAlias , logout}) => {

    let isPoppedOut = isPopped? ' poppedOut' : ''

    console.log(isPoppedOut)

    if (isAuthed) {
        return(
        <div className={'popoutPanel' + isPoppedOut}>
            <div style={{ fontSize: '18px' }}>
                    <b>
                        {"HELLLLO " + userAlias}
                    </b>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-home" /> &nbsp;HOME
                    </NavLink>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/bulletin' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-comments" /> &nbsp;BULLETIN
                </NavLink>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/bulletin/profile' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-id-badge" /> &nbsp;PROFILE
                </NavLink>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/logout' className='navlink' activeClassName='activeSide' onClick={logout}>
                        <span className="fa fa-user-alt-slash" /> &nbsp;LOGOUT
                </NavLink>
                </div>
        </div>
        )
    }
    else {
        return (
            <div className={'popoutPanel' + isPoppedOut}>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-home" /> &nbsp;HOME
                    </NavLink>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/login' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa fa-user-circle" /> &nbsp;LOGIN
                    </NavLink>
                </div>
            </div>
        )
    }
}

const FunctionPanel = ({ setPopout, isPopped }) => {

    let isPoppedOut = isPopped? ' poppedOut' : ''

    return(
        <div className={'popoutPanel' + isPoppedOut}>
            
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/bulletin/create' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-home" /> &nbsp;New Post
                    </NavLink>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/bulletin' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-comments" /> &nbsp;My Bulletin
                </NavLink>
                </div>
                <div className='popoutBlock'>
                    <NavLink onClick={()=>{setPopout(false)}} to='/bulletin/explore' className='navlink' activeClassName='activeSide'>
                        <span className="fa fa-id-badge" /> &nbsp;Explore
                </NavLink>
                </div>
                
        </div>
    )
}



const BottomComponent = ({ profile , isAuthed, userAlias, logout }) => {

    const [ popoutNav , setPopoutNav ] = React.useState(false)
    const [ popoutFunc , setPopoutFunc ] = React.useState(false)


    if (isAuthed) {
        return (
            <div className='bottomPanel'>
                
                <div className='bottomBlock' onClick={()=>{
                        setPopoutFunc(!popoutFunc)
                        setPopoutNav(false)
                    }}>
                    <i className='fa fa-2x fa-bars'></i>
                </div>

                    {
                        profile===null?
                        null
                        :
                        <div className='bottomUserBlock'>
                            <img className='bottomProfileImage' src={profile.profileImage}/>
                            <h6>{profile.alias}</h6>
                        </div>
                    }

                <div className='bottomBlock' onClick={()=>{
                        setPopoutNav(!popoutNav)
                        setPopoutFunc(false)
                    }}>
                    <i className='fa fa-2x fa-compass'></i>
                </div>
                
                <FunctionPanel setPopout={setPopoutFunc} isPopped={popoutFunc} />
                <NavPanel setPopout={setPopoutNav} isPopped={popoutNav} isAuthed={isAuthed} userAlias={userAlias} logout={logout}/>
            </div>
        )
    }
    else {

        return (
            <div className='bottomPanel'>
                <div className='bottomBlock' onClick={()=>{
                        setPopoutNav(!popoutNav)
                    }}>
                    <i className='fa fa-2x fa-compass'></i>
                </div>
                <NavPanel setPopout={setPopoutNav} isPopped={popoutNav} isAuthed={isAuthed} userAlias={userAlias} logout={logout}/>
            </div>
        )
    }
}


export default BottomComponent