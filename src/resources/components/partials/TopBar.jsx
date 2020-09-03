import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

import Maximize from '../icons/Maximize';
import Minimize from '../icons/Minimize';
import HealthBar from '../game/HealthBar';

import styles from '../../styles/partials/top-bar.scss';

const propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    toggleFullScreen: PropTypes.func,
    level: PropTypes.number,
    playerHealth: PropTypes.number,
    className: AppPropTypes.className,
};

const defaultProps = {
    toggleFullScreen: null,
    level: null,
    playerHealth: 0,
    className: null,
};

const TopBar = ({
    fullScreen, toggleFullScreen, level, playerHealth, className,
}) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}

        >
            <button
                type="button"
                onClick={toggleFullScreen}
                className={styles.fullScreenButton}
            >
                {fullScreen
                    ? <Minimize className={styles.icon} />
                    : <Maximize className={styles.icon} />}
            </button>
            <div className={styles.level}>
                {`Level ${level}`}
            </div>
            <HealthBar health={playerHealth} className={styles.healthBar} />
        </div>
    );
};

TopBar.propTypes = propTypes;
TopBar.defaultProps = defaultProps;

export default TopBar;
