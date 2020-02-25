import {tweets} from './tweets';
import {users} from './users';
import {authedUser} from './authedUser';
import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading';

export const rootReducer = combineReducers({
    tweets,
    users,
    authedUser,
    loadingBar: loadingBarReducer
});



