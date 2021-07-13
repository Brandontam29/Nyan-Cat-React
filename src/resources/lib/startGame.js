import { batch } from 'react-redux';
import configureStore from '../store/configureStore';
import {
    setLevel,
    setPause,
    setPauseDisabled,
    setPauseCount,
    setGameOver,
    setStarting,
} from '../actions/gameActions';
import { setPlayerHealth } from '../actions/playerActions';

import { sleep } from './utils';

import { STARTING_HEALTH } from './data';

const store = configureStore;

// Creat loading animation
const startGame = async () => {
    // Animation for 3 seconds
    store.dispatch(setStarting(true));
    await sleep(3000);
    await store.dispatch(setStarting(false));
    batch(() => {
        // Prepare game values
        store.dispatch(setLevel(1));
        store.dispatch(setPauseCount(3));
        store.dispatch(setPlayerHealth(STARTING_HEALTH));
        store.dispatch(setPauseDisabled(false));

        // Enemies start falling
        store.dispatch(setGameOver(false));
        store.dispatch(setPause(false));
    });
};

export default startGame;
