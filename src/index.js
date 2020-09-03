/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import Root from './resources/components/Root';

const ready = (document.readyState || 'loading') !== 'loading';
const start = () => {
    ReactDOM.render(<Root />, document.getElementById('app'));
};
if (ready) {
    start();
}
domready(start());

// ReactDOM.render(<Root />, document.getElementById('app'));
