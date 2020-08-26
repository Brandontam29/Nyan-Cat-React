import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import {
    GAME_WIDTH, GAME_HEIGHT, PLAYER_HEIGHT, GAME_COLUMNS,
} from '../../lib/data';
import useKeyPress from '../../lib/useKeyPress';

import { setPlayerPosition as setPlayerPositionAction } from '../../actions/playerActions';

import starynight from '../../images/starynight.png';
import Player from './Player';
import EnemyGenerator from './EnemyGenerator';

import styles from '../../styles/game/canvas.scss';

const propTypes = {
    gameOver: PropTypes.bool.isRequired,
    pause: PropTypes.bool,
    playerPosition: PropTypes.number.isRequired,
    setPlayerPosition: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: true,
    className: null,
};

const Canvas = ({
    gameOver, pause, playerPosition, setPlayerPosition, className,
}) => {
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
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
                maxWidth: GAME_WIDTH,
                maxHeight: GAME_HEIGHT,
            }}
        >
            <img src={starynight} alt="starry night sky background" className={styles.staryNight} />
            <EnemyGenerator gameOver={gameOver} pause={pause} />
            <Player
                pause={pause}
                className={styles.player}
                style={{
                    top: `${PLAYER_HEIGHT / (GAME_HEIGHT * 100)}%`,
                }}
            />
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
