import { Component, createElement } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { Container, Col, Row, CardImg, Card, CardBody, CardText, Button, Input } from 'reactstrap'
import { action } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter, Switch, Route, NavLink, Redirect, useHistory } from 'react-router-dom'
import { set_posts, set_posts_ready, show_create_post, set_search_user, show_search_user } from '../redux/bulletinActions'
import webAPI from '../webapi'
import './css/bulletinComponent.css'
import '../common/DateFormat'
import Immutable from 'immutable'
import ProfileComponent from './profileComponent'


const mapStateToProps = (state) => {
    return {
        posts: state.bulletin.posts.toJS(),
        randomPosts: state.bulletin.randomPosts,
        searchUsers: state.bulletin.searchUsers,
        showCreatePost: state.bulletin.showCreatePost, //好像沒用?
        showSearchUsers: state.bulletin.showSearchUsers,
        postsReady: state.bulletin.postsReady,
        profile: state.app.profile.toJS(),
        otherProfile: state.bulletin.otherProfile,
        otherPosts: state.bulletin.otherPosts.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: () => { webAPI.fetchPosts(dispatch) },
        fetchUserPost: (userAccount) => { webAPI.fetchUserPost(dispatch, userAccount) },
        fetchRandomPost: () => { webAPI.fetchRandomPosts(dispatch) },
        fetchUsers: (userPrefix) => { webAPI.fetchUsers(dispatch, userPrefix) },
        login: () => { webAPI.login(dispatch, '123', '123123') },
        deletePost: (postId) => { webAPI.deletePost(dispatch, postId) },
        editPost: (postId, postContent, postImg) => { webAPI.editPost(dispatch, postId, postContent, postImg) },
        fetchProfile: (profileId, callBack) => { webAPI.fetchProfile(dispatch, profileId, callBack) },
        editProfile: (profile) => { webAPI.editProfile(dispatch, profile) }
    }
}


class BulletinComponent extends Component {

    constructor(props) {
        super(props)

        this.renderPost = this.renderPost.bind(this)
        this.renderPosts = this.renderPosts.bind(this)
        this.renderPostsPage = this.renderPostsPage.bind(this)
        this.renderCreatePost = this.renderCreatePost.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.renderProfile = this.renderProfile.bind(this)

        this.createPostTextareaRef = React.createRef()
        this.uploadImgRef = React.createRef()

        this.nowDate = new Date()

        this.state = {
            ...this.state,
            imgToUploadName: '',
            fetchingProfile: false
        }

        ///////////////////////////////
        // NEEEEEEED to DELETE  ///////
        ///////////////////////////////
        // only for test
        this.props.login()

        console.log('constructor')

    }

    componentDidUpdate() {

    }




    componentWillMount() {

        console.log('will mount')
        this.props.fetchPost()
        this.props.fetchRandomPost()


    }

    renderLoading() {
        return (
            <div className='postLoading'>
                <span style={{ marginTop: '10px' }} className="fa fa-spinner fa-pulse fa-2x fa-fw text-warning"></span>
                <b style={{ color: 'white', WebkitTextStroke: '1px black' }}> Posts Now Loading... </b>
            </div>
        )
    }

    renderPost(post) {

        //console.log(post)
        let postCardRef = React.createRef()


        let deletePost = () => {
            //console.log('delete'+ post._id)
            //postCardRef.current.style.opacity = 0
            postCardRef.current.classList.add('disappearing')
            this.props.deletePost(post._id)
        }

        let editPost = () => {

            let contentEdit = postCardRef.current.querySelector('.contentEdit')
            let submitEdit = postCardRef.current.querySelector('.submitEditBtn')
            let editPost = postCardRef.current.querySelector('.editPostBtn')
            let postCardContent = postCardRef.current.querySelector('.postCardContent')

            contentEdit.classList.remove('invisible')
            postCardContent.classList.add('invisible')

            submitEdit.classList.remove('invisible')
            submitEdit.classList.add('order-1')
            editPost.classList.add('order-0')

            editPost.classList.add('invisible')


            contentEdit.value = post.content
        }

        let submitEdit = () => {

            let contentEdit = postCardRef.current.querySelector('.contentEdit')
            let submitEdit = postCardRef.current.querySelector('.submitEditBtn')
            let editPost = postCardRef.current.querySelector('.editPostBtn')
            let postCardContent = postCardRef.current.querySelector('.postCardContent')


            contentEdit.classList.add('invisible')
            postCardContent.classList.remove('invisible')


            editPost.classList.remove('invisible')
            editPost.classList.remove('order-0')

            submitEdit.classList.remove('order-1')
            submitEdit.classList.add('invisible')

            this.props.editPost(post._id, contentEdit.value, post.image)

        }

        return (
            <div ref={postCardRef} key={post._id} >
                <div className='postInterval' />
                <div className='container postCard'>
                    <div className='row' style={{ marginTop: '10px' }}>
                        <div className='col-1'>
                            <img src='/assets/yoo.png' className='postCardImg' />
                        </div>
                        <div className='col-5 offset-1'>
                            <div className='postCardUser'>
                                <b >{post.alias + '@' + post.user}</b>
                            </div>
                        </div>
                        <div className="col-4 ml-auto">
                            <div className='postCardDate'>
                                {post.date.format("yyyy-MM-dd hh:mm:ss")}
                            </div>
                        </div>
                    </div>
                    <hr className='separateLine' />
                    <div className='row'>
                        <div className='postCardMain col-10 offset-1'>

                            <div className='postCardContent'>

                                {post.content}

                            </div>

                            <textarea className='invisible contentEdit' name='createPost' id='createPost'>

                            </textarea>

                        </div>

                    </div>

                    <div className='row justify-content-end'>
                        {
                            this.props.profile.user === post.user ?
                                <>
                                    <Button onClick={submitEdit} className='invisible submitEditBtn functionBtn' color='primary'> <i className="fa fa-upload" /> </Button>
                                    <Button onClick={editPost} className='editPostBtn functionBtn' color='primary'> <i className="fa fa-edit" /> </Button>
                                    <Button onClick={deletePost} className='order-3 functionBtn' color='primary'> <i className="fa fa-times-circle" /> </Button>
                                </>
                                :
                                null
                        }
                    </div>

                </div >
            </div>
        )
    }

    renderPosts() {

        console.log('posts')
        console.log(this.props.location.pathname)

        if (this.props.postsReady) {

            if (this.props.location.pathname === '/bulletin/explore') {
                return (
                    <div >
                        {
                            this.props.randomPosts.map((item) => {
                                return this.renderPost(item)
                            })
                        }
                        <div className='postInterval' />
                    </div>
                )
            }
            else {
                return (
                    <div >
                        {
                            this.props.posts.map((item) => {
                                return this.renderPost(item)
                            })
                        }
                        <div className='postInterval' />
                    </div>
                )
            }
        }
        else {
            return this.renderLoading()
        }
    }

    renderPostsPage() {
        let posts = this.renderPosts()
        let header = this.renderHeader()

        return (
            <div style={{ maxWidth: '100%' }}>
                {header}
                <div className='postContainer'>
                    {posts}
                </div>
            </div>
        )
    }


    renderCreatePost() {

        let clearText = () => {
            this.createPostTextareaRef.current.value = ''
        }

        let uploadImg = () => {
            console.log(this.uploadImgRef.current.files[0])
            this.setState(
                {
                    ...this.state,
                    imgToUploadName: this.uploadImgRef.current.files[0].name + ' is ready!'
                }
            )
        }

        let submitPost = () => {

        }

        let header = this.renderHeader()

        if (this.props.profile === null) {
            return (
                <div>
                    {header}
                </div>
            )
        }
        return (
            <>
                {header}
                <div className='postContainer' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className='container'>
                        <div className='container postCard'>
                            <div className='row' style={{ marginTop: '10px' }}>
                                <div className='col-1'>
                                    <img src='/assets/yoo.png' className='postCardImg' />
                                </div>
                                <div className='col-7 offset-1'>
                                    <div className='postCardUser'>
                                        <b >{this.props.profile.alias} , &nbsp;Try to post something!</b>
                                    </div>
                                </div>
                                <div className="col-3 ml-auto">
                                    <div className='postCardDate' style={{ textAlign: 'center' }}>
                                        {this.nowDate.toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <hr className='separateLine' />
                            <div className='row'>
                                <div className='col-10 offset-1'>
                                    <textarea ref={this.createPostTextareaRef} className='contentEdit' name='createPost' id='createPost'>
                                    </textarea>
                                </div>
                            </div>
                            <div className='row' >
                                <div className='col-10 offset-1' style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>

                                    <p style={{ margin: 'auto 0' }}> {this.state.imgToUploadName} </p>
                                    <input ref={this.uploadImgRef} type="file" id="uploadImg" accept="image/*" style={{ display: 'none' }} onChange={() => { uploadImg() }} />

                                    <Button onClick={() => { this.uploadImgRef.current.click() }} color='primary' style={{ marginRight: '5px' }}>
                                        +Image
                                    </Button>
                                    <Button onClick={clearText} color='primary' style={{ marginRight: '5px' }}>Clear</Button>
                                    <Button color='success'>Submit</Button>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </>
        )
    }

    renderHeader() {

        let searchUserRef = React.createRef()

        let fetchSearchResult = (prefix) => {

            this.props.fetchUsers(prefix)

        }

        let searchOnFocus = (prefix) => {
            this.props.fetchUsers(prefix)

            let query = this.isMobile? '.searchResultMobile' : '.searchResult'
            let searchResultDiv = searchUserRef.current.querySelector(query)
            searchResultDiv.classList.remove('invisible')

        }

        let searchOnBlur = () => {
            let query = this.isMobile? '.searchResultMobile' : '.searchResult'
            let searchResultDiv = searchUserRef.current.querySelector(query)

            setTimeout(() => { searchResultDiv.classList.add('invisible') }, 100)
            //searchResultDiv.classList.add('invisible')
        }

        let linkToProfile = (profile) => {
            console.log('link')
            console.log(profile.user)

            this.props.history.replace((`${this.props.match.path}/profile/` + profile.user))
            //this.props.history.go()

        }

        if (this.isMobile) {
            return (
                <div className='bulletinHeaderMobile'>
                    <div ref={searchUserRef} className='searchUserMobile'>

                        <div className='searchResultMobile invisible'>
                            {
                                this.props.searchUsers.map(
                                    (item) => {
                                        return (
                                            <div onClick={() => { linkToProfile(item) }} key={item.user} className='searchEntry'>
                                                <span><img src={item.image} className='searchUserImg' /></span>
                                                { item.alias + '@' + item.user}
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>

                        <input onBlur={searchOnBlur} onFocus={(e) => { searchOnFocus(e.target.value) }} onChange={(e) => { fetchSearchResult(e.target.value) }} className='searchBarMobile' type='text' placeholder='search other user by account'>
                        </input>

                    </div>
                </div>
            )
        }
        else {

            return (
                <div className='bulletinHeader' style={{ display: 'flex' }}>

                    <span style={{ flexBasis: '1vw' }} />

                    <img className='userImg' src={this.props.profile ? this.props.profile.profileImage : "/assets/yoo.png"} />
                    <span /> <b style={{ overflowX: 'hidden', minWidth: '5vw', maxWidth: '10vw', textAlign: 'center' }}>{this.props.profile ? this.props.profile.alias : "Guest"} </b><span />
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <NavLink style={{ color: 'black' }} to={`${this.props.match.path}/create`}><button className='newPostButton btn' ><span className="fa fa-plus-square fa-fw" /><span className='textself'>  &nbsp;New Post&nbsp;  </span></button></NavLink>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <NavLink style={{ color: 'black' }} to={`${this.props.match.path}/`}>
                        <button className='randomPostButton btn'><span className="fa fa-stack-overflow fa-fw" /> <span className='textself'>&nbsp;My Bulletin&nbsp; </span> </button>
                    </NavLink>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <NavLink style={{ color: 'black' }} to={`${this.props.match.path}/explore`}>
                        <button className='randomPostButton btn'><span className="fa fa-globe fa-fw" /><span className='textself'> &nbsp;Explore&nbsp; </span></button>
                    </NavLink>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <div ref={searchUserRef} className='searchUser'>

                        <div className='searchResult invisible'>
                            {
                                this.props.searchUsers.map(
                                    (item) => {
                                        return (
                                            <div onClick={() => { linkToProfile(item) }} key={item.user} className='searchEntry'>
                                                <span><img src={item.image} className='searchUserImg' /></span>
                                                { item.alias + '@' + item.user}
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>

                        <input onBlur={searchOnBlur} onFocus={(e) => { searchOnFocus(e.target.value) }} onChange={(e) => { fetchSearchResult(e.target.value) }} className='searchBar' type='text' placeholder='search other user by account'>
                        </input>

                    </div>

                </div>
            )
        }
    }

    renderProfile({ match }) {

        let header = this.renderHeader()
        console.log('params')
        console.log(match.params)

        let userId = match.params.profileId

        if (userId === undefined && this.props.profile !== null) {
            userId = this.props.profile.user
        }

        return (
            <>
                {header}
                {  (userId === undefined || this.props.profile === null) ?
                    <div />
                    :
                    <ProfileComponent editProfile={this.props.editProfile} renderPost={this.renderPost}
                        myId={this.props.profile.user} posts={this.props.otherPosts}
                        profileId={userId} fetchProfile={this.props.fetchProfile}
                        profile={userId === this.props.profile.user ? this.props.profile : this.props.otherProfile}
                        fetchUserPost={this.props.fetchUserPost} />
                }
            </>
        )

    }

    render() {

        this.isMobile = window.screen.width < window.screen.height

        console.log('renderrr')
        return (
            <div>
                <Route exact path={`${this.props.match.path}/`} component={this.renderPostsPage} />
                <Route exact path={`${this.props.match.path}/explore`} component={this.renderPostsPage} />
                <Route exact path={`${this.props.match.path}/create`} component={this.renderCreatePost} />
                <Route exact path={`${this.props.match.path}/profile`} component={this.renderProfile} />
                <Route path={`${this.props.match.path}/profile/:profileId`} component={this.renderProfile} />
            </div>
        )
    }
}

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(BulletinComponent))