import axios from 'axios'
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
import { set_news_ready, set_news } from './redux/mainActions'
import { on_login, on_sign_up, set_login_error_msg, set_sign_up_error_msg, set_sign_up_form } from './redux/loginAction'
import {  set_user_list , set_other_posts, set_other_profile, delete_post, edit_post, set_random_posts, set_posts, set_search_user, set_posts_ready, show_create_post, show_search_user } from './redux/bulletinActions'
import { edit_profile, set_login, set_profile } from './redux/appActions'
import { createBrowserHistory } from 'history'
import Cookies from 'universal-cookie';

var cookies = new Cookies()

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

        dispatch(set_news_ready(false))

        axios(
            {
                method: 'get',
                baseURL: 'http://localhost:3000',
                url: '/news',
                "Content-Type": "application/json"
            }
        )
            .then(
                (result) => {

                    if (result.status === 200) {
                        console.log('news fetched!')
                        console.log(result)
                        setTimeout(() => {
                            dispatch(set_news(result.data))
                            dispatch(set_news_ready(true))
                        }, 1000)
                    }
                    else {
                        throw result
                    }

                }
            )
            .catch(
                err => {
                    console.log('fetch news error:')
                    console.log(err)
                }
            )

        /*
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
        */

        //setTimeout(() => { dispatch(set_news(news)) }, 3000)
        //setTimeout(() => { dispatch(set_news_ready(true)) }, 3100)
    },

    fetchPosts: (dispatch) => {

        let Map = Immutable.Map
        let mockPosts = Immutable.fromJS([
            {
                _id: '666',
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-10'),
                content: 'wowwwwwww\n im so boring \n fuck react',
                image: null
            },
            {
                _id: "444",
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-12'),
                content: 'ddddddddddddddddddddddddddddddd\ndddddddd\n\n\n\ndddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: '333',
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
            },
            {
                _id: "12355",
                user: "cccgggg",
                alias: "Cat",
                date: new Date('2020-11-11'),
                content: 'cccccccccccccccccc\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "12366",
                user: "cccgggg",
                alias: "Cat",
                date: new Date('2020-12-11'),
                content: 'qqqqqqqqqqqqqqqqqwwww\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "ddddd",
                user: "dddggg",
                alias: "Dog",
                date: new Date('2020-12-11'),
                content: 'doggggggggggg\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "dddd22d",
                user: "dddggg",
                alias: "Dog",
                date: new Date('2020-12-11'),
                content: 'asfdsgfreherreg\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "1233366",
                user: "eeegggg",
                alias: "Eat",
                date: new Date('2020-12-11'),
                content: 'qqqqqqqqqqqqqqqqqwwww\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "12361236",
                user: "eeegggg",
                alias: "Eat",
                date: new Date('2020-12-11'),
                content: 'EEEEEEEEEEEEEEEEEEEEEEE\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            }
        ])


        dispatch(set_posts_ready(false))

        axios(
            {
                method: 'get',
                baseURL: 'http://localhost:3000',
                url: '/posts',
                withCredentials: true,
            }
        )
            .then(
                (result) => {
                    if (result.status === 200) {

                        let posts = result.data
                        console.log('get posts!')
                        console.log(posts)

                        setTimeout(() => {

                            dispatch(set_posts(Immutable.fromJS(posts)))
                            dispatch(set_posts_ready(true))

                        }, 1500)

                    }
                }
            )
            .catch(
                err => {
                    let response = err.response
                    console.log(response.data.showError)
                }
            )

        //setTimeout(() => { dispatch(set_posts(posts)) }, 2000)
        //setTimeout(() => { dispatch(set_posts_ready(true)) }, 2100)
    },

    fetchUserPost: (dispatch, userId) => {
        let mockPosts = Immutable.fromJS([
            {
                _id: '666',
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-10'),
                content: 'wowwwwwww\n im so boring \n fuck react',
                image: null
            },
            {
                _id: "444",
                user: "aaaa123",
                alias: "Alan",
                date: new Date('2020-10-12'),
                content: 'ddddddddddddddddddddddddddddddd\ndddddddd\n\n\n\ndddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: '333',
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
            },
            {
                _id: "12355",
                user: "cccgggg",
                alias: "Cat",
                date: new Date('2020-11-11'),
                content: 'cccccccccccccccccc\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "12366",
                user: "cccgggg",
                alias: "Cat",
                date: new Date('2020-12-11'),
                content: 'qqqqqqqqqqqqqqqqqwwww\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "ddddd",
                user: "dddggg",
                alias: "Dog",
                date: new Date('2020-12-11'),
                content: 'doggggggggggg\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "dddd22d",
                user: "dddggg",
                alias: "Dog",
                date: new Date('2020-12-11'),
                content: 'asfdsgfreherreg\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "1233366",
                user: "eeegggg",
                alias: "Eat",
                date: new Date('2020-12-11'),
                content: 'qqqqqqqqqqqqqqqqqwwww\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            },
            {
                _id: "12361236",
                user: "eeegggg",
                alias: "Eat",
                date: new Date('2020-12-11'),
                content: 'EEEEEEEEEEEEEEEEEEEEEEE\ndddddddddddddddddddd\naaaaaaaaasss',
                image: null
            }
        ])

        /*
        let mockUserPosts = mockPosts.filter(
            (item) => {
                return item.get('user') === userAccount
            }
        )
        */

        // clear the other posts to activate loading component
        set_other_posts(Immutable.fromJS(Immutable.List()))

        axios(
            {
                method: 'get',
                baseURL: 'http://localhost:3000',
                url: '/posts/user/' + userId,
                withCredentials: true,
            }
        )
            .then(
                (result) => {
                    if (result.status === 200) {

                        let userPosts = result.data
                        console.log('get user posts!')
                        console.log(userPosts)

                        setTimeout(() => {
                            dispatch(set_other_posts(Immutable.fromJS(userPosts)))
                            //dispatch(set_posts(Immutable.fromJS(posts)))
                            //dispatch(set_posts_ready(true))

                        }, 1500)

                    }
                }
            )
            .catch(
                err => {
                    let response = err.response
                    console.log(response.data.showError)
                }
            )

        //dispatch(set_posts_ready(false))
        //setTimeout(() => { dispatch(set_other_posts(userPosts)) }, 1000)
    },

    fetchRandomPosts: (dispatch) => {



        let posts = Immutable.List([
            {
                user: "aaaa123",
                alias: "dlan",
                date: new Date('2020-10-10'),
                content: 'wowwwwwww\n im so boring \n fuck react',
                image: null
            },
            {
                user: "aaaa123",
                alias: "blan",
                date: new Date('2020-10-12'),
                content: 'ddddddddddddddddddddddddd\ndddddddd\n\n\n\ndddddddddddd\naaaaaaaaasss',
                image: null
            }]
        )

        dispatch(set_posts_ready(false))
        setTimeout(() => { dispatch(set_random_posts(posts)) }, 2000)
        setTimeout(() => { dispatch(set_posts_ready(true)) }, 2100)
    },

    fetchNewPosts: (dispatch) => {
        //
        //  fetch new posts in a every x seconds interval
        //
    },

    fetchUsers: (dispatch, userPrefix, userList = Immutable.List(), fetchNewList = true) => {

        let mockUsers = Immutable.fromJS([
            {
                user: "aaaa123",
                alias: "Alan",
                image: '/assets/yoo.png'
            },
            {
                user: "aaaa456",
                alias: "AAlan",
                image: '/assets/yoo.png'
            },
            {
                user: "AAAAAA456",
                alias: "Allan",
                image: '/assets/yoo.png'
            },
            {
                user: "aaa456aaaa",
                alias: "AlanAAA",
                image: '/assets/yoo.png'
            },
            {
                user: "aa123aaaa",
                alias: "AAAlan",
                image: '/assets/yoo.png'
            },
            {
                user: "bbbb456",
                alias: "Bob",
                image: '/assets/yoo.png'
            },
            {
                user: "bbbb12333",
                alias: "BBob",
                image: '/assets/yoo.png'
            },
            {
                user: "bb123123bb",
                alias: "Bobbb",
                image: '/assets/yoo.png'
            },
            {
                user: "bb3333bb",
                alias: "Booooob",
                image: '/assets/yoo.png'
            },
            {
                user: "bbbb45bbbbbb",
                alias: "BBBoBb",
                image: '/assets/yoo.png'
            },

        ]
        )
        let mockUserJS = users.toJS()

        let users

        if (fetchNewList) {
            axios(
                {
                    method: 'get',
                    baseURL: 'http://localhost:3000',
                    url: '/users',
                    withCredentials: true,
                }
            )
                .then(
                    (result) => {
                        if (result.status === 200) {

                            users = result.data
                            console.log('get user posts!')
                            console.log(users)

                            setTimeout(() => {
                                dispatch(show_search_user(false))
                                dispatch( set_user_list(Immutable.fromJS(users) ))
                                setTimeout(() => { dispatch(show_search_user(true)) }, 1100)
                                setTimeout(() => { dispatch(set_search_user(users)) }, 1000)

                            }, 1000)

                        }
                        else {
                            throw result
                        }
                    }
                )
                .catch(
                    err => {
                        let response = err.response
                        console.log(response.data.showError)
                    }
                )
        }
        else {
            users = userList.toJS()
            users = users.filter(
                (item) => {
                    return item.alias.toLowerCase().startsWith(userPrefix.toLowerCase())
                }
            )
            console.log('users')
            console.log(users)

            if (userPrefix.trim().replace(/[^A-Za-z']/g, "") === '') {
                users = []
            }

            dispatch(show_search_user(false))
            setTimeout(() => { dispatch(show_search_user(true)) }, 1100)
            setTimeout(() => { dispatch(set_search_user(users)) }, 1000)
        }

    },

    followUser: (dispatch, followee) => { // false if user not exist or already folloed

    },

    unfollowUser: (dispatch, followee) => {

    },

    editPost: (dispatch, postId, postContent, postImg) => {
        let payload = {
            id: postId,
            content: postContent,
            image: postImg
        }
        dispatch(edit_post(payload))
    },

    deletePost: (dispatch, postId) => {

        setTimeout(() => { dispatch(delete_post(postId)) }, 1200)

    },

    editProfile: (dispatch, edit) => {
        let toMerge = {}
        if (edit.hasOwnProperty('alias'))
            toMerge.alias = edit.alias
        if (edit.hasOwnProperty('profileImage'))
            toMerge.profileImage = edit.profileImage
        if (edit.hasOwnProperty('intro'))
            toMerge.intro = edit.intro

        dispatch(edit_profile(toMerge))
    },

    fetchProfile: (dispatch, profileId, callBack) => {
        let otherProfiles = [
            {
                user: "aaaa123",
                alias: "Alann",
                profileImage: '/assets/yoo.png',
                intro: "1231231231231231\n123123123123\n123123123123"
            },
            {
                user: "bbbb456",
                alias: "Bob",
                profileImage: '/assets/yoo.png',
                intro: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\nbbbbbbbbbbbbbbbb\nbbbbbbbbbbbb'
            },
            {
                user: "cccc025",
                alias: "CCAT",
                profileImage: '/assets/yoo.png',
                intro: 'ccccccccccccccccccccccccccc\nccccccccccccccccccccccccc\ncccccccccc'
            },
            {
                user: "dddd033",
                alias: "DOGGGEE",
                profileImage: '/assets/yoo.png',
                intro: 'ddddddddddddddddddddddd\ndddddddddddddddddddddddddddd\ndddddddddddddddd'
            },
            {
                user: "EEEEE",
                alias: "Elephant",
                profileImage: '/assets/yoo.png',
                intro: 'eeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeee'
            },
        ]

        let profile = otherProfiles.filter(
            (item) => {
                return item.user === profileId
            }
        )
        console.assert(profile.length === 1, { profile: profile })

        setTimeout(() => { dispatch(set_other_profile(profile[0])) }, 1000)
        setTimeout(() => { callBack.setState({ profileReady: true }) }, 1000)
    },

    login: (dispatch, account, password) => {

        /*
        let profile = Immutable.fromJS({
            user: "aaaa123",
            alias: "Alann",
            profileImage: '/assets/yoo.png',
            intro: "1231231231231231\n123123123123\n123123123123",
            followees : [ 'bbbb12333' , 'bb123123bb' ],
        })
        */

        dispatch(on_login())
        console.log('login api')
        console.log(account)
        console.log(password)

        axios(
            {
                method: 'post',
                baseURL: 'http://localhost:3000',
                url: '/manage/login',
                auth: {
                    username: account,
                    password: password
                },
                withCredentials: true
            }
        )
            .then(
                (result) => {

                    if (result.status === 200) {

                        console.log('result')
                        console.log(result)
                        console.log('cookie')
                        console.log(document.cookie)

                        let profile = result.data
                        profile.user = profile.account
                        profile.profileImage = '/assets/yoo.png'
                        delete profile.account

                        setTimeout(
                            () => {
                                console.log(profile)
                                dispatch(set_profile(Immutable.fromJS(profile)))

                                dispatch(set_login_error_msg(''))
                                dispatch(set_login(true))

                                //cookies.set('session-id', this.state.loginAccount , { path: '/' })
                            },
                            1000
                        )
                    }
                    else {
                        throw result
                    }
                }
            )
            .catch(
                (err) => {
                    let response = err.response
                    console.log(err.response)
                    console.log(JSON.stringify(err))
                    dispatch(set_login_error_msg(response.data.showError))
                }
            )

        //dispatch(set_profile(profile))
        //dispatch(on_login())
        //setTimeout(() => { dispatch(set_login_error_msg('fuck login')) }, 3000)
        //dispatch(set_profile(profile))
        //setTimeout(() => { dispatch(set_login(true)) }, 2000)
    },

    loginWithSession: (dispatch) => {

        console.log('login with session')

        axios(
            {
                method: 'post',
                baseURL: 'http://localhost:3000',
                url: '/manage/login',
                withCredentials: true
            }
        )
            .then(
                (result) => {

                    if (result.status === 200) {

                        let profile = result.data
                        profile.user = profile.account
                        profile.profileImage = '/assets/yoo.png'
                        delete profile.account

                        console.log(profile)
                        dispatch(set_profile(Immutable.fromJS(profile)))
                        dispatch(set_login(true))

                    }
                    else {
                        throw result
                    }
                }
            )
            .catch(
                (err) => {
                    let response = err.response
                    console.log(err.response)
                    console.log(JSON.stringify(err))
                    //dispatch(set_login_error_msg(response.data.showError))
                }
            )

    },

    logout: (dispatch) => {

        console.log('log out')
        axios(
            {
                method: 'get',
                baseURL: 'http://localhost:3000',
                url: '/manage/logout',
                withCredentials: true,
            }
        )
            .then(
                (result) => {
                    if (result.status === 200) {
                        dispatch(set_profile(null))
                        dispatch(set_login(false))
                    }

                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )

        //dispatch(set_profile(null))
        //dispatch(set_login(false))
        //createBrowserHistory().push('/')    
    },

    signup: (dispatch, account, password) => {
        dispatch(on_sign_up())
        axios(
            {
                method: 'post',
                baseURL: 'http://localhost:3000',
                url: '/users',
                data: {
                    user: {
                        account: account,
                        password: password,
                    }
                },
                withCredentials: true,
                "Content-Type": 'application/json'
            }
        )
            .then(
                (result) => {
                    dispatch(set_sign_up_form(false))
                    dispatch(set_login_error_msg('Sign up successfully!!'))
                    dispatch(set_sign_up_error_msg(''))
                }
            )
            .catch(
                err => {
                    console.log('error')
                    console.log(err)
                    let response = err.response
                    dispatch(set_sign_up_error_msg(response.data.showError))
                }
            )
        //setTimeout(() => { dispatch(set_sign_up_error_msg('fuck signup')) }, 3000)

    }

}