import {getInitialData} from '../utils/api';
import {receiveUsers, setAuthenticatedUser} from "./users";
import {receiveTweets} from "./tweets";

const authUserId = 'dan_abramov';

export const handleInitialData = () => (dispatch) => {
    getInitialData().then(({users, tweets}) => {
        dispatch(receiveTweets(tweets));
        dispatch(receiveUsers(users));
        dispatch(setAuthenticatedUser(authUserId))
    })
};