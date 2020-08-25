/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    ENEMY_WIDTH, ENEMY_HEIGHT, GAME_HEIGHT, PLAYER_HEIGHT,
} from '../../lib/data';
import { setEnemiesStatus as setEnemiesStatusAction } from '../../actions/enemiesActions';
import { calculatePlayerHealth as calculatePlayerHealthAction } from '../../actions/playerActions';

import enemyImage from '../../images/enemy.png';

import styles from '../../styles/game/enemy.scss';


const propTypes = {
    gameOver: PropTypes.bool.isRequired,
    pause: PropTypes.bool,
    // enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    spot: PropTypes.number.isRequired,
    dropSpeed: PropTypes.number, // maybe required
    // gameSpeed: PropTypes.number, // required
    falling: PropTypes.bool.isRequired,
    // subtractActiveEnemies: PropTypes.func.isRequired,
    calculatePlayerHealth: PropTypes.func.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    playerHealth: PropTypes.number.isRequired,
    playerPosition: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: false,
    dropSpeed: 20,
    // gameSpeed: 1,
    className: null,
};

const Enemy = ({
    gameOver,
    pause,
    // enemiesStatus,
    spot,
    dropSpeed,
    falling,
    calculatePlayerHealth,
    setEnemiesStatus,
    playerHealth,
    playerPosition,
    className,
}) => {
    const [top, setTop] = useState(-ENEMY_HEIGHT);
    const [touched, setTouched] = useState(false);
    console.log(gameOver);
    useEffect(() => {
        let id = 0;
        if (gameOver) {
            setEnemiesStatus({ spot, falling: false });
            setTop(-ENEMY_HEIGHT);
            return () => clearTimeout(id);
        }
        if (falling && top < GAME_HEIGHT + ENEMY_HEIGHT && !pause) {
            if (!touched && top > GAME_HEIGHT - PLAYER_HEIGHT - ENEMY_HEIGHT + 10 && playerPosition === spot) {
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
            style={{ top, left: spot * ENEMY_WIDTH }}
        />
    );
};

Enemy.propTypes = propTypes;
Enemy.defaultProps = defaultProps;

const WithReduxContainer = connect(({ player }) => ({
    playerPosition: player.position,
    playerHealth: player.health,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
    calculatePlayerHealth: (value) => dispatch(calculatePlayerHealthAction(value)),
}))(Enemy);

export default WithReduxContainer;
