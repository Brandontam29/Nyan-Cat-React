import {
    SELECTION_MODE, TOGGLE_PAUSE, TOGGLE_GAME_OVER, INCREMENT_LEVEL, SET_LEVEL,
} from '../actions/gameActions';


const initialState = {
    selectionMode: false,
    pause: false,
    gameOver: true,
    level: 1,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
    case SELECTION_MODE: {
        return {
            ...state,
            selectionMode: action.payload,
        };
    }
    case TOGGLE_PAUSE: {
        return {
            ...state,
            pause: !state.pause,
        };
    }
    case TOGGLE_GAME_OVER: {
        return {
            ...state,
            gameOver: !state.gameOver,
        };
    }
    case INCREMENT_LEVEL: {
        return {
            ...state,
            level: state.level + 1,
        };
    }
    case SET_LEVEL: {
        return {
            ...state,
            level: action.payload,
        };
    }
    default:
        return state;
    }
};

export default gameReducer;
