import { SELECTION_MODE } from '../actions/gameActions';


const initialState = {
    selectionMode: false,
};

const gameReducer = (state = initialState, action) => {
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

export default gameReducer;
