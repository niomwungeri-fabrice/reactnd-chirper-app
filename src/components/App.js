import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from "react-redux";
import {handleInitialData} from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from 'react-redux-loading';
import TweetPage from "./TweetPage";
import NewTweet from "./NewTweet";
import {Nav} from "./Nav";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={Dashboard}/>
                                <Route path='/tweet/:id' component={TweetPage}/>
                                <Route path='/new' component={NewTweet}/>
                            </div>}
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}

export const mapStateToProps = state => ({loading: state.authedUser === null});
export default connect(mapStateToProps)(App);