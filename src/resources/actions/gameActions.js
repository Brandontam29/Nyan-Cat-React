export const SELECTION_MODE = 'SELECTION_MODE';
export const SET_PAUSE = 'SET_PAUSE';
export const SET_PAUSE_COUNT = 'SET_PAUSE_COUNT';
export const SET_PAUSE_DISABLED = 'SET_PAUSE_DISABLED';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const SET_STARTING = 'SET_STARTING';
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

export const setPauseCount = (number) => ({
    type: SET_PAUSE_COUNT,
    payload: number,
});

export const setPauseDisabled = (bool) => ({
    type: SET_PAUSE_DISABLED,
    payload: bool,
});

export const setGameOver = (bool) => ({
    type: SET_GAME_OVER,
    payload: bool,
});

export const setStarting = (bool) => ({
    type: SET_STARTING,
    payload: bool,
});

export const incrementLevel = () => ({
    type: INCREMENT_LEVEL,
});

export const setLevel = (number) => ({
    type: SET_LEVEL,
    payload: number,
});
