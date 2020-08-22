export const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';

export const setPlayerPosition = (number) => {
    return ({
        type: SET_PLAYER_POSITION,
        payload: number,
    });
};
