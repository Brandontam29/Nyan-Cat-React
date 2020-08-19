/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import uuid from 'uuid-random';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    MAX_ENEMIES, GAME_COLUMNS,
} from '../../lib/data';

import {
    setEnemiesStatus as setEnemiesStatusAction,
} from '../../actions/enemiesActions';
import { findTrues } from '../../lib/utils';
import Enemy from './Enemy';

import styles from '../../styles/game/canva.scss';

const propTypes = {
    enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    level: PropTypes.number,
    className: AppPropTypes.className,
};

const defaultProps = {
    level: 1,
    className: null,
};

const EnemyGenerator = ({
    enemiesStatus,
    setEnemiesStatus,
    level,
    className,
}) => {
    // const [enemiesStats, setEnemiesStats] = useState(new Array(GAME_COLUMNS)
    //     .fill({ id: 'same key', dropSpeed: 750 }));
    // const [enemyStat, setEnemyStat] = useState();

    const activateEnemy = () => {
        const dropSpeed = Math.floor(Math.random() * 40);
        const randomSpot = Math.floor(Math.random() * GAME_COLUMNS);
        const randomDropSpeed = dropSpeed + 500 - 30 * level;
        console.log('enemy generated', randomSpot, randomDropSpeed);


        // setEnemiesStats(enemiesStats);
        return setEnemiesStatus({ spot: randomSpot, falling: true });
    };

    useEffect(() => {
        const activeEnemies = findTrues(enemiesStatus);
        if (activeEnemies < MAX_ENEMIES) {
            activateEnemy();
        }
    }, [enemiesStatus]);

    const createEnemies = () => {
        const enemies = [];
        for (let i = 0; i < GAME_COLUMNS; i += 1) {
            enemies.push(
                <Enemy
                    falling={enemiesStatus[i]}
                    spot={i}
                    dropSpeed={25}
                    className={styles.enemy}
                />,
            );
        }
        return enemies;
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {createEnemies()}
        </div>
    );
};

EnemyGenerator.propTypes = propTypes;
EnemyGenerator.defaultProps = defaultProps;


const WithReduxContainer = connect(({ enemies }) => ({
    enemiesStatus: enemies.enemiesStatus,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
}))(EnemyGenerator);

export default WithReduxContainer;
