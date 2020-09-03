import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames'

import * as AppPropTypes from '../../lib/PropTypes';

// import styles from '../../styles/main/MinimizeIcon.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const MinimizeIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
);

MinimizeIcon.propTypes = propTypes;
MinimizeIcon.defaultProps = defaultProps;

export default MinimizeIcon;
