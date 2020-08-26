/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames'

import * as AppPropTypes from '../../lib/PropTypes';

// import styles from '../../styles/main/HamburgerIcon.scss';

const propTypes = {
    breadColor: PropTypes.string,
    meatColor: PropTypes.string,
    props: PropTypes.any,
    className: AppPropTypes.className,
};

const defaultProps = {
    breadColor: '#FECB6E',
    meatColor: '#AB7A56',
    props: null,
    className: null,
};

const HamburgerIcon = ({
    breadColor, meatColor, props, className,
}) => (
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        className={className}
        {...props}
    >
        <polygon
            fill={breadColor}
            points="478.609,133.565 445.217,133.565 445.217,100.174 411.826,100.174 411.826,66.783
    378.435,66.783 378.435,33.391 133.565,33.391 133.565,66.783 100.174,66.783 100.174,100.174 66.783,100.174 66.783,133.565 33.391,133.565 33.391,445.217 66.783,445.217 66.783,478.609 445.217,478.609 445.217,445.217 478.609,445.217 "
        />
        <polygon
            fill={meatColor}
            points="478.609,267.13 478.609,233.739 33.391,233.739 33.391,267.13 0,267.13 0,345.043 33.391,345.043 33.391,378.435 478.609,378.435 478.609,345.043 512,345.043 512,267.13 "
        />
        <rect x="66.783" y="445.217" width="378.435" height="33.391" />
        <rect y="267.13" width="33.391" height="77.913" />
        <polygon points="33.391,345.043 33.391,445.217 66.783,445.217 66.783,378.435 445.217,378.435 445.217,445.217 478.609,445.217 478.609,345.043 " />
        <rect x="478.609" y="267.13" width="33.391" height="77.913" />
        <polygon points="478.609,267.13 478.609,133.565 445.217,133.565 445.217,233.739 66.783,233.739 66.783,133.565 33.391,133.565 33.391,267.13 " />
        <rect x="133.565" y="33.391" width="244.87" height="33.391" />
        <rect x="378.435" y="66.783" width="33.391" height="33.391" />
        <rect x="411.826" y="100.174" width="33.391" height="33.391" />
        <rect x="66.783" y="100.174" width="33.391" height="33.391" />
        <rect x="100.174" y="66.783" width="33.391" height="33.391" />
        <rect x="166.957" y="100.174" width="33.391" height="33.391" />
        <rect x="233.739" y="111.304" width="33.391" height="33.391" />
        <rect x="300.522" y="100.174" width="33.391" height="33.391" />
    </svg>
);

HamburgerIcon.propTypes = propTypes;
HamburgerIcon.defaultProps = defaultProps;

export default HamburgerIcon;