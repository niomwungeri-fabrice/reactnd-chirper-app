import {tweets} from './tweets';
import {users} from './users';
import {authedUser} from './authedUser';

import {combineReducers} from 'redux';

export default combineReducers({
    tweets,
    users,
    authedUser
})



