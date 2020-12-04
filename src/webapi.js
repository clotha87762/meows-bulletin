import axios from 'axios'
import {browserHistory} from 'react-router'
import Immutable from 'immutable'
import {set_news_ready , set_news} from './redux/mainActions'
import { on_login , on_sign_up , set_login_error_msg, set_sign_up_error_msg } from './redux/loginAction'


export default{

    checkAuth: (dispatch,token) => {

    },

    getCookie: keyName => {
        let cookies = document.cookie.split(';');
        let targetCookie = cookies.filter(cookie => {
            return cookie.split(':')[0].trim() === keyName;
        });

        if (targetCookie.length > 1) {
            return targetCookie[0];
        }

        return '';
    },
    
    getNews: (dispatch) => {
        let news = [
            {
                date: new Date(),
                title: 'im so horny',
                content: 'fuck me hard'
            },
            {
                date: new Date(),
                title: 'Yoooooooo',
                content: 'front end sucksddddddddddddddddddddddddd\n ssssssssssssss\n eeeeeeeeeee'
            },
            {
                date: new Date(),
                title: '$$$$$$$',
                content: 'what the fuckkkk'
            }
        ]
        
        dispatch( set_news_ready(false))
        setTimeout( ()=> { dispatch( set_news(news))}  , 3000 )
        setTimeout( ()=> { dispatch( set_news_ready(true))} , 3100 )
    },

    login: (dispatch, account, password) => {
        dispatch(on_login())
        setTimeout( ()=> {dispatch( set_login_error_msg('fuck login'))} , 3000 )
    },
    logout: dispatch => {},

    signup: (dispatch, account ,password) =>{
        dispatch(on_sign_up())
        setTimeout( ()=> {dispatch( set_sign_up_error_msg('fuck signup'))} , 3000 )

    }

}