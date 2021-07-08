export const SELECTION_MODE = 'SELECTION_MODE';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';
export const TOGGLE_GAME_OVER = 'TOGGLE_GAME_OVER';
export const INCREMENT_LEVEL = 'INCREMENT_LEVEL';
export const SET_LEVEL = 'SET_LEVEL';

export const setSelectionMode = (bool) => ({
    type: SELECTION_MODE,
    payload: bool,
});

export const togglePause = () => ({
    type: TOGGLE_PAUSE,
});

export const toggleGameOver = () => ({
    type: TOGGLE_GAME_OVER,
});

export const incrementLevel = () => ({
    type: INCREMENT_LEVEL,
});

export const setLevel = (number) => ({
    type: SET_LEVEL,
    payload: number,
});
