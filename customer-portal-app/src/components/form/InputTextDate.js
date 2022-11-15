import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const InputTextDate = ({
    field,
    type,
    min,
    max,
    step,
    className,
    id,
    readOnly,
    placeholder,
    showErrorMessage,
    errors,
    touched,
    classNameErrorMessage,
    disabled,
    customOnChange = null,
}) => {
    if (customOnChange) {
        field.onChange = customOnChange;
    }
    return (
        <>
            {get(errors, field.name, '') && get(touched, field.name, '') && showErrorMessage ? (
                <small className={`${classNameErrorMessage}`}>{get(errors, field.name, '')}</small>
            ) : null}
            <input
                type={type}
                className={`text-input w-input ${className} ${
                    Boolean(get(errors, field.name, '') && get(touched, field.name, '')) ? 'has-error mb-0' : ''
                } `}
                id={id}
                {...field}
                readOnly={readOnly}
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
            />
        </>
    );
};

InputTextDate.defaultProps = {
    type: 'date',
    className: 'content',
    readOnly: false,
    placeholder: '',
    showErrorMessage: true,
    classNameErrorMessage: 'text-danger',
    min: '1900-01-01',
    max: '2099-12-31',
    step: '60',
    errors: {},
    touched: {},
};

InputTextDate.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    readOnly: PropTypes.bool,
    showErrorMessage: PropTypes.bool,
    classNameErrorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    errors: PropTypes.object,
    touched: PropTypes.object,
};

export default InputTextDate;
