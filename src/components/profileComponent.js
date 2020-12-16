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
            editingAlias: false,
            editingIntro: false,
            editingImage: false
        }

        //this.renderProfilePost = this.renderProfilePost.bind(this)
        this.renderProfilePosts = this.renderProfilePosts.bind(this)
        this.renderLoading = this.renderLoading.bind(this)

        this.profileCardRef = React.createRef()
        this.uploadProfileImageRef = React.createRef()

        this.renderProfilePost = this.props.renderPost.bind(this)
    }

    componentDidUpdate() {

    }


    componentWillMount() {

        if (this.props.profile === null || (this.props.profileId !== this.props.profile.user)) {
            this.setState({ profileReady: false })
            this.props.fetchProfile(this.props.profileId, this)
        }
        else {
            this.setState({ profileReady: true })
        }
        this.props.fetchUserPost(this.props.profileId)
    }

    renderLoading() {
        return (
            <div className='postLoading' style={{ marginTop: '10vh' }}>
                <span style={{ marginTop: '10px' }} className="fa fa-spinner fa-pulse fa-2x fa-fw text-warning"></span>
                <b style={{ color: 'white', WebkitTextStroke: '1px black' }}> Posts Now Loading... </b>
            </div>
        )
    }


    renderProfilePosts() {
        if (this.props.posts.length !== 0) {
            return (
                <div style={{ marginTop: '10vh' }}>
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

        console.log('profile render!')
        console.log(this.props.profile)
        console.log(this.state)

        let posts = this.renderProfilePosts()

        let editAlias = () => {

            let aliasTextarea = this.profileCardRef.current.querySelector('.aliasTextarea')
            aliasTextarea.value = this.props.profile.alias
            aliasTextarea.classList.remove('invisible')
            aliasTextarea.focus()

            this.setState({ editingAlias: true })

        }

        let editIntro = () => {
            let introTextarea = this.profileCardRef.current.querySelector('.introTextarea')
            introTextarea.value = this.props.profile.intro
            introTextarea.classList.remove('invisible')
            introTextarea.focus()

            this.setState({ editingIntro: true })
        }

        let editProfileImage = () => {
            this.uploadProfileImageRef.current.click()
        }

        let uploadProfileImage = () => {
            console.log(this.uploadProfileImageRef.current.files[0])
            this.props.editProfile({ profileImage: '/assets/' + this.uploadProfileImageRef.current.files[0].name })
        }

        let onEditAliasBlur = () => {

            console.log('on alias blur')

            this.setState({
                editingAlias: false,
            })
            let aliasTextarea = this.profileCardRef.current.querySelector('.aliasTextarea')
            aliasTextarea.classList.add('invisible')

            if (aliasTextarea.value !== this.props.profile.alias) {
                //////////////////////************************* */
                // remember to re-fetch posts, in order to refresh name & image on posts card
                /////////////////////************************** */
                this.props.editProfile({ alias: aliasTextarea.value })
            }

        }

        let onEditIntroBlur = () => {
            console.log('on intro blur')

            this.setState({
                editingIntro: false,
            })

            let introTextarea = this.profileCardRef.current.querySelector('.introTextarea')
            introTextarea.classList.add('invisible')

            if (introTextarea.value !== this.props.profile.intro) {
                //////////////////////************************* */
                // remember to re-fetch posts, in order to refresh name & image on posts card
                /////////////////////************************** */
                this.props.editProfile({ intro: introTextarea.value })
            }
        }


        if (this.state.profileReady && this.props.profile !== null) {

            return (
                <div className='postContainer' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className='container'>
                        <div ref={this.profileCardRef} className='profileCard'>

                            <div style={{ position: 'relative', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                                <div className='leftColumn' >
                                    <input ref={this.uploadProfileImageRef} type="file" id="uploadProfileImg" accept="image/*" style={{ display: 'none' }} onChange={() => { uploadProfileImage() }} />
                                    <img className='profileCardImg' src={this.props.profile.profileImage} />
                                    {
                                        this.props.myId === this.props.profile.user ?
                                            <Button onClick={editProfileImage} className='editImg ' color='primary'> <i className="fa fa-edit" /> </Button>
                                            :
                                            null
                                    }
                                </div>

                            </div>
                            <div className='textBlock'>
                                <div className='profileAlias'>
                                    {
                                        <>
                                            <textarea rows='1' onBlurCapture={onEditAliasBlur} className='invisible aliasTextarea' />
                                            {this.state.editingAlias ? null : this.props.profile.alias}
                                        </>
                                    }
                                    {
                                        (this.props.myId === this.props.profile.user && !this.state.editingAlias) ?
                                            <Button onClick={editAlias} className='editAlias ' color='primary'> <i className="fa fa-edit" /> </Button>
                                            :
                                            null
                                    }
                                </div>
                                <hr />
                                <div className='profileDescription'>
                                    {<>
                                        <textarea onBlurCapture={onEditIntroBlur} className='invisible introTextarea' />
                                        {this.state.editingIntro ? null : this.props.profile.intro}
                                    </>
                                    }
                                    {
                                        (this.props.myId === this.props.profile.user && !this.state.editingIntro) ?
                                            <Button onClick={editIntro} className='editDescription ' color='primary'> <i className="fa fa-edit" /> </Button>
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