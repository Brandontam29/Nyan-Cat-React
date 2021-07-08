import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import configureStore from '../store/configureStore';

const Root = () => (
    <React.StrictMode>
        <ReduxProvider store={configureStore}>
            <App />
        </ReduxProvider>
    </React.StrictMode>
);
export default Root;
