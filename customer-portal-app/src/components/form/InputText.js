import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ field, type, className, id, readOnly, placeholder, showErrorMessage, errors, touched }) => {
    return (
        <>
            <input
                type={type}
                className={`text-input w-input ${className} ${
                    Boolean(errors[field.name] && touched[field.name]) ? 'has-error' : ''
                } `}
                id={id}
                {...field}
                readOnly={readOnly}
                placeholder={placeholder}
            />
            {errors[field.name] && touched[field.name] && showErrorMessage ? (
                <span className={'error-message text-danger'}>{errors[field.name]}</span>
            ) : null}
        </>
    );
};

InputText.defaultProps = {
    type: 'text',
    className: 'content',
    readOnly: false,
    placeholder: '',
    showErrorMessage: true,
    errors: {},
    touched: {},
};

InputText.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    readOnly: PropTypes.bool,
    showErrorMessage: PropTypes.bool,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
    touched: PropTypes.object,
};

export default InputText;
