import * as ActionTypes from './ActionTypes';


const loginReducer = (
    state = {
        signUpForm: false,
        loginErrorMsg: null,
        signupErrorMsg: null,
        onLogin: false,
        onSignup: false,
        
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.ON_LOGIN:
            return {...state , loginErrorMsg: null , onLogin: true }
        case ActionTypes.ON_SIGN_UP:
            return {...state, signupErrorMsg: null , onSignup: true}

        case ActionTypes.SET_SIGN_UP_FORM:
            return {...state , signUpForm : action.payload , signupErrorMsg: null}
        case ActionTypes.SET_LOGIN_ERROR_MSG:
            return {...state , loginErrorMsg: action.payload , onLogin:false }
        case ActionTypes.SET_SIGN_UP_ERROR_MSG:
            return {...state , signupErrorMsg: action.payload , onSignup: false}
        default:
            return state
    }
}


export default loginReducer