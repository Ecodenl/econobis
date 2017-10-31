import React from 'react';
import PropTypes from 'prop-types';

const PanelFooter = props => {
    const {className, children} = props;

    return (
        <div className={`panel-footer ${className}`}>
            { children }
        </div>
    );
};

PanelFooter.defaultProps = {
    className: '',
};

PanelFooter.propTypes = {
    className: PropTypes.string,
};

export default PanelFooter;