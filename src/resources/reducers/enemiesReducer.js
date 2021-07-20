import { SET_ENEMIES_STATUS, SET_DROP } from '../actions/enemiesActions';
import { GAME_COLUMNS } from '../lib/data';

const initialState = {
    enemiesStatus: new Array(GAME_COLUMNS).fill(false),
    drop: false,
};

const enemiesReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_ENEMIES_STATUS: {
        const array = state.enemiesStatus;
        const { spot, falling } = action.payload;

        const newArray = [...array.slice(0, spot), falling, ...array.slice(spot + 1)];
        return {
            ...state,
            enemiesStatus: newArray,
        };
    }

    case SET_DROP: {
        return {
            ...state,
            drop: action.payload,
        };
    }
    default:
        return state;
    }
};

export default enemiesReducer;
