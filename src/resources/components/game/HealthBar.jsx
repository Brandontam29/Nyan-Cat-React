import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid-random';

import * as AppPropTypes from '../../lib/PropTypes';
import { STARTING_HEALTH } from '../../lib/data';

import Hamburger from '../icons/Hamburger';

import styles from '../../styles/game/health-bar.scss';


const propTypes = {
    health: PropTypes.number.isRequired,
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const HealthBar = ({ health, className }) => {
    const createHealthBar = () => {
        const healthBar = [];
        for (let i = 0; i < health; i += 1) {
            healthBar.push(
                <Hamburger
                    key={uuid()}
                    className={styles.hamburger}
                />,
            );
        }
        for (let i = 0; i < STARTING_HEALTH - Math.abs(health); i += 1) {
            healthBar.push(
                <Hamburger
                    key={uuid()}
                    breadColor="#fff"
                    meatColor="#fff"
                    className={styles.hamburger}
                />,
            );
        }
        return healthBar;
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
            {createHealthBar()}
        </div>
    );
};

HealthBar.propTypes = propTypes;
HealthBar.defaultProps = defaultProps;

export default HealthBar;
