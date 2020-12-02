import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, IndexRouter } from 'react-router'



function App({ isAuthed }) {

  return (

    <div className="App" style={{width: '100%' , height: '100%'}}>
      <SidePanel isAuthed={isAuthed} style={{display:'inline-block'}}/>
      {
        !isAuthed ?
          <Switch style={{display:'inline-block'}}>
            <IndexRouter component={mainComponent} />
            <Route path='/' component={mainComponent} />
            <Route path='/login' component={mainComponent} />
          </Switch>
          :
          <Switch style={{display:'inline-block'}}>
            <IndexRouter component={mainComponent} />
            <Route path='/' component={mainComponent} />
            <Route path='/bulletin' component={mainComponent} />
            <Route path='/explore' component={mainComponent} />
          </Switch>
      }
    </div>

  );

}


export default connect(
  (state) => {
    isAuthed : state.isAuthed
  },
)
(App);