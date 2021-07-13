/* eslint-disable import/prefer-default-export */
import configureStore from '../store/configureStore';
import { setLevel } from '../actions/gameActions';
import { sleep } from './utils';
import { LEVEL_UP_DELAY } from './data';

const store = configureStore;

// Continuously increment level when it is called once until
const incrementLevel = async () => {
    const { gameOver, level } = store.getState().game;

    if (!gameOver) {
        store.dispatch(setLevel(level + 1));
        await sleep(LEVEL_UP_DELAY * 1500);
        return incrementLevel();
    }
    return null;
};

export default incrementLevel;
