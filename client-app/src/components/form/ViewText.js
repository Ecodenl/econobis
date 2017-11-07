import React from 'react';
import PropTypes from 'prop-types';

const ViewText = props => {
    const { label, className, id, value } = props;

    return (
        <div>
            <label htmlFor={ id } className={className}>{ label }</label>
            <div className={className} id={ id }>
                {value}
            </div>
        </div>
    );
};

ViewText.defaultProps = {
    className: 'col-sm-3',
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