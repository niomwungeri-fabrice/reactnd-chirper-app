export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET_LIKE = 'TOGGLE_TWEET_LIKE';

export const receiveTweets = (tweets) => {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
};

export const toggleTweetLikes = ({id, authedUser, hasLiked}) => {
    return {
        type: TOGGLE_TWEET_LIKE,
        payload: {
            id,
            authedUser,
            hasLiked
        }
    }
};

