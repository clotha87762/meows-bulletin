import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createStore from './redux/createStore'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './common/DateFormat'
import { BrowserRouter, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();   

const store = createStore()


ReactDOM.render(

  <BrowserRouter >

  <Provider store={store}>
    <React.StrictMode>
      <App myHistory={history}/>
    </React.StrictMode>
  </Provider>

  </BrowserRouter >

  ,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
