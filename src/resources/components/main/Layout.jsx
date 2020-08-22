import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';
import { GAME_WIDTH, GAME_HEIGHT } from '../../lib/data';

import Header from '../partials/Header';
import Canvas from '../game/Canvas';

import styles from '../../styles/main/layout.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Layout = ({ className }) => {
    const [pause, setPause] = useState(false);
    const [pauseCount, setPauseCount] = useState(3);
    const [disablePause, setDisablePause] = useState(false);


    const onPauseClick = () => {
        if (!pause) {
            setPauseCount(pauseCount - 1);
        }
        if (pauseCount === 0) {
            setDisablePause(true);
        }
        return setPause(!pause);
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Header className={styles.header} />
            <Canvas pause={pause} className={styles.canvas} />
            <div
                className={styles.gameOptions}
                style={{
                    width: GAME_WIDTH,

                }}
            >
                <button
                    type="button"
                    onClick={onPauseClick}
                    disabled={disablePause}
                    className={classNames([
                        styles.pauseButton,
                        {
                            [styles.isActive]: pause,
                            [styles.isDisabled]: disablePause,
                        },
                    ])}
                >
                    {pause ? 'Play' : `Pause (${pauseCount})` }
                </button>
            </div>
        </div>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
