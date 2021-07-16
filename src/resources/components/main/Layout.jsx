import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

import Header from '../partials/Header';
import Game from '../game/Game';
import Footer from '../partials/Footer';

import styles from '../../styles/main/layout.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Layout = ({ className }) => {
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
            <Game className={styles.game} />
            <Footer className={styles.footer} />
        </div>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
