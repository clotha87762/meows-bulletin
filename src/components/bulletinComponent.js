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
        profile: Object.keys(state.app.profile.toJS()).length === 0 ?
            null : state.app.profile.toJS(),
        otherProfile: Object.keys(state.bulletin.otherProfile.toJS()).length === 0 ?
            null : state.bulletin.otherProfile.toJS(),
        otherPosts: state.bulletin.otherPosts.toJS(),
        userList: state.bulletin.userList.toJS(),
        postImages: state.app.postImages.toJS(),
        profileImages: state.app.profileImages.toJS(),
    }
}

const mapDispatchToProps = (dispatch) => {

    const fetchUserPost = (userAccount) => { webAPI.fetchUserPost(dispatch, userAccount) }

    return {
        fetchPost: () => { webAPI.fetchPosts(dispatch) },
        fetchUserPost: fetchUserPost,
        fetchRandomPost: () => { webAPI.fetchRandomPosts(dispatch) },
        fetchUsers: (userPrefix) => { webAPI.fetchUsers(dispatch, userPrefix) },
        login: () => { webAPI.login(dispatch, '123', '123123') },
        // this is because we are logining with session cookie 

        deletePost: (postId) => { webAPI.deletePost(dispatch, postId) },
        editPost: (postId, postContent, postImg) => { webAPI.editPost(dispatch, postId, postContent, postImg) },
        //fetchProfile: (profileId, callBack) => { webAPI.fetchProfile(dispatch, profileId, callBack) },
        setProfile: (profile, profileAccount, callBack, userList) => { webAPI.setProfile(dispatch, profile, profileAccount, callBack, userList) },
        editProfile: (profile, account, modifySelf) => { webAPI.editProfile(dispatch, profile, account, modifySelf, fetchUserPost) },
        followUser: (account) => { webAPI.followUser(dispatch, account) },
        unfollowUser: (account) => { webAPI.unfollowUser(dispatch, account) },
        createPost: (postContent, postImg, history, path) => {

            let goBackToBulletin = () => {
                history.push(path)
            }

            webAPI.createPost(dispatch, postContent, postImg, goBackToBulletin)

        },
        getPostImage: (imageId, postId) => { webAPI.getPostImage(dispatch, imageId, postId) },
        getProfileImage: (userId) => { webAPI.getProfileImage(dispatch, userId) },
        editProfileImage: (profileImg) =>{webAPI.editProfileImage(dispatch,profileImg)},

    }
}


class BulletinComponent extends Component {

    constructor(props) {
        super(props)

        this.renderProfileImage = this.renderProfileImage.bind(this)

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
            fetchingProfile: false,
            fetchedPrefix: ''
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


    }

    renderProfileImage(userId) {

        let profileImage = '/assets/profileImage/default.png'
        let filtered = this.props.profileImages.filter(
            item => {
                return item.name === userId
            }
        )

        if (filtered.length == 0) {
            this.props.getProfileImage(userId)
        }

        if (filtered.length > 0) {
            filtered = filtered[0]
            let temp = Buffer.from(filtered.img.data).toString('base64')
            profileImage = 'data:image/png;base64,' + temp
        }

        return profileImage
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

        //console.log('render post')
        //console.log(post)
        let postCardRef = React.createRef()
        let postImage = []
        let displayPostImage = null

        let postProfileImage = this.renderProfileImage(post.user._id)

        if (post.image) {
            postImage = this.props.postImages.filter(
                item => {
                    //console.log('filter post image')
                    return item.name === post._id
                }
            )
        }

        if (post.image && postImage.length == 0) {
            //console.log('get image!')
            this.props.getPostImage(post.image, post._id)
        }
        else if (post.image && postImage.length > 0) {
            //postImage = postImage.toJS()
            //srcString = 'data:image/jpeg;base64,' + postImage.img.data.toString('base64')
            postImage = postImage[0]
            let temp = Buffer.from(postImage.img.data).toString('base64')
            displayPostImage = 'data:image/png;base64,' + temp
        }


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

            this.props.editPost(post._id, contentEdit.value, post.attachImage)

        }

        return (
            <div ref={postCardRef} key={post._id} >
                <div className='postInterval' />
                <div className='container postCard'>
                    <div className='row' style={{ marginTop: '10px' }}>
                        <div className='col-1'>
                            <img src={postProfileImage} className='postCardImg' />
                        </div>
                        <div className='col-5 offset-1'>
                            <div className='postCardUser'>
                                <b >{post.user.alias + '@' + post.user.account}</b>
                            </div>
                        </div>
                        <div className="col-4 ml-auto">
                            <div className='postCardDate'>
                                {new Date(post.modifyDate).format("yyyy-MM-dd hh:mm:ss")}
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



                    <div className='postImageArea'>
                        {
                            displayPostImage ?
                                <img style={{ height: '100%', width: 'auto' }}
                                    src={displayPostImage} />
                                :
                                null
                        }
                    </div>

                    <div className='row justify-content-end'>
                        {
                            this.props.profile.account === post.user.account ?
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
                            this.props.randomPosts.filter(item => { return item !== null }).map((item) => {
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
                            this.props.posts.filter(item => { return item !== null }).map((item) => {
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

            let content = this.createPostTextareaRef.current.value
            let image = null

            if (!content) {
                console.log('content cannot be null')
                return
            }

            console.log('submit post')
            if (this.uploadImgRef.current.files.length > 0) {
                console.log(this.uploadImgRef.current.files[0])
                image = this.uploadImgRef.current.files[0]
            }

            this.props.createPost(content, image, this.props.history, this.props.match.path)

        }

        let header = this.renderHeader()

        if (this.props.profile === null) {
            return (
                <div>
                    {}
                </div>
            )
        }
        return (
            <>
                {}
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
                                    <Button onClick={submitPost} color='success'>Submit</Button>
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

        let headerProfileImage = this.props.profile ? this.renderProfileImage(this.props.profile._id) :
            '/assets/profileImage/default.png'

        let fetchSearchResult = (prefix) => {

            if (this.state.fetchedPrefix !== prefix) {
                this.props.fetchUsers(prefix)
            }

            this.setState({ fetchedPrefix: prefix })

        }

        let searchOnFocus = (prefix) => {

            if (this.state.fetchedPrefix !== prefix) {
                this.props.fetchUsers(prefix)
            }



            this.setState({ fetchedPrefix: prefix })

            let query = this.isMobile ? '.searchResultMobile' : '.searchResult'
            let searchResultDiv = searchUserRef.current.querySelector(query)
            searchResultDiv.classList.remove('invisible')

        }

        let searchOnBlur = () => {
            let query = this.isMobile ? '.searchResultMobile' : '.searchResult'
            let searchResultDiv = searchUserRef.current.querySelector(query)

            setTimeout(() => { searchResultDiv.classList.add('invisible') }, 100)
            //searchResultDiv.classList.add('invisible')
        }

        let linkToProfile = (profile) => {
            console.log('link')
            console.log(profile.account)
            console.log(this.props.myHistory)
            //browserHistory.push('/profile/' + profile.account)
            this.props.history.push((`${this.props.match.path}/profile/` + profile.account))
            //this.setState(this.state)

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
                                        let searchEntryProfileImage = this.renderProfileImage(item._id)
                                        return (
                                            <div onClick={() => { linkToProfile(item) }} key={item.account} className='searchEntry'>
                                                <span>
                                                    <img
                                                        src={
                                                            searchEntryProfileImage
                                                        }
                                                        className='searchUserImg' />
                                                </span>
                                                { item.alias + '@' + item.account}
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

                    <img className='userImg' src={headerProfileImage} />

                    <span /> <b style={{ overflowX: 'hidden', minWidth: '5vw', maxWidth: '10vw', textAlign: 'center' }}>{this.props.profile ? this.props.profile.alias : "Guest"} </b><span />
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <NavLink style={{ color: 'black' }} to={`${this.props.match.path}/create`}><button className='newPostButton btn' ><span className="fa fa-plus-square fa-fw" /><span className='textself'>  &nbsp;New Post&nbsp;  </span></button></NavLink>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <NavLink style={{ color: 'black' }} to={`${this.props.match.path}/`}>
                        <button onClick={() => { this.props.fetchPost() }} className='randomPostButton btn'><span className="fa fa-stack-overflow fa-fw" /> <span className='textself'>&nbsp;My Bulletin&nbsp; </span> </button>
                    </NavLink>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <NavLink style={{ color: 'black' }} to={`${this.props.match.path}/explore`}>
                        <button onClick={() => { this.props.fetchRandomPost() }} className='randomPostButton btn'><span className="fa fa-globe fa-fw" /><span className='textself'> &nbsp;Explore&nbsp; </span></button>
                    </NavLink>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>

                    <div ref={searchUserRef} className='searchUser'>

                        <div className='searchResult invisible'>
                            {
                                this.props.searchUsers.map(
                                    (item) => {
                                        let searchEntryProfileImage = this.renderProfileImage(item._id)
                                        return (
                                            <div onClick={() => { linkToProfile(item) }} key={item.account} className='searchEntry'>
                                                <span><img src={
                                                   searchEntryProfileImage
                                                }
                                                    className='searchUserImg' /></span>
                                                { item.alias + '@' + item.account}
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

        let userAccount = match.params.profileId

        if (userAccount === undefined && this.props.profile !== null) {
            userAccount = this.props.profile.account
        }

        console.log(userAccount)

        /*
        let profile
        if(userAccount === this.props.profile.account){
            profile = this.props.profile
        }
        else{
            if(this.props.otherProfile !== null && userAccount === this.props.otherProfile.account){
                profile = this.props.otherProfile
            }
            else{

            }
        }
        */

        return (
            <>
                {}
                {  (userAccount === undefined || this.props.profile === null) ?
                    <div />
                    :
                    <ProfileComponent editProfile={this.props.editProfile} renderPost={this.renderPost}
                        myAccount={this.props.profile.account} posts={this.props.otherPosts}
                        profileAccount={userAccount}
                        profile={userAccount === this.props.profile.account ? this.props.profile : this.props.otherProfile}
                        myProfile={this.props.profile}
                        fetchUserPost={this.props.fetchUserPost}
                        setProfile={this.props.setProfile}
                        userList={this.props.userList}
                        followUser={this.props.followUser}
                        unfollowUser={this.props.unfollowUser}
                        postImages={this.props.postImages}
                        profileImages={this.props.profileImages}
                        renderProfileImage={this.renderProfileImage}
                        getPostImage={this.props.getPostImage}
                        getProfileImage={this.props.getPostImage}
                        editProfileImage={this.props.editProfileImage}
                    />
                }
            </>
        )

    }

    render() {

        this.isMobile = window.screen.width < window.screen.height

        console.log('renderrr')
        let header = this.renderHeader()

        //console.log(this.props.match.url)
        return (
            <div>
                {header}
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