import React from 'react';
import PropTypes from 'prop-types';

const PanelBody = props => {
    const {className, children} = props;

    return (
        <div className={`panel-body ${className}`}>
            { children }
        </div>
    );
};

PanelBody.defaultProps = {
    className: '',
};

PanelBody.propTypes = {
    className: PropTypes.string,
};

export default PanelBody;