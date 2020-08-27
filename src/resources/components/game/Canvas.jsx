import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import {
    GAME_HEIGHT, PLAYER_HEIGHT, GAME_COLUMNS,
} from '../../lib/data';
import useKeyPress from '../../lib/useKeyPress';

import { setPlayerPosition as setPlayerPositionAction } from '../../actions/playerActions';

import starynight from '../../images/starynight.png';
import Player from './Player';
import EnemyGenerator from './EnemyGenerator';
import HealthBar from './HealthBar';
import Maximize from '../icons/Maximize';
import Minimize from '../icons/Minimize';

import styles from '../../styles/game/canvas.scss';

const propTypes = {
    playerHealth: PropTypes.number.isRequired,
    gameOver: PropTypes.bool.isRequired,
    level: PropTypes.number,
    pause: PropTypes.bool,
    playerPosition: PropTypes.number.isRequired,
    setPlayerPosition: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    level: 4,
    pause: true,
    className: null,
};

const Canvas = ({
    playerHealth, gameOver, level, pause, playerPosition, setPlayerPosition, className,
}) => {
    const [fullScreen, setFullScreen] = useState(false);
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullScreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullScreen(false);
        }
    };

    const moveLeft = () => {
        if (playerPosition > 0) {
            setPlayerPosition(playerPosition - 1);
        }
    };

    const moveRight = () => {
        if (playerPosition < GAME_COLUMNS - 1) {
            setPlayerPosition(playerPosition + 1);
        }
    };

    useKeyPress('f', toggleFullScreen);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                maxHeight: GAME_HEIGHT,
            }}
        >
            <img src={starynight} alt="starry night sky background" className={styles.staryNight} />
            <EnemyGenerator level={level} gameOver={gameOver} pause={pause} />
            <Player
                className={styles.player}
                style={{
                    top: `${PLAYER_HEIGHT / (GAME_HEIGHT * 100)}%`,
                }}
            />
            <div className={styles.topBar}>
                {`Level ${level}`}
            </div>
            <HealthBar health={playerHealth} className={styles.healthBar} />
            { pause && !gameOver ? (
                <div className={styles.overlayDim}>
                    <div className={styles.overlayText}>Paused</div>
                </div>
            ) : null}
            { gameOver ? (
                <div className={styles.overlayDim}>
                    <div className={styles.overlayText}>Game Over</div>
                </div>
            ) : null}
            <button
                type="button"
                onClick={toggleFullScreen}
                className={classNames([styles.touchButton, styles.fullScreen])}
            >
                {fullScreen
                    ? <Minimize className={styles.fullScreenButton} />
                    : <Maximize className={styles.fullScreenButton} />}
            </button>
            <button
                type="button"
                onClick={moveLeft}
                disabled={pause}
                className={classNames([styles.touchButton, styles.leftButton])}
            >
                Move Left
            </button>
            <button
                type="button"
                onClick={moveRight}
                disabled={pause}
                className={classNames([styles.touchButton, styles.rightButton])}
            >
                Move Left
            </button>
        </div>
    );
};

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

const WithReduxContainer = connect(({ player }) => ({
    playerPosition: player.position,
}), (dispatch) => ({
    setPlayerPosition: (value) => dispatch(setPlayerPositionAction(value)),
}))(Canvas);

export default WithReduxContainer;
