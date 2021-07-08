export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
export const SET_PLAYER_HEALTH = 'SET_PLAYER_HEALTH';

export const setPlayerPosition = (number) => {
    return ({
        type: SET_PLAYER_POSITION,
        payload: number,
    });
};

export const setPlayerHealth = (number) => {
    return ({
        type: SET_PLAYER_HEALTH,
        payload: number,
    });
};
