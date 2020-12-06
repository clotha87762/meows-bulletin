import { SET_POSTS, SET_POSTS_READY, SHOW_CREATE_POST , SET_SEARCH_USER , SHOW_SEARCH_USER } from './ActionTypes'
import {createActions} from 'redux-actions'




export const set_posts = (posts) => (
    {
        type: FETCH_POSTS,
        payload: posts
    }
)
export const set_posts_ready =(ready) =>(
    {
        type: SET_POSTS_READY,
        payload: ready
    }
 )// boolean

export const show_create_post = (show) => (
    {
        type: SHOW_CREATE_POST,
        payload: show
    }
)

export const set_search_user = (users) => (
    {
        type: SET_SEARCH_USER,
        payload: users
    }
)

export const show_search_user = (show) => (
    {
        type: SHOW_SEARCH_USER,
        payload: show
    }
)