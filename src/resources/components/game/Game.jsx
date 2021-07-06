import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_WIDTH, STARTING_HEALTH } from '../../lib/data';

import { calculatePlayerHealth as calculatePlayerHealthAction } from '../../actions/playerActions';

import Canvas from './Canvas';
import HealthBar from './HealthBar';
import styles from '../../styles/game/game.scss';

const propTypes = {
    playerHealth: PropTypes.number.isRequired,
    calculatePlayerHealth: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Game = ({ playerHealth, calculatePlayerHealth, className }) => {
    const [level, setLevel] = useState(0);
    const [pause, setPause] = useState(false);
    const [pauseCount, setPauseCount] = useState(3);
    const [disablePause, setDisablePause] = useState(false);

    const [starting, setStarting] = useState(false);
    const [gameOver, setGameOver] = useState(true);


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
            calculatePlayerHealth(-playerHealth + STARTING_HEALTH);
            return setGameOver(false);
        }, 3000);
    };

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
                playerHealth={playerHealth}
                playButton={pausePlay}
                gameOver={gameOver}
                starting={starting}
                level={level}
                pause={pause}
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
                <HealthBar health={playerHealth} className={styles.healthBar} />
            </div>
        </section>
    );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

const WithReduxContainer = connect(({ player }) => ({
    playerHealth: player.health,
}), (dispatch) => ({
    calculatePlayerHealth: (value) => dispatch(calculatePlayerHealthAction(value)),
}))(Game);

export default WithReduxContainer;
