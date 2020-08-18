import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/loginActions';


const initialState = {
    loggedIn: true,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS: {
        return {
            ...state,
            loggedIn: action.payload,
        };
    }
    case LOGIN_ERROR: {
        return {
            ...state,
            loggedIn: action.payload,
        };
    }
    default:
        // console.log(state);
        return state;
    }
};

export default loginReducer;
