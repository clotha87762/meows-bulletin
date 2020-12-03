import {SET_NEWS_INDEX , SET_NEWS_READY , SET_NEWS} from './ActionTypes'
import {createActions} from 'redux-actions'


export const set_news_index = (index) => (
    {
        type: SET_NEWS_INDEX,
        payload: index
    }
)
export const set_news_ready =(ready) =>(
    {
        type: SET_NEWS_READY,
        payload: ready
    }
 )// boolean
export const set_news = (news) =>(
    {
        type: SET_NEWS,
        payload: news
    }
) // array of object