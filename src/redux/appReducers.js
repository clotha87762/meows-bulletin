import * as ActionTypes from './ActionTypes';


const appReducer = (
    state = {
        profile: null,
        isLogined: false
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.SET_LOGIN:
            return {...state, isLogined : action.payload , onLogin:false}
        case ActionTypes.SET_PROFILE:
            return {...state, profile: action.payload}
        default:
            return state
    }
}


export default appReducer