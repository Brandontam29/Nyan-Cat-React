/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
// import uuid from 'uuid-random';

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
    pause: PropTypes.bool,
    gameOver: PropTypes.bool.isRequired,
    enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    level: PropTypes.number,
};

const defaultProps = {
    pause: false,
    level: 10,
};

const EnemyGenerator = ({
    pause,
    gameOver,
    enemiesStatus,
    setEnemiesStatus,
    level,
}) => {
    const [speed, setSpeed] = useState(new Array(GAME_COLUMNS).fill(1000));

    const activateEnemy = () => {
        const dropSpeed = Math.floor(Math.random() * -15);
        const randomSpot = Math.floor(Math.random() * GAME_COLUMNS);
        const randomDropSpeed = dropSpeed + 150 - 7 * level;

        setSpeed([...speed.slice(0, randomSpot), randomDropSpeed, ...speed.slice(randomSpot + 1)]);
        return setEnemiesStatus({ spot: randomSpot, falling: true });
    };

    useEffect(() => {
        const activeEnemies = findTrues(enemiesStatus);
        if (activeEnemies < MAX_ENEMIES && !gameOver) {
            activateEnemy();
        }
    }, [enemiesStatus, gameOver]);

    const createEnemies = () => {
        const enemies = [];
        for (let i = 0; i < GAME_COLUMNS; i += 1) {
            enemies.push(
                <Enemy
                    // key={uuid()}
                    pause={pause}
                    gameOver={gameOver}
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


const WithReduxContainer = connect(({ enemies }) => ({
    enemiesStatus: enemies.enemiesStatus,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
}))(EnemyGenerator);

export default WithReduxContainer;
