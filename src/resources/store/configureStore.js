import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const enahancers = applyMiddleware(thunk);

const configureStore = createStore(
    reducers,
    enahancers,
);

export default configureStore;
