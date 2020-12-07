// @ts-check 
import { SET_SIGN_UP_FORM , SET_LOGIN_ERROR_MSG , ON_LOGIN , ON_SIGN_UP , SET_SIGN_UP_ERROR_MSG} from './ActionTypes'
import {createActions} from 'redux-actions'


export const set_sign_up_form = (show) => (
    {
        type: SET_SIGN_UP_FORM,
        payload: show
    }
)
export const set_login_error_msg = (error) =>(
    {
        type: SET_LOGIN_ERROR_MSG,
        payload: error
    }
 )

 export const set_sign_up_error_msg = (error) =>(
    {
        type: SET_SIGN_UP_ERROR_MSG,
        payload: error
    }
 )

 export const on_login = () =>(
     {
        type: ON_LOGIN,
     }
 )

 export const on_sign_up = () =>(
    {
       type: ON_SIGN_UP,
    }
)

 