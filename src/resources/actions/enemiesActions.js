export const SET_ENEMIES_STATUS = 'SET_ENEMIES_STATUS';

export const setEnemiesStatus = (object) => {
    return ({
        type: SET_ENEMIES_STATUS,
        payload: object,
    });
};
