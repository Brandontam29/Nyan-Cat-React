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
    <div
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
                Nyan cats across the galaxy coming to feast on you.
                Dodge them for as long as you can. How long can you survive?
            </span>
        </div>
        <div className={styles.paragraph}>
            <h3>How to Play</h3>
            <span>use your arrow keys to move</span>
        </div>
    </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
