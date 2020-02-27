import {getInitialData} from '../utils/api';
import {receiveUsers, setAuthenticatedUser} from "./users";
import {RECEIVE_TWEETS} from "./tweets";
import {showLoading, hideLoading} from 'react-redux-loading';

const authUserId = 'dan_abramov';

const receiveTweets = (tweets) => {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
};

export const handleInitialData = () => (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users, tweets}) => {
        dispatch(receiveTweets(tweets));
        dispatch(receiveUsers(users));
        dispatch(setAuthenticatedUser(authUserId));
        dispatch(hideLoading())
    })
};

