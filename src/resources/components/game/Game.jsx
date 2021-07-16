import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_WIDTH, LEVEL_UP_DELAY } from '../../lib/data';
import useKeyPress from '../../hooks/useKeyPress';
import toggleFullScreen from '../../lib/toggleFullScreen';
import { moveRight, moveLeft } from '../../lib/playerMove';
import incrementLevel from '../../lib/incrementLevel';
import endGame from '../../lib/endGame';
import pausePlay from '../../lib/pausePlay';

import Canvas from './Canvas';
import HealthBar from './HealthBar';
import styles from '../../styles/game/game.scss';
// import resetGame from '../../lib/resetGame';

const propTypes = {
    level: PropTypes.number.isRequired,
    pause: PropTypes.bool.isRequired,
    gameOver: PropTypes.bool.isRequired,
    playerHealth: PropTypes.number.isRequired,
    pauseCount: PropTypes.number.isRequired,
    pauseDisabled: PropTypes.bool.isRequired,

    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

// All the game logic should be set here and children components will simply act depending on the data

// Three main variables roles
// PAUSE ROLE
// player movement disabled (game & touchButtons)
// enemy falling disabled
// game button text
// game button behavior
// overlay text

// GAME OVER ROLE
// player movement disabled (game & touchButtons)
// enemy falling disabled
// enemyGenerator disabled
// game button text
// game button behavior
// overlay text

// STARTING ROLE
// enemy reset to top

const Game = ({
    level,
    pause,
    gameOver,
    playerHealth,
    pauseCount,
    pauseDisabled,
    className,
}) => {
    // Increment level based on fixed time
    useEffect(() => {
        let id = 0;
        if (!pause && !gameOver) {
            id = setTimeout(() => incrementLevel(), LEVEL_UP_DELAY * 1000);
            return () => clearTimeout(id);
        }
        return () => clearTimeout(id);
    }, [level, pause, gameOver]);

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

    // Keyboard bindings
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
    game: game.level,
    starting: game.starting,
    pause: game.pause,
    gameOver: game.gameOver,
    playerHealth: player.health,
    level: game.level,
    pauseCount: game.pauseCount,
    pauseDisabled: game.pauseDisabled,
}), () => ({}))(Game);

export default WithReduxContainer;
