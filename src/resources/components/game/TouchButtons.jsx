import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/game/touch-buttons.scss';

const propTypes = {
    visible: PropTypes.bool,
    topButton: PropTypes.func,
    leftButton: PropTypes.func,
    rightButton: PropTypes.func,
    className: AppPropTypes.className,
};

const defaultProps = {
    visible: false,
    topButton: null,
    leftButton: null,
    rightButton: null,
    className: null,
};

const TouchButtons = ({
    visible, topButton, leftButton, rightButton, className,
}) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.visible]: visible,
                },
            ])}
        >
            <button
                type="button"
                onClick={topButton}
                className={styles.topButton}
            >
                Pause & Play Button
            </button>
            <button
                type="button"
                onClick={leftButton}
                className={styles.leftButton}
            >
                Move Left
            </button>
            <button
                type="button"
                onClick={rightButton}
                className={styles.rightButton}
            >
                Move Right
            </button>
        </div>
    );
};

TouchButtons.propTypes = propTypes;
TouchButtons.defaultProps = defaultProps;

export default TouchButtons;
