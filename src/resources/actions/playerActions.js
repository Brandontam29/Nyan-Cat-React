export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
export const CALCULATE_PLAYER_HEALTH = 'CALCULATE_PLAYER_HEALTH';
// export const MINUS_PLAYER_HEALTH = 'MINUS_PLAYER_HEALTH';

export const setPlayerPosition = (number) => {
    return ({
        type: SET_PLAYER_POSITION,
        payload: number,
    });
};

export const calculatePlayerHealth = (number) => {
    return ({
        type: CALCULATE_PLAYER_HEALTH,
        payload: number,
    });
};

// export const minusPlayerHealth = (number) => {
//     return ({
//         type: MINUS_PLAYER_HEALTH,
//         payload: number,
//     });
// };