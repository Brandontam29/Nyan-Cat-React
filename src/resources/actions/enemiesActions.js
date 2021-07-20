export const SET_ENEMIES_STATUS = 'SET_ENEMIES_STATUS';
export const SET_DROP = 'SET_DROP';

export const setEnemiesStatus = (object) => {
    return ({
        type: SET_ENEMIES_STATUS,
        payload: object,
    });
};

export const setDrop = (bool) => {
    return ({
        type: SET_DROP,
        payload: bool,
    });
};
