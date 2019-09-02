import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ children, className, id }) => {
    return (
        <div className={className} id={id}>
            {children}
        </div>
    );
};

TextBlock.defaultProps = {
    className: 'text-block',
    id: '',
    children: '',
};

TextBlock.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.string,
};

export default TextBlock;
