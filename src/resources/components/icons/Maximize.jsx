import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames'

import * as AppPropTypes from '../../lib/PropTypes';

// import styles from '../../styles/main/MaximizeIcon.scss';

const propTypes = {
    className: AppPropTypes.className,
};

const defaultProps = {
    className: null,
};

const MaximizeIcon = ({ className }) => (
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
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
);

MaximizeIcon.propTypes = propTypes;
MaximizeIcon.defaultProps = defaultProps;

export default MaximizeIcon;
