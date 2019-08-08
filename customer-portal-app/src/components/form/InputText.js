import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ field, className, id, readOnly, error, placeholder }) => {
    return <input className={className} id={id} {...field} readOnly={readOnly} placeholder={placeholder} />;
};

InputText.defaultProps = {
    className: 'text-input w-input',
    readOnly: false,
    error: false,
    placeholder: '',
};

InputText.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default InputText;
