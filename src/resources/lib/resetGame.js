/* eslint-disable import/prefer-default-export */
// import { useEffect } from 'react';
import configureStore from '../store/configureStore';
import {
    setLevel, setPause, setPauseDisabled, setPauseCount, setGameOver,
} from '../actions/gameActions';

import {
    setPlayerHealth,
} from '../actions/playerActions';
import { STARTING_HEALTH } from './data';

const store = configureStore;

// Continuously increment level once it is called
const resetGame = async () => {
    await store.dispatch(setPauseDisabled(true));
    store.dispatch(setGameOver(false));
    store.dispatch(setPause(false));
    store.dispatch(setLevel(1));
    store.dispatch(setPauseCount(3));
    store.dispatch(setPlayerHealth(STARTING_HEALTH));
};

export default resetGame;
