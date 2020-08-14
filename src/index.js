/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
// import domready from 'domready';
import Root from './resources/components/Root';
// import * as serviceWorker from './serviceWorker';

// const ready = (document.readyState || 'loading') !== 'loading';
// const start = () => {
//     ReactDOM.render(<Root />, document.getElementById('root'));
// };
// if (ready) {
//     start();
// }
// domready(start());
// serviceWorker.unregister();
ReactDOM.render(<Root />, document.getElementById('root'));
