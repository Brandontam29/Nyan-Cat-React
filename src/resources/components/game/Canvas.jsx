import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_HEIGHT, GAME_WIDTH } from '../../lib/data';


import starynight from '../../images/starynight.png';
import Player from './Player';
import EnemyGenerator from './EnemyGenerator';
import TouchButtons from './TouchButtons';
import Overlay from '../partials/Overlay';
import TopBar from '../partials/TopBar';

import styles from '../../styles/game/canvas.scss';

const propTypes = {
    playButton: PropTypes.func,
    // gameOver: PropTypes.bool.isRequired,
    starting: PropTypes.bool,
    className: AppPropTypes.className,
};

const defaultProps = {
    playButton: null,
    starting: false,
    className: null,
};

// This components should only contain the layout of the canvas

const Canvas = ({
    playButton, starting, className,
}) => {
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
            <EnemyGenerator />
            <Player />
            <TouchButtons visible={starting} topButton={playButton} />
            <TopBar
                className={styles.topBar}
            />
            <Overlay starting={starting} className={styles.overlay} />
        </div>
    );
};

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
