import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

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
    const pauseTime = useRef(0);
    const [pause, setPause] = useState(true);
    const [disablePause, setDisablePause] = useState(false);


    const addPauseCount = () => {
        pauseTime.current += 1;
    };


    useEffect(() => {
        if (pauseTime.current >= 6) {
            setDisablePause(true);
        }
    }, [pause]);


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
            <Canvas pause={pause} className={styles.canva} />
            <button
                type="button"
                onClick={() => {
                    addPauseCount();
                    setPause(!pause);
                }}
                disabled={disablePause}
                className={classNames([
                    styles.pauseButton,
                    {
                        [styles.disabledPause]: disablePause,
                    },
                ])}
            >
                Pause
            </button>
        </div>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
