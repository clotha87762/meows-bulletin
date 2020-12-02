import { Component } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { Col, Row } from 'react-strap'
import webAPI from '../webapi'
import { action } from 'redux'
import { connect } from 'redux-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Actions from '../redux/mainActions'
import { withRouter } from 'react-router-dom'
import webAPI from '../webapi'

mapStateToProps = (state) => ({
    newsReady: state.newsReady,
    openedIndex: state.openedIndex,
    news: state.news
})

mapDispatchToProps = (dispatch) => ({
    setOpenedIndex: (index) => { dispatch(Actions.setNewsIndex(index)) },
    getNews: () => { webAPI.getNews(dispatch) }
})

class MainComponent extends Component {

    constructor(props) {
        super(props)

        this.renderNews = this.renderNews.bind(this)
        this.expandEntry = this.expandEntry.bind(this)

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
                    <h5> {item.title}</h5>
                    <p> {item.content}</p>
                </div>
            )
            :
            (
                <div key={index} className='newsEntry' onClick={() => this.props.setOpenedIndex(index)}>
                    <h5>  {item.title} </h5>
                </div>
            )
    }

    renderNews() {

        if (this.props.newsReady) {

            return (

                <div className="newsBoard" ref={this.newsBoardRef}>
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

        news = renderNews()

        return (
            <div className='container'>
                <Row>
                    <Col className='col-11 col-md-5'>
                        <img src='./assets/test.jpg' />
                    </Col>
                </Row>
                {news}
            </div>
        )

    }

}

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(MainComponent))