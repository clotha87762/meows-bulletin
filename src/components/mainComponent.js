import { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { Container, Col, Row, CardImg, Card, CardBody, CardText, Button } from 'reactstrap'
import { action } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { set_news_ready, set_news, set_news_index } from '../redux/mainActions'
import { withRouter } from 'react-router-dom'
import webAPI from '../webapi'
import './css/mainComponent.css'


const mapStateToProps = (state) => {

    console.log(state.main)
    return {
        newsReady: state.main.newsReady,
        openedIndex: state.main.openedIndex,
        news: state.main.news
    }
}

const mapDispatchToProps = (dispatch) => ({
    setOpenedIndex: (index) => { dispatch(set_news_index(index)) },
    getNews: () => { webAPI.getNews(dispatch) }
})

class MainComponent extends Component {

    constructor(props) {
        super(props)

        this.renderNews = this.renderNews.bind(this)
        this.newsEntry = this.newsEntry.bind(this)

        this.newsBoardRef = React.createRef()
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        console.log('yooo')
        console.log(this.props)
        this.props.getNews()
    }

    newsEntry(index, item) {
        let isOpen = index === this.props.openedIndex
        return (
            <div key={index} onClick={() => this.props.setOpenedIndex(index)}>
                <div style={{ lineHeight: '40px', minHeight: '40px', boxShadow: 'inset 0px 0px 5px ', border: 'solid 0px', borderColor: `rgba(200,120,120,0.7)`, background: `rgba(240,130,80,0.7)`, fontSize: '20px' }}>
                    <div className='entryTitle'>
                        <span ><b>{item.title}</b></span>
                        <br />
                        <div className='newsEntry' style={{ transition: 'max-height 0.6s', maxHeight: isOpen ? '100px' : '0px', fontSize: '15px' }}>
                            {isOpen ? item.content : null}
                        </div>
                    </div>

                </div>
            </div>
        )

    }

    renderNews() {
        console.log(this.props.newsReady)
        if (this.props.newsReady) {

            return (

                <div>
                    {
                        this.props.news.map(
                            (item, index) => {
                                return this.newsEntry(index, item)
                            }
                        )
                    }
                </div>

            )

        }
        else {
            return (
                <div style={{ lineHeight: '90px', height: '90px', boxShadow: 'inset 0px 0px 5px ', border: 'solid 0px', borderColor: `rgba(200,120,120,0.7)`, background: `rgba(240,130,80,0.7)`, fontSize: '20px' }}>
                    <span style={{ marginTop: '10px' }} className="fa fa-spinner fa-pulse fa-2x fa-fw text-warning"></span>
                    <b> News Now Loading... </b>
                </div>
            )
        }

    }

    render() {

        let news = this.renderNews()

        return (
            <div className='container' style={{ color: '#333333' }}>
                <div style={{ height: '10vh' }}></div>
                <Row>
                    <Col sm={{ size: 10 }} md={{ offset: 4, size: 3 }}>
                        <img src='./assets/cat.png'></img>
                    </Col>
                </Row>
                <div style={{ height: '10px' }} />
                <Row>
                    <Col sm={{ size: 12 }} md={{ offset: 3, size: 6 }}>
                        <div style={{
                            overflow: 'auto', maxHeight: '50vh', boxShadow: '10px 5px 10px',
                            border: 'solid 2px', borderColor: `rgba(30,30,30,1.0)`, borderRadius: '5px'
                        }}>

                            <div style={{ lineHeight: '40px', height: '40px', boxShadow: 'inset 0px 0px 5px ', border: 'solid 0px', borderColor: `rgba(200,120,120,0.7)`, background: `rgba(240,130,80,0.7)`, fontSize: '20px' }}>
                                <b>-----NEWS-----</b>
                            </div>

                            {news}

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default withRouter( connect(
    mapStateToProps, mapDispatchToProps
)(MainComponent))