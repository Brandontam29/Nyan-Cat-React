/* eslint-disable no-bitwise */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';
import { ENEMY_WIDTH, ENEMY_HEIGHT, GAME_HEIGHT } from '../../lib/data';
import { setEnemiesStatus as setEnemiesStatusAction } from '../../actions/enemiesActions';

import enemyImage from '../../images/enemy.png';
import styles from '../../styles/game/enemy.scss';


const propTypes = {
    pause: PropTypes.bool,
    // enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    spot: PropTypes.number.isRequired,
    dropSpeed: PropTypes.number, // maybe required
    // gameSpeed: PropTypes.number, // required
    falling: PropTypes.bool.isRequired,
    // subtractActiveEnemies: PropTypes.func.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    pause: false,
    dropSpeed: 20,
    // gameSpeed: 1,
    className: null,
};

const Enemy = ({
    pause,
    // enemiesStatus,
    spot,
    dropSpeed,
    falling,
    setEnemiesStatus,
    className,
}) => {
    const [top, setTop] = useState(-ENEMY_HEIGHT);

    useEffect(() => {
        let id = 0;
        if (falling && top < GAME_HEIGHT + ENEMY_HEIGHT && !pause) {
            id = setTimeout(() => setTop(top + 50), dropSpeed);
            return () => clearTimeout(id);
        }
        if (falling === true && !pause) {
            setEnemiesStatus({ spot, falling: false });
            setTop(-ENEMY_HEIGHT);
        }


        return () => clearTimeout(id);
    }, [top, falling, pause]);

    return (
        <img
            src={enemyImage}
            alt="Falling Nyan Cat"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ top, left: spot * ENEMY_WIDTH }}
        />
    );
};

Enemy.propTypes = propTypes;
Enemy.defaultProps = defaultProps;

const WithReduxContainer = connect(({ player }) => ({
    playerPosition: player.position,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
}))(Enemy);

export default WithReduxContainer;
