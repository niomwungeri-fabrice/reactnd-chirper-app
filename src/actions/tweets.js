import {saveLikeToggle, saveTweet} from "../utils/api";
import {showLoading, hideLoading} from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET_LIKE = 'TOGGLE_TWEET_LIKE';
export const ADD_TWEET = 'ADD_TWEET';


const addTweet = (tweet) => {
    return {
        type: ADD_TWEET,
        tweet
    }
};

const toggleTweetLikes = ({id, authedUser, hasLiked}) => {
    return {
        type: TOGGLE_TWEET_LIKE,
        payload: {
            id,
            authedUser,
            hasLiked
        }
    }
};


export const handleAddTweet = (tweet, replyingTo) => (dispatch, getState) => {
    const {authedUser} = getState();
    dispatch(showLoading());
    return saveTweet({
        text: tweet,
        author: authedUser,
        replyingTo
    }).then((tweet) => {
        dispatch(addTweet(tweet));
        dispatch(hideLoading())
    })
};

export const handleToggleLikes = (info) => (dispatch) => {
    // optimistic update
    dispatch(toggleTweetLikes(info));
    return saveLikeToggle(info).catch((e) => {
        console.warn('Server allow', e);
        // reset if error happens
        dispatch(toggleTweetLikes(info));
    })
};

