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

    renderPost() {

    }

    renderPosts() {
        return (
            {

            }
        )
    }

    render() {
        return (
            <div style={{maxWidth:'100%'}}>
                <div className='bulletinHeader' style={{ display: 'flex' }}>
                    
                    <span style={{flexBasis:'1vw'}}/>
                    
                    <img className='userImg' src={this.props.profile? this.props.profile.image : "./assets/yoo.png"}/>
                    <span /> <b style={{ minWidth:'5vw' , maxWidth: '10vw', tectAlign:'center' }}>{this.props.profile? this.props.profile.alias : "Guest"} </b><span/>
                    
                    <button className='backToMyBulletinButton btn'><span className="fa fa-comments" /> <span className='textself'>&nbsp;My Bulletin&nbsp;</span> </button>
                    <button className='randomPostButton btn'><span className="fa fa-globe" /><span className='textself'>&nbsp;Explore&nbsp;</span></button>
                    <input className='searchBar' type='text' placeholder='search other user by account'></input>
                    
                </div>

                <div className='container'>
                    <div className='postBackground'>
                        { }
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(BulletinComponent))