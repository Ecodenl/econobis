import React from 'react';
import PropTypes from 'prop-types';

const PanelHeader = props => {
    const {className, children} = props;

    return (
        <div className={`panel-heading ${className}`}>
            { children }
        </div>
    );
};

PanelHeader.defaultProps = {
    className: '',
};

PanelHeader.propTypes = {
    className: PropTypes.string,
};

export default PanelHeader;