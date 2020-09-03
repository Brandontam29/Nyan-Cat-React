import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_HEIGHT, GAME_COLUMNS, GAME_WIDTH } from '../../lib/data';
import useKeyPress from '../../hooks/useKeyPress';

import { setPlayerPosition as setPlayerPositionAction } from '../../actions/playerActions';

import starynight from '../../images/starynight.png';
import Player from './Player';
import EnemyGenerator from './EnemyGenerator';
import TouchButtons from './TouchButtons';
import Overlay from '../partials/Overlay';
import TopBar from '../partials/TopBar';

import styles from '../../styles/game/canvas.scss';

const propTypes = {
    playerHealth: PropTypes.number.isRequired,
    playButton: PropTypes.func,
    gameOver: PropTypes.bool.isRequired,
    level: PropTypes.number,
    starting: PropTypes.bool,
    pause: PropTypes.bool,
    playerPosition: PropTypes.number.isRequired,
    setPlayerPosition: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    playButton: null,
    level: 4,
    starting: false,
    pause: true,
    className: null,
};

const Canvas = ({
    playerHealth, playButton, gameOver, level, pause, starting, playerPosition, setPlayerPosition, className,
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
    useKeyPress('a', pause ? () => {} : moveLeft);
    useKeyPress('d', pause ? () => {} : moveRight);
    useKeyPress(' ', playButton);

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
            <EnemyGenerator level={level} gameOver={gameOver} pause={pause} />
            <Player />
            <TouchButtons visible={starting} topButton={playButton} leftButton={moveLeft} rightButton={moveRight} />
            <TopBar
                fullScreen={fullScreen}
                level={level}
                toggleFullScreen={toggleFullScreen}
                playerHealth={playerHealth}
                className={styles.topBar}
            />
            <Overlay pause={pause} starting={starting} gameOver={gameOver} />
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
