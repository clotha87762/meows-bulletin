import axios from 'axios'
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
import { set_news_ready, set_news } from './redux/mainActions'
import {  on_login, on_sign_up, set_login_error_msg, set_sign_up_error_msg } from './redux/loginAction'
import { set_posts , set_search_user , set_posts_ready , show_create_post , show_search_user} from './redux/bulletinActions'
import {set_login, set_profile} from './redux/appActions'
import { createBrowserHistory } from 'history'



export default {

    checkAuth: (dispatch, token) => {
        
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

        dispatch(set_news_ready(false))
        setTimeout(() => { dispatch(set_news(news)) }, 3000)
        setTimeout(() => { dispatch(set_news_ready(true)) }, 3100)
    },

    fetchPosts: (dispatch) => {

        let posts = [
            {
                _id:'666',
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-10'),
                content: 'wowwwwwww\n im so boring \n fuck react',
                image: null
            },
            {
                _id:"444",
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-12'),
                content: 'ddddddddddddddddddddddddddddddd\ndddddddd\n\n\n\ndddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id:'333',
                user: "bbbb456",
                alias: "Bob",
                date: new Date('2020-10-13'),
                content: 'gggggggggggggggggg\n ddddddddddd\n\nddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "123",
                user: "bbbb456",
                alias: "Bob",
                date: new Date('2020-10-11'),
                content: 'kkkkkkkkkkkkkkk\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            }
        ]

        dispatch( set_posts_ready(false) )
        setTimeout( () =>{ dispatch( set_posts(posts))} , 2000)
        setTimeout( () =>{ dispatch( set_posts_ready(true))} , 2100)
    },

    fetchUserPost: (dispatch, userAccount) => {
        let posts = [
            {
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-10'),
                content: 'wowwwwwww\n im so boring \n fuck react',
                image: null
            },
            {
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-12'),
                content: 'ddddddddddddddddddddddddd\ndddddddd\n\n\n\ndddddddddddd\naaaaaaaaasss',
                image: null
            }]
            dispatch( set_posts_ready(false) )
            setTimeout( () =>{ dispatch( set_posts(posts))} , 2000)
            setTimeout( () =>{ dispatch( set_posts_ready(true))} , 2100)
    },

    fetchRandomPosts: (dispatch) => {
        let posts = [
            {
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-10'),
                content: 'wowwwwwww\n im so boring \n fuck react',
                image: null
            },
            {
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-12'),
                content: 'ddddddddddddddddddddddddd\ndddddddd\n\n\n\ndddddddddddd\naaaaaaaaasss',
                image: null
            }]

            dispatch( set_posts_ready(false) )
            setTimeout( () =>{ dispatch( set_posts(posts))} , 2000)
            setTimeout( () =>{ dispatch( set_posts_ready(true))} , 2100)
    },

    fetchUsers: (dispatch, userPrefix) => {
        let users = [
            {
                user: "aaaa123",
                alias: "Alan",
                image: null
            },
            {
                user: "bbbb456",
                alias: "Bob",
                image: null
            },
        ]

        dispatch( show_search_user(false) )
        setTimeout( ()=>{dispatch(show_search_user(true))} , 2100)
        setTimeout( ()=>{dispatch(set_search_user(users)) } , 2000)

    },

    followUser: (dispatch, followee) => { // false if user not exist or already folloed
        
    },



    login: (dispatch, account, password) => {

        let profile = {
            user: "aaaa123",
            alias: "Alan",
            profileImage: null
        }


        dispatch(on_login())
        //setTimeout(() => { dispatch(set_login_error_msg('fuck login')) }, 3000)
        setTimeout( ()=>{dispatch(set_profile(profile) ) }  , 1900)
        setTimeout(() => { dispatch(set_login(true) ) }, 2000)

    },

    logout: (dispatch) => {

        console.log('log out')
        dispatch( set_profile(null) )
        dispatch( set_login(false) )
        //createBrowserHistory().push('/')    
    },

    signup: (dispatch, account, password) => {
        dispatch(on_sign_up())
        setTimeout(() => { dispatch(set_sign_up_error_msg('fuck signup')) }, 3000)

    }

}