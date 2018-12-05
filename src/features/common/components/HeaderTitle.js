import React from 'react';
import PropTypes from 'prop-types';
import CommonText from './CommonText';

const HeaderTitle = (props) => {
    return <CommonText text={props.text} color={props.color} size={props.size}  />
};

HeaderTitle.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
};

HeaderTitle.defaultProps = {
    text: '',
    color: '#fff',
    size : 20
};

export default HeaderTitle;
