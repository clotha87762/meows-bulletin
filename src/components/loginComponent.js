import { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import {
    Container, Col, Row, CardImg, Card, CardBody, CardText, Button,
    FormGroup, Form, Input, Label, Modal, ModalBody, ModalHeader
} from 'reactstrap'
import { action } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { set_sign_up_form, set_login_error_msg, on_login, on_sign_up } from '../redux/loginAction'
import { withRouter, NavLink } from 'react-router-dom'
import webAPI from '../webapi'
import './css/mainComponent.css'


const mapStateToProps = (state) => {

    console.log('mapstatetoprops')
    console.log(state.login)

    return {
        loginErrorMsg: state.login.loginErrorMsg,
        signupErrorMsg: state.login.signupErrorMsg,
        signUpForm: state.login.signUpForm,
        onLogin: state.login.onLogin,
        onSignup: state.login.onSignup
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        showSignUpForm: (show) => { dispatch(set_sign_up_form(show)) },
        login: (account , password) => { webAPI.login(dispatch, account , password )},
        signup: (account , password) => { webAPI.signup(dispatch, account , password )}
    }
}

class LoginComponent extends Component {

    constructor(props) {

        super(props)

        this.onLoginClicked = this.onLoginClicked.bind(this)
        this.onSignUpClicked = this.onSignUpClicked.bind(this)

        this.state = {
            ...this.state,
            loginAccount: '',
            loginPassword: ''
        }
        

    }

    componentDidUpdate() {

    }

    componentDidMount() {
        
    }

    onLoginClicked() {
        console.log('on login up')
        console.log(this.state.loginAccount + '  ' + this.state.loginPassword)

        this.props.login(this.state.loginAccount , this.state.loginPassword)
        this.state.loginAccount = ''
        this.state.loginPassword = ''
    }

    onSignUpClicked(event) {
        console.log('on sign up')
        event.preventDefault()
        this.props.showSignUpForm(true)

    }

    onSubmitSignup() {

    }


    render() {
        console.log('login componenttt')
        return (
            <>
                <div>
                    <Modal isOpen={this.props.signUpForm} toggle={() => { this.props.showSignUpForm(false) }} >

                        <Card style={{ background: `rgba(237,115,45, 0.7)` }}>
                            <ModalHeader style={{ margin: 'auto' }} > <span className="fa fa-user-plus" /><b>&nbsp;Sign Up</b> </ModalHeader>
                            <Container>
                                <Form style={{ margin: '20px 0px' }}>
                                    <FormGroup>
                                        <Label style={{ fontSize: '20px' }} for="account"><span className="fa fa-user-circle" /><b>&nbsp;Account</b></Label>
                                        <Input  type="acount" name="acount" id="account" onChange placeholder="Type yout account!" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={{ fontSize: '20px' }} for="password"><span className="fa fa-key" /><b>&nbsp;Password</b></Label>
                                        <Input  type="password" name="password" id="password" placeholder="Type yout password!" />
                                    </FormGroup>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <span>
                                            <Button color='primary' style={{ marginTop: '5px' }} onClick={this.onSubmitSignup}> Sign UP! </Button>
                                        </span>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span>
                                            <Button color='secondary' style={{ marginTop: '5px' }} onClick={() => { this.props.showSignUpForm(false) }}> Abort QQ </Button>
                                        </span>
                                    </div>
                                </Form>
                            </Container>
                        </Card>

                    </Modal>
                </div>

                <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Row>
                        <Col sm={{ size: 10 }} md={{ size: 8, offset: 2 }} >
                            <Card style={{ background: `rgba(237,115,45, 0.7)` }}>
                                <Container>
                                    <Form style={{ margin: '20px 0px' }}>
                                        <FormGroup>
                                            <Label style={{ fontSize: '20px' }} for="account"><span className="fa fa-user-circle" /><b>Account</b></Label>
                                            <Input onChange={(e)=>{this.state.loginAccount = e.target.value}} type="acount" name="acount" id="account" placeholder="Type yout account!" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label style={{ fontSize: '20px' }} for="password"><span className="fa fa-key" /><b>Password</b></Label>
                                            <Input onChange={(e)=>{this.state.loginPassword = e.target.value}} type="password" name="password" id="password" placeholder="Type yout password!" />
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input name="remember" id="remember" type="checkbox" />{' '}
                                    Remember my account/password
                                </Label>
                                        </FormGroup>
                                        <span>
                                            <Button color='primary' style={{ marginTop: '5px' }} onClick={this.onLoginClicked}> 
                                                {   this.props.onLogin?
                                                    <span style={{ marginTop: '10px' }} className="fa fa-spinner fa-pulse fa-lg fa-fw text-warning"></span>
                                                    :
                                                    "Login"
                                                } 
                                            </Button>
                                        </span>
                                    &nbsp;&nbsp;&nbsp;or sign up your account &nbsp;
                                        <a href='#' onClick={(e) => { this.onSignUpClicked(e) }}>HERE</a>
                                    </Form>
                                </Container>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </>
        )
    }

}

export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginComponent)