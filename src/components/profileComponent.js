import { Component, createElement } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { Container, Col, Row, CardImg, Card, CardBody, CardText, Button, Input } from 'reactstrap'
import { action } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import webAPI from '../webapi'
import './css/profileComponent.css'
import './css/bulletinComponent.css'
import '../common/DateFormat'
import Immutable from 'immutable'


class ProfileComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            profileReady: false,
        }



        //this.renderProfilePost = this.renderProfilePost.bind(this)
        this.renderProfilePosts = this.renderProfilePosts.bind(this)
        this.renderLoading = this.renderLoading.bind(this)

        this.renderProfilePost = this.props.renderPost.bind(this)
    }

    componentDidUpdate() {

    }


    componentWillMount() {

        if (this.props.profile === null || (this.props.profileId !== this.props.profile.user) ) {
            this.setState({ profileReady: false })
            this.props.fetchProfile(this.props.profileId, this)
            this.props.fetchUserPost(this.props.profileId)
        }
        else {
            this.setState({ profileReady: true })
        }
    }

    renderLoading() {
        return (
            <div className='postLoading' style={{marginTop:'10vh'}}>
                <span style={{ marginTop: '10px' }} className="fa fa-spinner fa-pulse fa-2x fa-fw text-warning"></span>
                <b style={{ color: 'white', WebkitTextStroke: '1px black' }}> Posts Now Loading... </b>
            </div>
        )
    }
    /*
    renderProfilePost(post) {

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
                            this.props.profile.user === post.user?
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
    */

    renderProfilePosts() {
        if (this.props.posts.length !== 0) {
            return (
                <div style={{marginTop:'10vh'}}>
                    {
                        this.props.posts.map((item) => {
                            return this.renderProfilePost(item)
                        })
                    }
                    <div className='postInterval' />
                </div>
            )

        }
        else {
            return this.renderLoading()
        }
    }


    render() {

        console.log(this.props.profileId)

        let posts = this.renderProfilePosts()

        if (this.state.profileReady && this.props.profile !== null) {

            return (
                <div className='postContainer' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className='container'>
                        <div className='profileCard'>

                            <div style={{ position: 'relative', height: '100%', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                                <img className='profileCardImg' src={this.props.profile.profileImage} />
                                {
                                    this.props.myId === this.props.profile.user ?
                                        <Button className='editImg ' color='primary'> <i className="fa fa-edit" /> </Button>
                                        :
                                        null
                                }
                            </div>
                            <div className='textBlock'>
                                <div className='profileAlias'>
                                    {this.props.profile.alias}
                                    {
                                        this.props.myId === this.props.profile.user ?
                                            <Button className='editAlias ' color='primary'> <i className="fa fa-edit" /> </Button>
                                            :
                                            null
                                    }
                                </div>
                                <hr />
                                <div className='profileDescription'>
                                    {this.props.profile.intro}
                                    {
                                        this.props.myId === this.props.profile.user ?
                                            <Button className='editDescription ' color='primary'> <i className="fa fa-edit" /> </Button>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div >

                        {posts}

                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='postLoading'>
                    <span style={{ marginTop: '10px' }} className="fa fa-spinner fa-pulse fa-2x fa-fw text-warning"></span>
                    <b style={{ color: 'white', WebkitTextStroke: '1px black' }}> Posts Now Loading... </b>
                </div>
            )
        }
    }
}

export default ProfileComponent