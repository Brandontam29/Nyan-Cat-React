import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as AppPropTypes from '../../lib/PropTypes';

import {
    GAME_WIDTH, GAME_HEIGHT, PLAYER_HEIGHT,
} from '../../lib/data';

import Player from './Player';
import EnemyGenerator from './EnemyGenerator';

import styles from '../../styles/game/canvas.scss';

const propTypes = {
    gameOver: PropTypes.bool.isRequired,
    pause: PropTypes.bool,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: true,
    className: null,
};

const Canvas = ({ gameOver, pause, className }) => {
    return (
        <div
            alt="starry night sky background"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
            }}
        >
            <EnemyGenerator pause={pause} />
            <Player
                pause={pause}
                className={styles.player}
                style={{
                    top: GAME_HEIGHT - PLAYER_HEIGHT,
                }}
            />
            { pause && !gameOver ? (
                <div className={styles.overlayDim}>
                    <div className={styles.overlayText}>Paused</div>
                </div>
            ) : null}
            { gameOver ? (
                <div className={styles.overlayDim}>
                    <div className={styles.overlayText}>GAME OVER</div>
                </div>
            ) : null}
        </div>

    );
};

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
