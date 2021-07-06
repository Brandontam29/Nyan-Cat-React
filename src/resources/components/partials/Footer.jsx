import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/footer.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const Footer = ({ className }) => (
    <footer
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <div />
    </footer>
);

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
