import * as ActionTypes from './ActionTypes';


const bulletinReducer = (
    state = {
        posts: [],
        searchUsers: [],
        showCreatePost: false,
        showSearchUsers: false,
        postsReady : false
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.SET_POSTS_READY:
            return {...state, postsReady: action.payload}
        case ActionTypes.SET_SEARCH_USER:
            return {...state, searchUsers: action.payload}
        case ActionTypes.SET_POSTS:
            return {...state, posts: action.payload}
        case ActionTypes.SHOW_CREATE_POST:
            return {...state, showCreatePost: action.payload}
        case ActionTypes.SHOW_SEARCH_USER:
            return {...state, showSearchUsers: action.payload}
        default:
            return state
    }

}


export default bulletinReducer