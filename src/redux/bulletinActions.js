import { DELETE_POST, EDIT_POST, SET_FOLLOW_ERROR_MSG, SET_POSTS, SET_POSTS_READY, SHOW_CREATE_POST , SET_SEARCH_USER , SHOW_SEARCH_USER, SET_RANDOM_POSTS } from './ActionTypes'
import {createActions} from 'redux-actions'


export const edit_post = (post) =>(
    {
        type: EDIT_POST,
        payload: post
    }
)

export const delete_post = (postId) =>(
    {
        type: DELETE_POST,
        payload: postId
    }
)


export const set_follow_error_msg = (error) => (
    {
        type: SET_FOLLOW_ERROR_MSG,
        payload: error
    }
)


export const set_posts = (posts) => (
    {
        type: SET_POSTS,
        payload: posts
    }
)

export const set_random_posts = (rPosts) =>(
    {
        type: SET_RANDOM_POSTS,
        payload: rPosts
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
