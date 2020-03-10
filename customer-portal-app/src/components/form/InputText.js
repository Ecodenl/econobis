import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const InputText = ({
    field,
    type,
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
            />
        </>
    );
};

InputText.defaultProps = {
    type: 'text',
    className: 'content',
    readOnly: false,
    placeholder: '',
    showErrorMessage: true,
    classNameErrorMessage: 'text-danger',
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
    classNameErrorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
    touched: PropTypes.object,
};

export default InputText;
