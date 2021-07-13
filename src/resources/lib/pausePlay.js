import configureStore from '../store/configureStore';
import { setPause, setPauseCount, setPauseDisabled } from '../actions/gameActions';

import startGame from './startGame';

const store = configureStore;

// This is passed to the main action button to pause, play, and play again
const pausePlay = () => {
    const {
        gameOver, pause, pauseCount, pauseDisabled,
    } = store.getState().game;

    if (gameOver) {
        return startGame();
    }

    if (!pauseDisabled) {
        if (!pause) {
            store.dispatch(setPauseCount(pauseCount - 1));
        }
        if (pauseCount === 0) {
            store.dispatch(setPauseDisabled(true));
        }
        return store.dispatch(setPause(!pause));
    }
    return null;
};

export default pausePlay;
