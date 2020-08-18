import { SELECTION_MODE } from '../actions/siteActions';


const initialState = {
    selectionMode: false,
};

const siteReducer = (state = initialState, action) => {
    switch (action.type) {
    case SELECTION_MODE: {
        return {
            ...state,
            selectionMode: action.payload,
        };
    }
    default:
        return state;
    }
};

export default siteReducer;
