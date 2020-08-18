export const ADD_ACTIVE_ENEMIES = 'ADD_ACTIVE_ENEMIES';
export const SUBSTRACT_ACTIVE_ENEMIES = 'SUBSTRACT_ACTIVE_ENEMIES';
export const SET_ENEMIES_STATUS = 'SET_ENEMIES_STATUS';

export const setEnemiesStatus = (number, bool) => ({
    type: SET_ENEMIES_STATUS,
    payload: { spot: number, bool },
});

// export const addActiveEnemies = (number) => ({
//     type: ADD_ACTIVE_ENEMIES,
//     payload: number,
// });

// export const subtractActiveEnemies = (number) => ({
//     type: SUBSTRACT_ACTIVE_ENEMIES,
//     payload: number,
// });
