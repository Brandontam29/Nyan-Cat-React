import { batch } from 'react-redux';

import configureStore from '../store/configureStore';
import {
    setPause, setPauseDisabled, setPauseCount, setGameOver,
} from '../actions/gameActions';

const store = configureStore;

// Called when the player is dead
const endGame = () => {
    batch(() => {
        store.dispatch(setGameOver(true));
        store.dispatch(setPause(false));
        store.dispatch(setPauseDisabled(false));
        store.dispatch(setPauseCount(0));
    });
};

export default endGame;
