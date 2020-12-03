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


const mapStateToProps = (state) => ({
    newsReady: state.newsReady,
    openedIndex: state.openedIndex,
    news: state.news
})

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
        this.props.getNews()
    }

    newsEntry(index, item) {
        return index === this.props.openedIndex ?
            (
                <div key={index} className='newsEntry' onClick={() => this.props.setOpenedIndex(index)}>
                    {item.content}
                </div>
            )
            :
            (
                <div key={index} className='newsEntry' onClick={() => this.props.setOpenedIndex(index)}>
                    {item.title} 
                </div>
            )
    }

    renderNews() {

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
            <div>
                News now loading...
            </div>
        }

    }

    render() {

        let news = this.renderNews()

        return (
            <div className='container' style={{color:'#333333'}}>
                <div style={{height:'10vh'}}></div>
                <Row>
                    <Col sm={{size:10}} md={{ offset: 4, size: 3}}>
                        <img src='./assets/cat.png'></img>
                    </Col>
                </Row>
                <div style={{height:'10px'}}/>
                <Row>
                    <Col sm={{size:12}} md={{ offset: 3, size: 6}}>
                        <div style={{overflow:'auto' , maxHeight:'30vh', boxShadow:'10px 5px 10px',
                             border:'solid 2px', borderColor:`rgba(30,30,30,1.0)`,borderRadius:'5px'}}>
                            
                            <div style={{lineHeight:'40px', height:'40px', boxShadow: 'inset 0px 0px 5px ',border:'solid 0px', borderColor:`rgba(200,120,120,0.7)` ,background: `rgba(240,130,80,0.7)`  ,fontSize:'20px'}}>
                                123
                            </div>
                            
                            {news}

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(MainComponent))