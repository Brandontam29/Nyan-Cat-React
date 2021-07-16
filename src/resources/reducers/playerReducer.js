import {
    SET_PLAYER_POSITION, SET_PLAYER_HEALTH,
} from '../actions/playerActions';
import { GAME_COLUMNS, STARTING_HEALTH } from '../lib/data';

const initialState = {
    position: Math.floor(GAME_COLUMNS / 2),
    health: STARTING_HEALTH,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_PLAYER_POSITION: {
        return {
            ...state,
            position: action.payload,
        };
    }
    case SET_PLAYER_HEALTH: {
        if (action.payload < 0) {
            return state;
        }
        return {
            ...state,
            health: action.payload,
        };
    }

    default:
        return state;
    }
};

export default playerReducer;
