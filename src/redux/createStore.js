import {createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Main from './mainReducers'


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            main : Main
        })
        , applyMiddleware(thunk, logger)
    );

    return store;
}

export default  ConfigureStore