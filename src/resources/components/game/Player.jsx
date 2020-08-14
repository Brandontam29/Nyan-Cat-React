import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';
import playerImage from '../../images/player.png';
import styles from '../../styles/game/player.scss';

const propTypes = {
    left: PropTypes.number,
    className: AppPropTypes.className,
};

const defaultProps = {
    left: 200,
    className: null,
};

const Player = ({ left, className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <img src={playerImage} alt="Burgerino" className={styles.image} style={{ left }} />
    </div>
);

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default Player;
