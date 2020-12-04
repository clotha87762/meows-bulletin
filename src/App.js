import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, } from 'react-router-dom'
import SideComponent from './components/sideComponent'
import MainComponent from './components/mainComponent'
import LoginComponent from './components/loginComponent'
import { connect } from 'react-redux'
import webAPI from './webapi'
import { BrowserRouter, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap'


function App({ isAuthed, dispatch }) {


  isAuthed = false

  return (

    <BrowserRouter>

      <div className="App" style={{ position: 'relative', backgroundImage: `url('./assets/bg.jpg')` }} >
        <div style={{ minHeight: '100vh' }}>


          <SideComponent isAuthed={isAuthed} logout={() => webAPI.logout(dispatch)} />
          <Col sm={{ size: 10, offset: 0 }}>
            {
              isAuthed ?
                <Switch>
                  <Route path='/' component={MainComponent} />
                  <Route path='/bulletin' component={MainComponent} />
                  <Route path='/explore' component={MainComponent} />
                  <Route path='/profile' component={MainComponent} />
                </Switch>
                :
                <Switch>
                  <Route exact path='/' component={MainComponent} />
                  <Route path='/login' component={LoginComponent} />
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
    isAuthed: state.isAuthed
  },
    (dispatch) => ({
      dispatch: dispatch
    })
  ),
)
  (App);