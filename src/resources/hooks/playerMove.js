/* eslint-disable import/prefer-default-export */
import { GAME_COLUMNS } from '../lib/data';
import configureStore from '../store/configureStore';
import { setPlayerPosition } from '../actions/playerActions';

const store = configureStore;


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
