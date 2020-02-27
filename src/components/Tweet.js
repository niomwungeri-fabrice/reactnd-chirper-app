import React, {Component} from 'react';
import {connect} from "react-redux";
import {formatDate, formatTweet} from "../utils/helpers";
import {FaHeart, FaReply, FaRegHeart} from 'react-icons/fa';
import {handleToggleLikes} from "../actions/tweets";
import {Link, withRouter} from 'react-router-dom'

class Tweet extends Component {
    toParent = (e, id) => {
        this.props.history.push(`/tweet/${id}`)
    };

    handleLike = (e) => {
        e.preventDefault();
        const {dispatch, tweet, authedUser} = this.props;
        dispatch(handleToggleLikes({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    };

    render() {
        const {tweet} = this.props;

        if (tweet === null) return <div>Tweet doesn't exist</div>
        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent, id
        } = tweet;
        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img src={avatar} alt={name} className='avatar'/>
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <FaReply className='tweet-icon'/>
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true
                                ? <FaHeart color='#e0245e' className='tweet-icon'/>
                                : <FaRegHeart className='tweet-icon'/>}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

const propsToState = ({authedUser, users, tweets}, ownProps) => {
    const tweet = tweets[ownProps.id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
};

export default withRouter(connect(propsToState)(Tweet));