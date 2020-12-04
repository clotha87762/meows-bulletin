import * as ActionTypes from './ActionTypes';


const mainReducer = (
    state = {
        openedIndex: null,
        newsReady: false,
        news: []
    },
    action
) => {

    switch (action.type) {
        case ActionTypes.SET_NEWS_INDEX:
            if (state.openedIndex === action.payload) {
                return {...state, openedIndex: null}
            } else {
                return { ...state, openedIndex: action.payload }
            }
        case ActionTypes.SET_NEWS_READY:
            return { ...state, newsReady: action.payload }
        case ActionTypes.SET_NEWS:
            return { ...state, news: action.payload }
        default:
            return state
    }
}


export default mainReducer
