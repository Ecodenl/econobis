import React from 'react';
import PropTypes from 'prop-types';

const Panel = props => {
    const { children, className, onMouseEnter, onMouseLeave } = props;

    return (
        <div className={`panel panel-default ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </div>
    );
};

Panel.defaultProps = {
    className: '',
    onMouseEnter: () => {},
    onMouseLeave: () => {},
};

Panel.propTypes = {
    className: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

export default Panel;
