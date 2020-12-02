import axios from 'axios'
import {browserHistory} from 'react-router'
import Immutable from 'immutable'
import {set_news_ready , set_news} from './redux/mainActions'

export default{


    checkAuth: (dispatch,token) => {

    },

    getCookie: keyName => {
        cookies = document.cookie.split(';');
        targetCookie = cookies.filter(cookie => {
            return cookie.split(':')[0].trim() == keyName;
        });

        if (targetCookie.length > 1) {
            return targetCookie[0];
        }

        return '';
    },
    
    getNews: (dispatch) => {

        news = [
            {
                title: 'im so horny',
                content: 'fuck me hard'
            },
            {
                title: 'Yoooooooo',
                content: 'front end sucks'
            },
            {
                title: '$$$$$$$',
                content: 'what the fuckkkk'
            }
        ]
        dispatch( set_news_ready(false))
        setTimeout( set_news(news) , 2000 )
        setTimeout( set_news_ready(true) , 2100 )
    },

    login: (dispatch, account, password) => {},
    logout: dispatch => {},
    retrieveHistorys: () => {},
    retrievOtherHistory: () => {}

}