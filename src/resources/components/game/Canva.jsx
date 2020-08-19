import React, { useState } from 'react';
// import PropTypes from "prop-types";
import classNames from 'classnames';
import * as AppPropTypes from '../../lib/PropTypes';

import {
    GAME_WIDTH, GAME_HEIGHT, PLAYER_HEIGHT,
} from '../../lib/data';

import Player from './Player';
import EnemyGenerator from './EnemyGenerator';

import styles from '../../styles/game/canva.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Canva = ({ className }) => {
    // const [playerDead, setPlayerDead] = useState(false);


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
