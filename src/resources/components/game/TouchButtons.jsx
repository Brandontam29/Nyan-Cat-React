import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import { moveLeft, moveRight } from '../../lib/playerMove';

import styles from '../../styles/game/touch-buttons.scss';

const propTypes = {
    visible: PropTypes.bool,
    topButton: PropTypes.func,
    className: AppPropTypes.className,
};

const defaultProps = {
    visible: false,
    topButton: null,
    className: null,
};
// Need to remove topButton prop

const TouchButtons = ({
    visible, topButton, className,
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
                onClick={moveLeft}
                className={styles.leftButton}
            >
                Move Left
            </button>
            <button
                type="button"
                onClick={moveRight}
                className={styles.rightButton}
            >
                Move Right
            </button>
        </div>
    );
};

TouchButtons.propTypes = propTypes;
TouchButtons.defaultProps = defaultProps;

const WithReduxContainer = connect(({ game }) => ({
    visible: game.starting,
}), () => ({
}))(TouchButtons);

export default WithReduxContainer;
