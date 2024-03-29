import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    ENEMY_HEIGHT, GAME_HEIGHT, PLAYER_HEIGHT, GAME_COLUMNS,
} from '../../lib/data';
import {
    setEnemiesStatus as setEnemiesStatusAction,
} from '../../actions/enemiesActions';
import { setPlayerHealth as setPlayerHealthAction } from '../../actions/playerActions';

import enemyImage from '../../images/enemy.png';

import styles from '../../styles/game/enemy.scss';

const propTypes = {
    gameOver: PropTypes.bool.isRequired,
    pause: PropTypes.bool.isRequired,
    starting: PropTypes.bool.isRequired,
    spot: PropTypes.number.isRequired,
    dropSpeed: PropTypes.number,
    falling: PropTypes.bool.isRequired,
    setPlayerHealth: PropTypes.func.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    playerPosition: PropTypes.number.isRequired,
    playerHealth: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    dropSpeed: 135,
    className: null,
};

// Each enemy manages their own fallin animation, collision detection, and position reset
const Enemy = ({
    gameOver,
    pause,
    starting,
    spot,
    dropSpeed,
    falling,
    setPlayerHealth,
    setEnemiesStatus,
    playerPosition,
    playerHealth,
    className,
}) => {
    const [top, setTop] = useState(-ENEMY_HEIGHT);
    const [touched, setTouched] = useState(false);

    // Logic to determine when to fall and check for collision
    useEffect(() => {
        let id = 0;
        // collision detection
        if (falling && top < GAME_HEIGHT + ENEMY_HEIGHT && !pause) {
            if (!touched
                && GAME_HEIGHT - ENEMY_HEIGHT * (1 / 2) > top
                && top > GAME_HEIGHT - PLAYER_HEIGHT - ENEMY_HEIGHT
                && playerPosition === spot) {
                setTouched(true);
                setPlayerHealth(playerHealth - 1);
            }

            id = setTimeout(() => setTop(top + 50), dropSpeed);
            return () => clearTimeout(id);
        }

        // position reset when reached the bottom
        if (falling && !pause) {
            setEnemiesStatus({ spot, falling: false });

            setTouched(false);
            setTop(-ENEMY_HEIGHT);
        }

        return () => clearTimeout(id);
    }, [top, falling, pause, gameOver]);

    // Reset position when starting
    useEffect(() => {
        if (starting) {
            setEnemiesStatus({ spot, falling: false });
            setTop(-ENEMY_HEIGHT);
        }
    }, [starting]);

    return (
        <img
            src={enemyImage}
            alt="Falling Nyan Cat"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width: `${(1 / GAME_COLUMNS) * 100}%`,
                top,
                left: `${spot * (1 / GAME_COLUMNS) * 100}%`,
            }}
        />
    );
};

Enemy.propTypes = propTypes;
Enemy.defaultProps = defaultProps;

const WithReduxContainer = connect(({ game, player }) => ({
    pause: game.pause,
    gameOver: game.gameOver,
    starting: game.starting,
    playerPosition: player.position,
    playerHealth: player.health,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
    setPlayerHealth: (value) => dispatch(setPlayerHealthAction(value)),
}))(Enemy);

export default WithReduxContainer;
