import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import playerReducer from './playerReducer';
import enemiesReducer from './enemiesReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    game: gameReducer,
    player: playerReducer,
    enemies: enemiesReducer,
    login: loginReducer,
});
