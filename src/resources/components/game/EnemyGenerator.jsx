/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import {
    GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, MAX_ENEMIES, GAME_COLUMNS, PLAYER_HEIGHT,
} from '../../lib/data';

import {
    setEnemiesStatus as setEnemiesStatusAction,
    //  addActiveEnemies as addActiveEnemiesAction
} from '../../actions/enemiesActions';
import { findTrues } from '../../lib/utils';
import Player from './Player';
import Enemy from './Enemy';

import styles from '../../styles/game/canva.scss';

const propTypes = {
    enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    // addActiveEnemies: PropTypes.func.isRequired,
    level: PropTypes.number,
    className: AppPropTypes.className,
};

const defaultProps = {
    level: 1,
    className: null,
};

const EnemyGenerator = ({
    enemiesStatus,
    // addActiveEnemies,
    level,
    className,
}) => {
    const [enemiesStats, setEnemiesStats] = useState(new Array(GAME_COLUMNS)
        .fill({ id: `${Math.random()}-${Math.random()}`, dropSpeed: 750 }));

    const activeEnemies = findTrues(enemiesStatus);
    // const [enemy0, setEnemy0] = useState(0);
    // const [enemy1, setEnemy1] = useState(0);
    // const [enemy2, setEnemy2] = useState(0);
    // const [enemy3, setEnemy3] = useState(0);
    // const [enemy4, setEnemy4] = useState(0);

    const activateEnemy = () => {
        const dropSpeed = Math.floor(Math.random() * 40);
        const randomSpot = Math.floor(Math.random() * GAME_COLUMNS);
        const randomDropSpeed = dropSpeed + 700 - 30 * level;
        console.log('enemy generated', randomSpot, randomDropSpeed);
        enemiesStats[randomSpot] = { dropSpeed: randomDropSpeed };
        return setEnemiesStats(enemiesStats);
    };

    useEffect(() => {
        if (activeEnemies < MAX_ENEMIES) {
            activateEnemy();
        }
    }, [enemiesStatus]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {enemiesStats.map((stats, index) => {
                return (
                    <Enemy
                        key={stats.id}
                        spot={index}
                        dropSpeed={stats.dropSpeed}
                        className={styles.enemy}
                    />
                );
            })}
        </div>
    );
};

EnemyGenerator.propTypes = propTypes;
EnemyGenerator.defaultProps = defaultProps;


const WithReduxContainer = connect(({ enemies }) => ({
    enemiesStatus: enemies.enemiesStatus,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
    // addActiveEnemies: (value) => dispatch(addActiveEnemiesAction(value)),
}))(EnemyGenerator);

export default WithReduxContainer;
