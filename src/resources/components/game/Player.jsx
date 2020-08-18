/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

import {
    GAME_HEIGHT, PLAYER_HEIGHT, PLAYER_WIDTH, GAME_COLUMNS,
} from '../../lib/data';
import playerImage from '../../images/player.png';
import styles from '../../styles/game/player.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Player = ({ className }) => {
    // console.log(GAME_HEIGHT, PLAYER_HEIGHT, PLAYER_WIDTH, GAME_COLUMNS);
    const [position, setPosition] = useState(Math.floor(GAME_COLUMNS / 2));

    const useKeyPress = (key, callback) => {
        const callbackRef = useRef(callback);

        useEffect(() => {
            callbackRef.current = callback;
        });

        useEffect(() => {
            const handle = () => {
                if (event.key === key) {
                    callbackRef.current(event);
                }
            };
            document.addEventListener('keypress', handle);
            return () => document.removeEventListener('keypress');
        }, [key]);
    };

    const moveLeft = () => {
        if (position > 0) {
            setPosition(position - 1);
            console.log('moveLeft', position);
        }
    };

    const moveRight = () => {
        if (position < GAME_COLUMNS - 1) {
            setPosition(position + 1);
            console.log('moveRight', position);
        }
    };


    useKeyPress('ArrowLeft', moveLeft);
    useKeyPress('ArrowRight', moveRight);

    useKeyPress('a', moveLeft);
    useKeyPress('d', moveRight);

    return (
        <div
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
        >
            <img
                src={playerImage}
                alt="Burgerino"
                className={styles.image}
            />
        </div>
    );
};

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default Player;
