import { SET_ENEMIES_STATUS } from '../actions/enemiesActions';
import { GAME_COLUMNS } from '../lib/data';

const initialState = {
    enemiesStatus: new Array(GAME_COLUMNS).fill(false),
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
    default:
        return state;
    }
};

export default enemiesReducer;
