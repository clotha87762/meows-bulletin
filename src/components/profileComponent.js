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
import '../common/DateFormat'
import Immutable from 'immutable'


class ProfileComponent extends Component {

    constructor(props) {
        super(props)

    }

    componentDidUpdate() {

    }


    componentWillMount() {


    }


    render() {

        console.log(this.props.profile)

        return (
            <div className='postContainer' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className='container'>
                    <div className='profileCard'>

                        <div style={{position:'relative' , height:'100%' , marginLeft:'10px' , display:'flex' , alignItems:'center'}}>
                            <img className='profileCardImg' src='/assets/yoo.png' />
                            <Button className='editImg ' color='primary'> <i className="fa fa-edit" /> </Button>
                        </div>
                        <div className='textBlock'>
                            <div className='profileAlias'>
                                123123123123
                                <Button className='editAlias ' color='primary'> <i className="fa fa-edit" /> </Button>
                            </div>
                            <hr />
                            <div className='profileDescription'>
                                12312312312312312312312222222222233333333333333333333333333322222222<br />
                        12312312312312312312312<br />
                        12312312312312312312312<br />
                        12312312312312312312312<br />
                        12312312312312312312312<br />
                        12312312312312312312312<br />

                        12312312312312312312312<br />
                                <Button className='editDescription ' color='primary'> <i className="fa fa-edit" /> </Button>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        )
    }
}

export default ProfileComponent