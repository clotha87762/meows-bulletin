import * as ActionTypes from './ActionTypes';
import Immutable from 'immutable'

const bulletinReducer = (
    state = {
        posts: Immutable.List(),
        searchUsers: Immutable.List(),
        showCreatePost: false,
        showSearchUsers: false,
        postsReady : false,
        followErrorMsg: null,
        otherProfile: null,
        otherPosts: Immutable.List()
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.SET_OTHER_POSTS:
            return {...state , otherPosts: action.payload}
        case ActionTypes.SET_OTHER_PROFILE:
            return {...state, otherProfile: action.payload}
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

            let allPosts = state.posts
            //console.log(allPosts)

            let post = allPosts.filter(
                (item)=>{
                    if(item.get('_id') === action.payload){
                        return true
                    }
                    return false
                }
            )

            post.forEach(
                (item)=>{
                    allPosts = allPosts.delete( allPosts.indexOf(item))
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
                    if(item.get('_id') === action.payload.id){
                        return true
                    }
                    return false
                }
            )

            post.forEach(
                
                (item)=>{

                    let targetPost = allPosts.get( allPosts.indexOf(item) ) 

                    console.log(targetPost)
                    
                    let toMerge = {
                        content: action.payload.content,
                        image: action.payload.image
                    }
                    targetPost = targetPost.merge( Immutable.Map(toMerge) )

                    allPosts = allPosts.set(allPosts.indexOf(item) , targetPost) 
                }
            )

            //setTimeout( ()=>{console.log(allPosts.get(0) )} , 1000)
            //return {...state , posts: allPosts}
            return {...state , posts: allPosts}
        }
        default:
            return state
    }

}


export default bulletinReducer