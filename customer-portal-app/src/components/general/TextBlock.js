import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ children, className, id, placeholder }) => {
    const showPlaceholder = children === '' || children === null || children === undefined;

    return (
        <div className={`text-block ${className} ${showPlaceholder ? 'placeholder' : ''}`} id={id}>
            {showPlaceholder ? <div className={'placeholder-message'}>{placeholder}</div> : children}
        </div>
    );
};

TextBlock.defaultProps = {
    className: 'text-block',
    id: '',
    children: '',
    placeholder: '',
};

TextBlock.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
};

export default TextBlock;
