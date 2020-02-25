export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SET_AUTH_USER = 'SET_AUTH_USER';


export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    }
};

export const setAuthenticatedUser = (id) => {
    return {
        type: SET_AUTH_USER,
        id
    }
};