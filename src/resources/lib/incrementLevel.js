/* eslint-disable import/prefer-default-export */
import configureStore from '../store/configureStore';
import { setLevel } from '../actions/gameActions';

const store = configureStore;

// Continuously increment level once it is called
const incrementLevel = (level, pause, gameOver) => {
    let id = 0;
    if (!pause && !gameOver) {
        id = setTimeout(() => store.dispatch(setLevel(level + 1), 7 * 1000));
        return () => clearTimeout(id);
    }
    return () => clearTimeout(id);
};

export default incrementLevel;
