import {SET_LOGIN , SET_PROFILE} from './ActionTypes'


export const set_login = (login) => (
    {
        type: SET_LOGIN,
        payload: login
    }
)

export const set_profile = (profile) =>(
    {
        type: SET_PROFILE,
        payload: profile
    }
)