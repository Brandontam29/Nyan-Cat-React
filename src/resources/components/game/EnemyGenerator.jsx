/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    MAX_ENEMIES, GAME_COLUMNS,
} from '../../lib/data';

import {
    setEnemiesStatus as setEnemiesStatusAction,
} from '../../actions/enemiesActions';
import { findTrues } from '../../lib/utils';
import Enemy from './Enemy';

import styles from '../../styles/game/enemy-generator.scss';

const propTypes = {
    gameOver: PropTypes.bool.isRequired,
    enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
};

const defaultProps = {
};

const EnemyGenerator = ({
    gameOver,
    enemiesStatus,
    setEnemiesStatus,
    level,
}) => {
    const [speed, setSpeed] = useState(new Array(GAME_COLUMNS).fill(150));

    // Assign fall speed and falling to an enemy
    const activateEnemy = () => {
        const randomSpot = Math.floor(Math.random() * GAME_COLUMNS);
        const randomDropSpeed = 150 - 7 * level + (Math.floor(Math.random() * 20));
        setSpeed([...speed.slice(0, randomSpot), randomDropSpeed, ...speed.slice(randomSpot + 1)]);
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

    // Creates the the necessary enemies once
    const createEnemies = () => {
        const enemies = [];
        for (let i = 0; i < GAME_COLUMNS; i += 1) {
            enemies.push(
                <Enemy
                    falling={enemiesStatus[i]}
                    spot={i}
                    dropSpeed={speed[i]}
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
    gameOver: game.gameOver,
    level: game.level,
    enemiesStatus: enemies.enemiesStatus,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
}))(EnemyGenerator);

export default WithReduxContainer;
