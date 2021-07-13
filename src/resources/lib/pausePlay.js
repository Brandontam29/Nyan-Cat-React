/* eslint-disable import/prefer-default-export */
import { GAME_COLUMNS } from './data';
import configureStore from '../store/configureStore';
import { setPlayerPosition } from '../actions/playerActions';

const store = configureStore;

const pausePlay = () => {
    if (!gameOver) {
        if (!pauseDisabled) {
            if (!pause) {
                setPauseCount(pauseCount - 1);
            }
            if (pauseCount === 0) {
                setPauseDisabled(true);
            }
            return setPause(!pause);
        }
    }

    setStarting(true);
    return setTimeout(() => {
        setStarting(false);
        setPauseCount(3);zzzz
        setPause(false);
        setPauseDisabled(false);
        setPlayerHealth(STARTING_HEALTH);
        return setGameOver(false);
    }, 3000);
};

export const moveLeft = () => {
    const playerPosition = store.getState().player.position;

    if (playerPosition > 0) {
        store.dispatch(setPlayerPosition(playerPosition - 1));
    }
};

export const moveRight = () => {
    const playerPosition = store.getState().player.position;

    if (playerPosition < GAME_COLUMNS - 1) {
        store.dispatch(setPlayerPosition(playerPosition + 1));
    }
};
