import configureStore from '../store/configureStore';
import { setDrop } from '../actions/enemiesActions';

const store = configureStore;

// Creat loading animation
const dropEnemies = () => {
    return store.dispatch(setDrop(true));
};

export default dropEnemies;
