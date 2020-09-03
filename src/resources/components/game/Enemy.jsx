import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    ENEMY_HEIGHT, GAME_HEIGHT, PLAYER_HEIGHT, GAME_COLUMNS,
} from '../../lib/data';
import { setEnemiesStatus as setEnemiesStatusAction } from '../../actions/enemiesActions';
import { calculatePlayerHealth as calculatePlayerHealthAction } from '../../actions/playerActions';

import enemyImage from '../../images/enemy.png';

import styles from '../../styles/game/enemy.scss';


const propTypes = {
    gameOver: PropTypes.bool.isRequired,
    pause: PropTypes.bool,
    spot: PropTypes.number.isRequired,
    dropSpeed: PropTypes.number,
    falling: PropTypes.bool.isRequired,
    calculatePlayerHealth: PropTypes.func.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    playerPosition: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: false,
    dropSpeed: 135,
    className: null,
};

const Enemy = ({
    gameOver,
    pause,
    spot,
    dropSpeed,
    falling,
    calculatePlayerHealth,
    setEnemiesStatus,
    playerPosition,
    className,
}) => {
    const [top, setTop] = useState(-ENEMY_HEIGHT);
    const [touched, setTouched] = useState(false);
    useEffect(() => {
        let id = 0;
        if (falling && top < GAME_HEIGHT + ENEMY_HEIGHT && !pause) {
            if (!touched
                && GAME_HEIGHT - ENEMY_HEIGHT * (1 / 2) > top
                && top > GAME_HEIGHT - PLAYER_HEIGHT - ENEMY_HEIGHT
                && playerPosition === spot) {
                setTouched(true);
                calculatePlayerHealth(-1);
            }
            id = setTimeout(() => setTop(top + 50), dropSpeed);
            return () => clearTimeout(id);
        }


        if (falling && !pause) {
            setEnemiesStatus({ spot, falling: false });
            setTouched(false);
            setTop(-ENEMY_HEIGHT);
        }

        return () => clearTimeout(id);
    }, [top, falling, pause, gameOver]);

    useEffect(() => {
        if (gameOver) {
            setEnemiesStatus({ spot, falling: false });
            setTop(-ENEMY_HEIGHT);
        }
    }, [gameOver]);

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

const WithReduxContainer = connect(({ player }) => ({
    playerPosition: player.position,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
    calculatePlayerHealth: (value) => dispatch(calculatePlayerHealthAction(value)),
}))(Enemy);

export default WithReduxContainer;
