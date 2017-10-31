import React from 'react';
import PropTypes from 'prop-types';

const ViewText = props => {
    const { label, className, id, value } = props;

    return (
        <div className={className}>
            <label htmlFor={ id } className="col-sm-6">{ label }</label>
            <div id={ id }>
                {value}
            </div>
        </div>
    );
};

ViewText.defaultProps = {
    className: 'col-sm-6',
    value: ''
};

ViewText.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

export default ViewText;