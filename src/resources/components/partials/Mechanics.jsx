import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/top-bar.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Mechanics = ({ className }) => {
    
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}

        >
            <h3 className={styles.title}>
                Mechanics
            </h3>

            
            <button
                type="button"
                onClick={}
                className={styles.button}
            />

        </div>
    );
};

Mechanics.propTypes = propTypes;
Mechanics.defaultProps = defaultProps;

const WithReduxContainer = connect(({ game, player }) => ({
    level: game.level,
    playerHealth: player.health,
    playerPosition: player.position,
}), () => ({
}))(Mechanics);

export default WithReduxContainer;
