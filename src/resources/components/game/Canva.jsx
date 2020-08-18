import React, { useState } from 'react';
// import PropTypes from "prop-types";
import classNames from 'classnames';
import * as AppPropTypes from '../../lib/PropTypes';

import {
    GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, MAX_ENEMIES, GAME_COLUMNS, PLAYER_HEIGHT,
} from '../../lib/data';
// import backgroundImage from '../../images/starynight.png';
import Player from './Player';
import EnemyGenerator from './EnemyGenerator';

import styles from '../../styles/game/canva.scss';
import useInterval from '../../lib/useInterval';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Canva = ({ className }) => {
    // const [enemies, setEnemies] = useState([]);
    const [playerDead, setPlayerDead] = useState(false);

    const gameLoop = () => {
        // const enemySpot = GAME_WIDTH / PLAYER_WIDTH;
        // const spotsTaken = Array(enemySpot).fill(false);
        // enemiesProp.forEach((enemy) => {
        //     spotsTaken[enemy.spot] = true;
        // });
        // let candidate; // number
        // while (candidate === undefined || spotsTaken[candidate]) {
        //     candidate = Math.floor(Math.random() * enemySpot);
        // }
        // return candidate;

        if (playerDead) {
            // eslint-disable-next-line no-alert
            window.alert('Game over');
        }
    };

    // useInterval(gameLoop(), 1000);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                alt="starry night sky background"
                className={styles.background}
                style={{
                    width: GAME_WIDTH,
                    height: GAME_HEIGHT,
                }}
            >
                <EnemyGenerator />
                <Player
                    className={styles.player}
                    style={{
                        top: GAME_HEIGHT - PLAYER_HEIGHT,
                    }}
                />
            </div>
        </div>
    );
};

Canva.propTypes = propTypes;
Canva.defaultProps = defaultProps;

export default Canva;
