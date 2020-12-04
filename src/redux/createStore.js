import {createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Main from './mainReducers'
import Login from './loginReducers'


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            main : Main ,
            login : Login
        })
        , applyMiddleware(thunk, logger)
    );

    return store;
}

export default  ConfigureStore