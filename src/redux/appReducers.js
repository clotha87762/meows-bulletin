import * as ActionTypes from './ActionTypes';
import Immutable from 'immutable'

const appReducer = (
    state = {
        profile: Immutable.Map(),
        isLogined: false
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.EDIT_PROFILE:
            let toMerge = {}
            let profile = state.profile


            if (action.payload.hasOwnProperty('profileImage'))
                toMerge.profileImage = action.payload.profileImage
            if (action.payload.hasOwnProperty('alias'))
                toMerge.alias = action.payload.alias
            if (action.payload.hasOwnProperty('intro'))
                toMerge.intro = action.payload.intro

            console.log('edit profile')
            console.log(toMerge)
            
            profile = profile.merge(Immutable.Map(toMerge))

            console.log(profile.toJS())

            return { ...state , profile: profile}


        case ActionTypes.SET_LOGIN:
            return { ...state, isLogined: action.payload, onLogin: false }
        case ActionTypes.SET_PROFILE:
            return { ...state, profile: action.payload }
        default:
            return state
    }
}


export default appReducer