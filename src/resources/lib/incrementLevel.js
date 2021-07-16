/* eslint-disable import/prefer-default-export */
import configureStore from '../store/configureStore';
import { incrementLevel as upLevel } from '../actions/gameActions';
// import { sleep } from './utils';
// import { LEVEL_UP_DELAY } from './data';

const store = configureStore;

// Continuously increment level when it is called once until
const incrementLevel = () => {
    return store.dispatch(upLevel());
};

export default incrementLevel;
