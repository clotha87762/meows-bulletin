import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom'
import SideComponent from './components/sideComponent'
import MainComponent from './components/mainComponent'
import { connect } from 'react-redux'
import webAPI from './webapi'
import { BrowserRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap'


function App({ isAuthed, dispatch }) {

  return (

    <BrowserRouter>

      <div className="App" style={{ position:'relative' , backgroundImage: `url('./assets/bg.jpg')` }} >
        <div style={{ minHeight: '100vh' }}>

            
              <SideComponent isAuthed={isAuthed} logout={() => webAPI.logout(dispatch)} />
            <Col sm={{ size: 10, offset: 0 }}>
              {
                !isAuthed ?
                  <Switch >
                    <Route path='/' component={MainComponent} />
                    <Route path='/login' component={MainComponent} />
                  </Switch>
                  :
                  <Switch >
                    <Route path='/' component={MainComponent} />
                    <Route path='/bulletin' component={MainComponent} />
                    <Route path='/explore' component={MainComponent} />
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