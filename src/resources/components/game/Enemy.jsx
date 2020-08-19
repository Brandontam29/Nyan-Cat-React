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
    enemiesStatus: AppPropTypes.enemyStatus.isRequired,
    spot: PropTypes.number.isRequired,
    dropSpeed: PropTypes.number, // maybe required
    // gameSpeed: PropTypes.number, // required
    falling: PropTypes.bool.isRequired,
    // subtractActiveEnemies: PropTypes.func.isRequired,
    setEnemiesStatus: PropTypes.func.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    dropSpeed: 20,
    // gameSpeed: 1,
    className: null,
};

const Enemy = ({
    enemiesStatus,
    spot,
    dropSpeed,
    // gameSpeed,
    falling,
    setEnemiesStatus,
    // subtractActiveEnemies,
    className,
}) => {
    const [top, setTop] = useState(-ENEMY_HEIGHT);

    useEffect(() => {
        let id = 0;
        if (enemiesStatus[spot] && top < GAME_HEIGHT + ENEMY_HEIGHT) {
            id = setTimeout(() => setTop(top + 20), dropSpeed);
            return () => clearTimeout(id);
        }
        if (enemiesStatus[spot] === true) {
            setEnemiesStatus({ spot, falling: false });
            setTop(-ENEMY_HEIGHT);
        }
        return () => clearTimeout(id);
    }, [top, enemiesStatus]);

    console.log(spot, top, falling);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ top, left: spot * ENEMY_WIDTH }}
        >
            <img
                src={enemyImage}
                alt="Falling Nyan Cat"
                className={styles.image}
            />
        </div>
    );
};

Enemy.propTypes = propTypes;
Enemy.defaultProps = defaultProps;

const WithReduxContainer = connect(({ enemies }) => ({
    enemiesStatus: enemies.enemiesStatus,
}), (dispatch) => ({
    setEnemiesStatus: (value) => dispatch(setEnemiesStatusAction(value)),
}))(Enemy);

export default WithReduxContainer;
