import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import SideComponent from './components/sideComponent'
import MainComponent from './components/mainComponent'
import LoginComponent from './components/loginComponent'
import BottomComponent from './components/bottomComponent'
import BulletinComponent from './components/bulletinComponent'
import { connect } from 'react-redux'
import webAPI from './webapi'
import { BrowserRouter, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap'
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

/*
const cookies = new Cookies()

if(cookies.get('session-id') !== undefined){
  this.props.loginWithSession()
}
*/

function App( { isAuthed , profile , logout , loginWithSession} ) {

  //isAuthed = true
  let isMobile = window.screen.width < window.screen.height

  let colStyle = isMobile? {size:12, offset:0} : {size:10, offset:0}

  let cookies = new Cookies()

  useEffect( ()=>{
   
      console.log('session login triggered')
      loginWithSession()
    
  },[])


  
  return (

    <BrowserRouter >

      <div className="App" style={{ position: 'relative', backgroundImage: `url('/assets/bg.jpg')` }} >
        <div style={{ minHeight: '100vh' }}>
          
          { 
            !isMobile?
            <SideComponent isAuthed={isAuthed}  userAlias={profile? profile.alias : null}  logout={logout} />
            :
            null
          }
          <Col xs={colStyle} style={{padding:'0px 0px'}}>
            {
              isAuthed?
                <Switch>
                  <Route exact path='/' component={MainComponent} />
                  <Route path='/bulletin' component={BulletinComponent} />
                  <Route path='/explore' component={MainComponent} />
                  <Route path='/profile' component={MainComponent} />
                  <Redirect to='/'/>
                </Switch>
                :
                <Switch>
                  <Route exact path='/' component={MainComponent} />
                  <Route path='/login' component={LoginComponent} />
                  <Redirect to='/'/>
                </Switch>
            }
          </Col>
          {
            isMobile?
            <BottomComponent profile={profile} isAuthed={isAuthed}  userAlias={profile? profile.alias : null}  logout={logout} />
            :
            null
          }
        </div>
      </div>
    </BrowserRouter>

  );

}


export default connect(
  (state) => ({
    isAuthed: state.app.isLogined,
    profile: state.app.profile===null? null : state.app.profile.toJS()
  }),
  (dispatch) => (
    {
      logout: () => { webAPI.logout(dispatch) } ,
      loginWithSession: ()=>{ webAPI.loginWithSession(dispatch)} ,
    }
  )
)
  (App);