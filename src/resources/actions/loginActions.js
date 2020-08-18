export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const setLoggedIn = (success) => {
    if (success === true) {
        return {
            type: LOGIN_SUCCESS,
            payload: success,
        };
    } return {
        type: LOGIN_ERROR,
        payload: false,
    };
};
