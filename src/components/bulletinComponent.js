import { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { Container, Col, Row, CardImg, Card, CardBody, CardText, Button } from 'reactstrap'
import { action } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import {set_posts , set_posts_ready, show_create_post, set_search_user, show_search_user} from '../redux/bulletinActions'
import webAPI from '../webapi'
import './css/bulletinComponent.css'


const mapStateToProps = (state) => {
    return {
        posts: state.bulletin.posts,
        searchUsers: state.bulletin.searchUsers,
        showCreatePost: state.bulletin.showCreatePost,
        showSearchUsers: state.bulletin.showSearchUsers,
        postsReady : state.bulletin.postsReady
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchPost: ()=>{ webAPI.fetchPosts(dispatch)},
        fetchUserPost: (userAccount)=>{ webAPI.fetchUserPost(dispatch, userAccount)},
        fetchRandomPost: ()=>{ webAPI.fetchRandomPosts() },
        fetchUsers: (userPrefix)=>{ webAPI.fetchUsers()},
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
        
    }

    renderPost(){

    }

    renderPosts(){

        return(
            {

            }
        )

    }
    
    render() {
        return(
            <div className='container'>

                <div className='bulletinHeader'>

                </div>
                
                <div className='postBackground'>
                    {renderPosts}
                </div>

            </div>
        )
    }

}

export default withRouter( connect(
    mapStateToProps, mapDispatchToProps
)(BulletinComponent))