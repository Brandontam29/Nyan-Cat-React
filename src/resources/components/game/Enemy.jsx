import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';
import { ENEMY_WIDTH, ENEMY_HEIGHT, GAME_HEIGHT } from '../../lib/data';
import styles from '../../styles/game/enemy.scss';

const propTypes = {
    spot: PropTypes.number.isRequired,
    dropSpeed: PropTypes.number,
    // gameSpeed: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    dropSpeed: 10,
    className: null,
};

const Enemy = ({
    spot,
    dropSpeed,
    // gameSpeed,
    className,
}) => {
    const [top, setTop] = useState(-ENEMY_HEIGHT);
    setInterval(setTop(top + dropSpeed), 750); // gameSpeed

    return top < GAME_HEIGHT ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <img
                src="/img/enemy.png"
                alt="enemy"
                className={styles.image}
                style={{ top, left: spot * ENEMY_WIDTH }}
            />
        </div>
    ) : null;
};

Enemy.propTypes = propTypes;
Enemy.defaultProps = defaultProps;

export default Enemy;
