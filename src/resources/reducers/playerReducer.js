import { SET_PLAYER_POSITION } from '../actions/playerActions';
import { GAME_COLUMNS } from '../lib/data';

const initialState = {
    position: Math.floor(GAME_COLUMNS / 2),
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_PLAYER_POSITION: {
        return {
            ...state,
            position: action.payload,
        };
    }
    default:
        return state;
    }
};

export default playerReducer;
