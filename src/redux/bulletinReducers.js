import * as ActionTypes from './ActionTypes';


const bulletinReducer = (
    state = {
        posts: [],
        searchUsers: [],
        showCreatePost: false,
        showSearchUsers: false,
        postsReady : false,
        followErrorMsg: null
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
        case ActionTypes.SET_RANDOM_POSTS:
            return{ ...state, randomPosts: action.payload}

        case ActionTypes.SHOW_CREATE_POST:
            return {...state, showCreatePost: action.payload}
        case ActionTypes.SHOW_SEARCH_USER:
            return {...state, showSearchUsers: action.payload}
        case ActionTypes.SET_FOLLOW_ERROR_MSG:
            return {...state, followErrorMsg: action.payload }
        case ActionTypes.DELETE_POST:{

            //console.log('before delete')
           

            let allPosts = Object.assign( [] , state.posts)
            //console.log(allPosts)

            let post = allPosts.filter(
                (item)=>{
                    if(item._id === action.payload){
                        return true
                    }
                    return false
                }
            )

            post.forEach(
                (item)=>{
                    allPosts.splice( allPosts.indexOf(item) , 1 )
                }
            )

            //console.log('after delete')
            //console.log(allPosts)

            return {...state , posts: allPosts}
        }
        case ActionTypes.EDIT_POST:{

            let allPosts = state.posts
            let post = allPosts.filter(
                (item)=>{
                    if(item._id === action.payload){
                        return true
                    }
                    return false
                }
            )
            post.forEach(
                (item)=>{
                    item.content = action.payload.content
                    item.image = action.payload.image
                }
            )
            return {...state, posts: allPosts}
        }
        default:
            return state
    }

}


export default bulletinReducer