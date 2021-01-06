import { SET_POST_IMAGES, SET_PROFILE_IMAGES, EDIT_PROFILE, SET_LOGIN , SET_PROFILE} from './ActionTypes'


export const set_post_images = (image) => (
    {
        type: SET_POST_IMAGES,
        payload: image
    }
)

export const set_profile_images = (image) => (
    {
        type: SET_PROFILE_IMAGES,
        payload: image
    }
)

export const edit_profile = (profile) => (
    {
        type: EDIT_PROFILE,
        payload: profile
    }
)


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