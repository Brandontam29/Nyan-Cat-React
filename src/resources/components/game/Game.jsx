import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_WIDTH, STARTING_HEALTH } from '../../lib/data';
import useKeyPress from '../../hooks/useKeyPress';
import toggleFullScreen from '../../lib/toggleFullScreen';
import { moveRight, moveLeft } from '../../lib/playerMove';

import { setPlayerHealth as setPlayerHealthAction } from '../../actions/playerActions';
import {
    setPause as setPauseAction,
    setGameOver as setGameOverAction,
    setLevel as setLevelAction,
} from '../../actions/gameActions';


import Canvas from './Canvas';
import HealthBar from './HealthBar';
import styles from '../../styles/game/game.scss';

const propTypes = {
    pause: PropTypes.bool.isRequired,
    gameOver: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    playerHealth: PropTypes.number.isRequired,
    setPlayerHealth: PropTypes.func.isRequired,
    setPause: PropTypes.func.isRequired,
    setGameOver: PropTypes.func.isRequired,
    setLevel: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

// All the game logic should be set here and children components will simply act depending on the data

const Game = ({
    pause, gameOver, level, playerHealth, setPause, setGameOver, setLevel, setPlayerHealth, className,
}) => {
    const [pauseCount, setPauseCount] = useState(3);
    const [disablePause, setDisablePause] = useState(false);

    const [starting, setStarting] = useState(false);


    const pausePlay = () => {
        if (!gameOver) {
            if (!disablePause) {
                if (!pause) {
                    setPauseCount(pauseCount - 1);
                }
                if (pauseCount === 0) {
                    setDisablePause(true);
                }
                return setPause(!pause);
            }
        }

        setStarting(true);
        return setTimeout(() => {
            setStarting(false);
            setPauseCount(3);
            setPause(false);
            setDisablePause(false);
            setPlayerHealth(STARTING_HEALTH);
            return setGameOver(false);
        }, 3000);
    };

    // Increment level based on fixed time
    useEffect(() => {
        let id = 0;
        if (!pause && !gameOver) {
            id = setTimeout(() => setLevel(level + 1), 7 * 1000);
            return () => clearTimeout(id);
        }
        if (gameOver) {
            setLevel(0);
        }

        return () => clearTimeout(id);
    }, [level, pause, gameOver]);

    useEffect(() => {
        if (playerHealth === 0) {
            setPause(true);
            setDisablePause(true);
            setPauseCount(0);
            setGameOver(true);
        }
    }, [playerHealth]);

    const buttonText = () => {
        if (gameOver) {
            return 'Play Again?';
        }
        if (pause) {
            return 'Play';
        }
        return `Pause (${pauseCount})`;
    };

    useKeyPress('f', toggleFullScreen);
    useKeyPress('a', pause ? () => {} : moveLeft);
    useKeyPress('d', pause ? () => {} : moveRight);
    useKeyPress(' ', pausePlay);

    return (
        <section
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                maxWidth: GAME_WIDTH,
            }}
        >
            <Canvas
                playButton={pausePlay}
                starting={starting}
                className={styles.canvas}
            />
            <div className={styles.gameOptions}>
                <button
                    type="button"
                    onClick={pausePlay}
                    disabled={disablePause && !gameOver}
                    className={styles.pauseButton}
                >
                    {buttonText()}
                </button>
                <HealthBar className={styles.healthBar} />
            </div>
        </section>
    );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

const WithReduxContainer = connect(({ game, player }) => ({
    pause: game.pause,
    gameOver: game.gameOver,
    level: game.level,
    playerHealth: player.health,

}), (dispatch) => ({
    setPlayerHealth: (value) => dispatch(setPlayerHealthAction(value)),
    setPause: (value) => dispatch(setPauseAction(value)),
    setGameOver: (value) => dispatch(setGameOverAction(value)),
    setLevel: (value) => dispatch(setLevelAction(value)),
}))(Game);

export default WithReduxContainer;
