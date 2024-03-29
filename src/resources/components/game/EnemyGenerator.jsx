/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    MAX_ENEMIES, GAME_COLUMNS, DROP_SPEED,
} from '../../lib/data';

import {
    setEnemiesStatus as setEnemiesStatusAction,
    setDrop as setDropAction,
} from '../../actions/enemiesActions';
import { findTrues } from '../../lib/utils';
import Enemy from './Enemy';

import styles from '../../styles/game/enemy-generator.scss';

const propTypes = {
    drop: PropTypes.bool,
    setDrop: PropTypes.func.isRequired,
    gameOver: PropTypes.bool.isRequired,
    enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
};

const defaultProps = {
    drop: false,
};

const EnemyGenerator = ({
    drop,
    setDrop,
    gameOver,
    enemiesStatus,
    setEnemiesStatus,
    level,
}) => {
    const [speedArray, setSpeedArray] = useState(new Array(GAME_COLUMNS).fill(150));

    // Assign fall speed and falling to an enemy
    const activateEnemy = () => {
        const randomSpot = Math.floor(Math.random() * GAME_COLUMNS);
        let speed = 400;

        // Negative linear function for each level
        if (level < 25) {
            speed = 400 - 6 * level;
        } else if (level < 45) {
            speed = 375 - 5 * level;
        } else if (level < 55) {
            speed = 375 - 5 * level;
        } else if (level < 70) {
            speed = Math.floor(228.333 - 2.333 * level);
        } else if (level < 85) {
            speed = Math.floor(181.666 - 1.666 * level);
        } else {
            speed = Math.floor(96.666 - 0.666 * level);
        }

        // +/- around 4.5% of the current speed
        const random = Math.floor(Math.random() * Math.floor(speed / 21) - Math.floor(speed / 42));

        const randomSpeed = speed + random;
        setSpeedArray([...speedArray.slice(0, randomSpot), randomSpeed, ...speedArray.slice(randomSpot + 1)]);
        return setEnemiesStatus({ spot: randomSpot, falling: true });
    };

    // Detect when to activateEnemies
    // Enemies never activated when gameOver or when exceeding max enemy count
    useEffect(() => {
        const activeEnemies = findTrues(enemiesStatus);
        if (activeEnemies < MAX_ENEMIES && !gameOver) {
            activateEnemy();
        }
    }, [enemiesStatus, gameOver]);

    // When dropEnemies is called, assign a fast speed to all enemies
    // Resets on the next wave of enemies
    const dropAllEnemies = (callback) => {
        setSpeedArray(new Array(GAME_COLUMNS).fill(DROP_SPEED));
        return callback;
    };

    useEffect(() => {
        if (drop) {
            dropAllEnemies(setDrop(false));
        }
    }, [drop]);

    // Creates the the necessary enemies once
    const createEnemies = () => {
        const enemies = [];
        for (let i = 0; i < GAME_COLUMNS; i += 1) {
            enemies.push(
                <Enemy
                    falling={enemiesStatus[i]}
                    spot={i}
                    dropSpeed={speedArray[i]}
                    className={styles.enemy}
                />,
            );
        }
        return enemies;
    };

    return createEnemies();
};

EnemyGenerator.propTypes = propTypes;
EnemyGenerator.defaultProps = defaultProps;

const WithReduxContainer = connect(({ game, enemies }) => ({
    drop: enemies.drop,
    gameOver: game.gameOver,
    level: game.level,
    enemiesStatus: enemies.enemiesStatus,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
    setDrop: (value) => dispatch(setDropAction(value)),
}))(EnemyGenerator);

export default WithReduxContainer;
