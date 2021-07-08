export const SELECTION_MODE = 'SELECTION_MODE';
export const SET_PAUSE = 'SET_PAUSE';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const INCREMENT_LEVEL = 'INCREMENT_LEVEL';
export const SET_LEVEL = 'SET_LEVEL';

export const setSelectionMode = (bool) => ({
    type: SELECTION_MODE,
    payload: bool,
});

export const setPause = (bool) => ({
    type: SET_PAUSE,
    payload: bool,
});

export const setGameOver = (bool) => ({
    type: SET_GAME_OVER,
    payload: bool,
});

export const incrementLevel = () => ({
    type: INCREMENT_LEVEL,
});

export const setLevel = (number) => ({
    type: SET_LEVEL,
    payload: number,
});
