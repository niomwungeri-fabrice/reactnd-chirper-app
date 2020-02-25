import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tweet from "./Tweet";

class Dashboard extends Component {
    render() {
        console.log(this.props.tweetsIds);
        return (
            <div>
                <h3 className='center'>TimeLine</h3>
                <ul className='dashboard-list'>
                    {this.props.tweetsIds.map(tweetId => (
                        <li key={tweetId}>
                            <Tweet id={tweetId}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const propsToState = ({tweets}) => {
    return {
        tweetsIds: Object.keys(tweets)
            .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }
};

export default connect(propsToState)(Dashboard)