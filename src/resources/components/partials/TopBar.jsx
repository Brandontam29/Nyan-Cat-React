import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import toggleFullScreen from '../../hooks/toggleFullScreen';

import Maximize from '../icons/Maximize';
import Minimize from '../icons/Minimize';
import HealthBar from '../game/HealthBar';

import styles from '../../styles/partials/top-bar.scss';

const propTypes = {
    level: PropTypes.number.isRequired,
    playerHealth: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const TopBar = ({
    level, playerHealth, className,
}) => {
    // Need fix
    const fullScreen = false;

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

const WithReduxContainer = connect(({ game,player }) => ({
    level: game.level, 
    playerHealth: player.health,
    playerPosition: player.position,
}), () => ({
}))(TopBar);

export default WithReduxContainer;
