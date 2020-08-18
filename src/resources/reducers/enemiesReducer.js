import { SET_ENEMIES_STATUS } from '../actions/enemiesActions';
import { GAME_COLUMNS } from '../lib/data';

const initialState = {
    enemiesStatus: new Array(GAME_COLUMNS).fill(false),
};

const enemiesReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_ENEMIES_STATUS: {
        const array = state.enemiesStatus;
        const { spot, bool } = action.paylaod;

        const newArray = [...array.slice(0, spot - 1), bool, ...array.slice(spot)];

        return {
            ...state,
            enemiesStatus: newArray,
        };
    }
    // case ADD_ACTIVE_ENEMIES: {
    //     return {
    //         ...state,
    //         enemiesStatus: state.enemiesStatus + action.payload,
    //     };
    // }
    // case SUBSTRACT_ACTIVE_ENEMIES: {
    //     return {
    //         ...state,
    //         enemiesStatus: state.enemiesStatus - action.payload,
    //     };
    // }
    default:
        return state;
    }
};

export default enemiesReducer;
