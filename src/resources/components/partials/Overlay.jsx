import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/overlay.scss';

const propTypes = {
    starting: PropTypes.bool.isRequired,
    gameOver: PropTypes.bool.isRequired,
    pause: PropTypes.bool.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Overlay = ({
    starting, gameOver, pause, className,
}) => {
    const [count, setCount] = useState(3);
    const [firstLoad, setFirstLoad] = useState(true);

    const renderText = () => {
        if (starting) {
            return count;
        }
        if (gameOver) {
            if (firstLoad) {
                return 'Play';
            }
            return 'Game Over';
        }
        if (pause) {
            return 'Paused';
        }
        return 'Unknown State, Reload Page';
    };

    useEffect(() => {
        let id = 0;
        if (starting) {
            id = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(id);
        }
        setCount(3);
        return () => clearTimeout(id);
    }, [starting, count]);

    useEffect(() => {
        if (!gameOver) {
            setFirstLoad(false);
        }
    }, [gameOver]);

    // badly done starting

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isVisible]: pause || gameOver,
                    [className]: className !== null,

                },
            ])}

        >
            <div className={styles.overlayText}>{renderText()}</div>
        </div>
    );
};

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

const WithReduxContainer = connect(({ game }) => ({
    starting: game.starting,
    gameOver: game.gameOver,
    pause: game.pause,
}), () => ({
}))(Overlay);

export default WithReduxContainer;
