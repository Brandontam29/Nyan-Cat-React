import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_WIDTH } from '../../lib/data';
import useKeyPress from '../../hooks/useKeyPress';
import toggleFullScreen from '../../lib/toggleFullScreen';
import { moveRight, moveLeft } from '../../lib/playerMove';
import incrementLevel from '../../lib/incrementLevel';
import endGame from '../../lib/endGame';
import startGame from '../../lib/startGame';

import {
    setPause as setPauseAction,
    setPauseDisabled as setPauseDisabledAction,
    setPauseCount as setPauseCountAction,
} from '../../actions/gameActions';

import Canvas from './Canvas';
import HealthBar from './HealthBar';
import styles from '../../styles/game/game.scss';
// import resetGame from '../../lib/resetGame';

const propTypes = {
    pause: PropTypes.bool.isRequired,
    gameOver: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    playerHealth: PropTypes.number.isRequired,
    pauseDisabled: PropTypes.bool.isRequired,
    setPauseCount: PropTypes.func.isRequired,
    pauseCount: PropTypes.number.isRequired,
    setPauseDisabled: PropTypes.func.isRequired,
    setPause: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

// All the game logic should be set here and children components will simply act depending on the data

const Game = ({
    pause,
    gameOver,
    level,
    playerHealth,
    setPause,
    setPauseCount,
    pauseCount,
    setPauseDisabled,
    pauseDisabled,
    className,
}) => {
    // pause affects
    // player movement disabled (game & touchButtons)
    // enemy falling disabled
    // game button text
    // game button behavior
    // overlay text

    // gameOver affects
    // player movement disabled (game & touchButtons)
    // enemy falling disabled
    // enemyGenerator disabled
    // game button text
    // game button behavior
    // overlay text

    // starting affects
    // enemy reset to top

    const pausePlay = () => {
        if (!gameOver) {
            if (!pauseDisabled) {
                if (!pause) {
                    setPauseCount(pauseCount - 1);
                }
                if (pauseCount === 0) {
                    setPauseDisabled(true);
                }
                return setPause(!pause);
            }
        }

        return startGame();
    };

    // Increment level based on fixed time
    useEffect(() => {
        incrementLevel(level, pause, gameOver);
    }, []);

    // If the player is dead
    useEffect(() => {
        if (playerHealth === 0) {
            endGame();
        }
    }, [playerHealth]);

    // Button text logic
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
    useKeyPress('a', pause || gameOver ? () => {} : moveLeft);
    useKeyPress('d', pause || gameOver ? () => {} : moveRight);
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
                className={styles.canvas}
            />
            <div className={styles.gameOptions}>
                <button
                    type="button"
                    onClick={pausePlay}
                    disabled={pauseDisabled && !gameOver}
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
    playerHealth: player.health,
    pause: game.pause,
    pauseCount: game.pauseCount,
    starting: game.starting,
    gameOver: game.gameOver,
    level: game.level,
    pauseDisabled: game.pauseDisabled,
}), (dispatch) => ({
    setPauseCount: (value) => dispatch(setPauseCountAction(value)),
    setPause: (value) => dispatch(setPauseAction(value)),
    setPauseDisabled: (value) => dispatch(setPauseDisabledAction(value)),
}))(Game);

export default WithReduxContainer;
