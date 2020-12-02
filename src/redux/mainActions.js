import {SET_NEWS_INDEX , SET_NEWS_READY , SET_NEWS} from './mainActions'
import {createActions} from 'redux-actions'


export const set_news_index = createActions(SET_NEWS_INDEX , index => index ) // integer
export const set_news_ready = createActions(SET_NEWS_READY , trueFalse => trueFalse ) // boolean
export const set_news = createActions( SET_NEWS , news => news) // array of object