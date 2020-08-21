/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    GAME_HEIGHT, PLAYER_HEIGHT, PLAYER_WIDTH, GAME_COLUMNS,
} from '../../lib/data';
import useKeyPress from '../../lib/useKeyPress';

import playerImage from '../../images/player.png';
import styles from '../../styles/game/player.scss';

const propTypes = {
    pause: PropTypes.bool,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: false,
    className: null,
};

const Player = ({ pause, className }) => {
    const [position, setPosition] = useState(Math.floor(GAME_COLUMNS / 2));

    const moveLeft = () => {
        if (position > 0) {
            setPosition(position - 1);
        }
    };

    const moveRight = () => {
        if (position < GAME_COLUMNS - 1) {
            setPosition(position + 1);
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
                left: position * PLAYER_WIDTH,
                top: GAME_HEIGHT - PLAYER_HEIGHT,
            }}
        />
    );
};

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default Player;
