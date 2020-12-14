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
            let allOtherPosts = state.otherPosts

            let filterAndDelete = (target) =>{
                let post = target.filter(
                    (item)=>{
                        if(item.get('_id') === action.payload){
                            return true
                        }
                        return false
                    }
                )
                post.forEach(
                    (item)=>{
                        console.log(item)
                        target = target.delete( target.indexOf(item))
                    }
                )
                return target
            }

            allPosts = filterAndDelete(allPosts)
            allOtherPosts = filterAndDelete(allOtherPosts)

            //console.log('after delete')
            //console.log(allOtherPosts)

            return {...state , posts: allPosts , otherPosts : allOtherPosts}
        }
        case ActionTypes.EDIT_POST:{

            let allPosts = state.posts
            let allOtherPosts = state.otherPosts
            console.log('edit!')
            console.log(action.payload)

            let filterAndEdit = (target) =>{

                let post = target.filter(
                    (item)=>{
                        console.log(item.get('_id'))
                        if(item.get('_id') === action.payload.id){
                            return true
                        }
                        return false
                    }
                )

                post.forEach(
                
                    (item)=>{
    
                        let targetPost = target.get( target.indexOf(item) ) 

                        console.log('edit post')
                        console.log(targetPost)
                        
                        let toMerge = {
                            content: action.payload.content,
                            image: action.payload.image
                        }

                        targetPost = targetPost.merge( Immutable.Map(toMerge) )
    
                        target = target.set( target.indexOf(item) , targetPost) 
                    }
                )

                return target
            }

            allPosts = filterAndEdit(allPosts)
            allOtherPosts = filterAndEdit(allOtherPosts)
            //setTimeout( ()=>{console.log(allPosts.get(0) )} , 1000)
            //return {...state , posts: allPosts}
            return {...state , posts: allPosts , otherPosts: allOtherPosts}
        }
        default:
            return state
    }

}


export default bulletinReducer