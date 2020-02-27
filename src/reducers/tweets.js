import {RECEIVE_TWEETS, TOGGLE_TWEET_LIKE, ADD_TWEET} from '../actions/tweets';


export const tweets = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            };
        case TOGGLE_TWEET_LIKE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    likes: action.payload.hasLiked === true
                        ? state[action.payload.id].likes.filter((id) => id !== action.payload.authedUser)
                        : state[action.payload.id].likes.concat([action.payload.authedUser])
                }
            };
        case ADD_TWEET:
            const {tweet} = action;
            let replyingTo = {};
            if (tweet.replyingTo !== null) {
                replyingTo = {
                    [tweet.replyingTo]: {
                        ...state[tweet.replyingTo],
                        replies: state[tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
            }

            return {
                ...state,
                [tweet.id]: tweet,
                ...replyingTo
            };
        default:
            return state
    }
};