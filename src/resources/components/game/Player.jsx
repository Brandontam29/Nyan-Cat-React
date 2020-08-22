/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    GAME_HEIGHT, PLAYER_HEIGHT, PLAYER_WIDTH, GAME_COLUMNS,
} from '../../lib/data';
import useKeyPress from '../../lib/useKeyPress';
import { setPlayerPosition as setPlayerPositionAction } from '../../actions/playerActions';

import playerImage from '../../images/player.png';
import styles from '../../styles/game/player.scss';

const propTypes = {
    pause: PropTypes.bool,
    playerPosition: PropTypes.number.isRequired,
    setPlayerPosition: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: false,
    className: null,
};

const Player = ({
    pause, playerPosition, setPlayerPosition, className,
}) => {
    const moveLeft = () => {
        if (playerPosition > 0) {
            setPlayerPosition(playerPosition - 1);
        }
    };

    const moveRight = () => {
        if (playerPosition < GAME_COLUMNS - 1) {
            setPlayerPosition(playerPosition + 1);
        }
    };

    useKeyPress('a', pause ? () => {} : moveLeft);
    useKeyPress('d', pause ? () => {} : moveRight);

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
                left: playerPosition * PLAYER_WIDTH,
                top: GAME_HEIGHT - PLAYER_HEIGHT,
            }}
        />
    );
};

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

const WithReduxContainer = connect(({ player }) => ({
    playerPosition: player.position,
}), (dispatch) => ({
    setPlayerPosition: (value) => dispatch(setPlayerPositionAction(value)),
}))(Player);

export default WithReduxContainer;
