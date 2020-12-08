import { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { Container, Col, Row, CardImg, Card, CardBody, CardText, Button } from 'reactstrap'
import { action } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { set_posts, set_posts_ready, show_create_post, set_search_user, show_search_user } from '../redux/bulletinActions'
import webAPI from '../webapi'
import './css/bulletinComponent.css'
import '../common/DateFormat'


const mapStateToProps = (state) => {
    return {
        posts: state.bulletin.posts,
        searchUsers: state.bulletin.searchUsers,
        showCreatePost: state.bulletin.showCreatePost, //其實我也不知道這要幹嘛哈哈哈
        showSearchUsers: state.bulletin.showSearchUsers,
        postsReady: state.bulletin.postsReady,
        profile: state.app.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: () => { webAPI.fetchPosts(dispatch) },
        fetchUserPost: (userAccount) => { webAPI.fetchUserPost(dispatch, userAccount) },
        fetchRandomPost: () => { webAPI.fetchRandomPosts() },
        fetchUsers: (userPrefix) => { webAPI.fetchUsers() },
    }
}

class BulletinComponent extends Component {

    constructor(props) {
        super(props)

        this.renderPost = this.renderPost.bind(this)
        this.renderPosts = this.renderPosts.bind(this)

    }

    componentDidUpdate() {

    }

    componentDidMount() {
        this.props.fetchPost()
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
        console.log(post)
        return (
            <div key={post._id}>
                <div className='postInterval' />
                <div className='container postCard'>
                    <div className='row' style={{ marginTop: '10px' }}>
                        <div className='col-1'>
                            <img src='./assets/yoo.png' className='postCardImg' />
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
                        <div className='col-10 offset-1'>

                            <div className='postCardContent'>
                                <p>
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-end'>
                        <Button className='functionBtn' color='primary'> <i className="fa fa-edit" /> </Button>
                        <Button className='functionBtn' color='primary'> <i className="fa fa-times-circle" /> </Button>
                    </div>
                </div >
            </div>
        )
    }

    renderPosts() {
        console.log('posts')
        console.log(this.props.posts)
        console.log(this.props.postsReady)
        if (this.props.postsReady) {
            return (
                <div >
                    {
                        this.props.posts.map((item) => {
                            return this.renderPost(item)
                        })
                    }
                </div>
            )
        }
        else {
            return this.renderLoading()
        }
    }

    render() {

        let posts = this.renderPosts()
        return (
            <div style={{ maxWidth: '100%' }}>
                <div className='bulletinHeader' style={{ display: 'flex' }}>

                    <span style={{ flexBasis: '1vw' }} />

                    <img className='userImg' src={this.props.profile ? this.props.profile.image : "./assets/yoo.png"} />
                    <span /> <b style={{ minWidth: '5vw', maxWidth: '10vw', tectAlign: 'center' }}>{this.props.profile ? this.props.profile.alias : "Guest"} </b><span />
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>
                    
                    <button className='newPostButton btn'><span className="fa fa-plus-square" /><span className='textself'>&nbsp;New Post&nbsp;</span></button>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>
                    
                    <button className='backToMyBulletinButton btn'><span className="fa fa-comments" /> <span className='textself'>&nbsp;My Bulletin&nbsp;</span> </button>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>
                    
                    <button className='randomPostButton btn'><span className="fa fa-globe" /><span className='textself'>&nbsp;Explore&nbsp;</span></button>
                    <span > <b style={{ fontSize: '5vh' }}>|</b> </span>
                    <input className='searchBar' type='text' placeholder='search other user by account'></input>

                </div>

                <div className='postContainer'>
                    {posts}
                </div>
            </div>
        )
    }

}

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(BulletinComponent))