import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/header.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Header = ({ className }) => (
    <header
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <div className={styles.heading}>
            <h1>Burgerino vs Nyan Cat</h1>
            <span>
                Nyan cats across the galaxy coming to feast on you. Evade them for as long as you can.
                <br />
                How long can you survive?
            </span>
        </div>
        <div className={styles.paragraph}>
            <h2>How to Play</h2>
            <ul>
                <li>Move: A and D</li>
                <li>Pause/Play: Space</li>
                <li>Fullscreen: F</li>
            </ul>
        </div>
    </header>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
