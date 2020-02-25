import {getInitialData, saveLikeToggle} from '../utils/api';
import {receiveUsers, setAuthenticatedUser} from "./users";
import {receiveTweets, toggleTweetLikes} from "./tweets";
import {showLoading, hideLoading} from 'react-redux-loading';

const authUserId = 'dan_abramov';

export const handleInitialData = () => (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users, tweets}) => {
        dispatch(receiveTweets(tweets));
        dispatch(receiveUsers(users));
        dispatch(setAuthenticatedUser(authUserId));
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