import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import SideComponent from './components/sideComponent'
import MainComponent from './components/mainComponent'
import LoginComponent from './components/loginComponent'
import BulletinComponent from './components/bulletinComponent'
import { connect } from 'react-redux'
import webAPI from './webapi'
import { BrowserRouter, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap'


function App( { isAuthed , profile , logout } ) {

  isAuthed = true

  return (

    <BrowserRouter>

      <div className="App" style={{ position: 'relative', backgroundImage: `url('/assets/bg.jpg')` }} >
        <div style={{ minHeight: '100vh' }}>
          
          <SideComponent isAuthed={isAuthed}  userAlias={profile? profile.alias : null}  logout={logout} />
          
          <Col xs={{ size: 10, offset: 0 }}>
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
        </div>
      </div>
    </BrowserRouter>

  );

}


export default connect(
  (state) => ({
    isAuthed: state.app.isLogined,
    profile: state.app.profile
  }),
  (dispatch) => (
    {
      logout: () => { webAPI.logout(dispatch) }
    }
  )
)
  (App);