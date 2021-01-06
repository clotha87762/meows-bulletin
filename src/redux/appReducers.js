import * as ActionTypes from './ActionTypes';
import Immutable from 'immutable'

const appReducer = (
    state = {
        profile: Immutable.Map(),
        isLogined: false,
        profileImages: Immutable.List(),
        postImages: Immutable.List(),
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.SET_PROFILE_IMAGES:

            let profileImages = state.profileImages

            var targetIndex = -1

            let profileImage = profileImages.filter(
                (item, index) => {
                    
                    if (item.get('name') === action.payload.name) {
                        targetIndex = index
                        return true
                    }
                    else {
                        return false
                    }
                }
            )

            if (targetIndex >= 0) {
                console.log('modify old profile image')
                profileImages = profileImages.set(targetIndex, Immutable.fromJS(action.payload))
            }
            else {
                profileImages = profileImages.push(Immutable.fromJS(action.payload))
            }

            console.log('set profile images')
            console.log(profileImages)

            return { ...state, profileImages: profileImages }

        case ActionTypes.SET_POST_IMAGES:

            let postImages = state.postImages

            var targetIndex = -1

            let postImage = postImages.filter(
                (item, index) => {
                    if (item.get('name') === action.payload.name) {
                        targetIndex = index
                        return true
                    }
                    else {
                        return false
                    }
                }
            )

            if (targetIndex >= 0) {
                postImages = postImages.set(targetIndex, Immutable.fromJS(action.payload))
            }
            else {
                postImages = postImages.push(Immutable.fromJS(action.payload))
            }

            console.log('set post images')
            console.log(postImages)

            return { ...state, postImages: postImages }

        case ActionTypes.EDIT_PROFILE:
            let toMerge = {}
            let profile = state.profile


            if (action.payload.hasOwnProperty('profileImage'))
                toMerge.profileImage = action.payload.profileImage
            if (action.payload.hasOwnProperty('alias'))
                toMerge.alias = action.payload.alias
            if (action.payload.hasOwnProperty('intro'))
                toMerge.intro = action.payload.intro
            if (action.payload.hasOwnProperty('followees'))
                toMerge.followees = action.payload.followees

            console.log('edit profile')
            console.log(toMerge)

            profile = profile.merge(Immutable.Map(toMerge))

            console.log(profile.toJS())

            return { ...state, profile: profile }


        case ActionTypes.SET_LOGIN:
            return { ...state, isLogined: action.payload, onLogin: false }
        case ActionTypes.SET_PROFILE:
            return { ...state, profile: action.payload }
        default:
            return state
    }
}


export default appReducer