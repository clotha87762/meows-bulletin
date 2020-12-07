import {createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Main from './mainReducers'
import Login from './loginReducers'
import Bulletin from './bulletinReducers'
import App from './appReducers';


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            app: App,
            main : Main ,
            login : Login,
            bulletin:  Bulletin
        })
        , applyMiddleware(thunk, logger)
    );

    return store;
}

export default  ConfigureStore