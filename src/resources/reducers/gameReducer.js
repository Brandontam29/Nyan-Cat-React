import {
    SELECTION_MODE,
    SET_PAUSE,
    SET_PAUSE_COUNT,
    SET_PAUSE_DISABLED,
    SET_GAME_OVER,
    SET_STARTING,
    INCREMENT_LEVEL,
    SET_LEVEL,
} from '../actions/gameActions';

const initialState = {
    selectionMode: false,
    pause: false,
    pauseCount: 3,
    pauseDisabled: false,
    gameOver: true,
    starting: false,
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
    case SET_PAUSE: {
        return {
            ...state,
            pause: action.payload,
        };
    }
    case SET_PAUSE_COUNT: {
        return {
            ...state,
            pauseCount: action.payload,
        };
    }
    case SET_PAUSE_DISABLED: {
        return {
            ...state,
            pauseDisabled: action.payload,
        };
    }

    case SET_GAME_OVER: {
        return {
            ...state,
            gameOver: action.payload,
        };
    }
    case SET_STARTING: {
        return {
            ...state,
            starting: action.payload,
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
