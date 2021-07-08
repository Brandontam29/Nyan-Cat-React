import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    GAME_HEIGHT, PLAYER_HEIGHT, GAME_COLUMNS,
} from '../../lib/data';

import playerImage from '../../images/player.png';
import styles from '../../styles/game/player.scss';

const propTypes = {
    playerPosition: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

// Dumb component

const Player = ({
    playerPosition, className,
}) => {
    return (
        <img
            src={playerImage}
            alt="Burgerino"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width: `${(1 / GAME_COLUMNS) * 100}%`,
                left: `${playerPosition * (1 / GAME_COLUMNS) * 100}%`,
                top: `${((GAME_HEIGHT - PLAYER_HEIGHT) / GAME_HEIGHT) * 100}%`,
            }}
        />
    );
};

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

const WithReduxContainer = connect(({ player }) => ({
    playerPosition: player.position,
}), () => ({
}))(Player);

export default WithReduxContainer;
