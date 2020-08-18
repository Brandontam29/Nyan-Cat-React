import { combineReducers } from 'redux';

import siteReducer from './siteReducer';
import enemiesReducer from './enemiesReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    site: siteReducer,
    enemies: enemiesReducer,
    login: loginReducer,
});
