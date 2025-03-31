import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const InputTextArea = ({
    field,
    id,
    className,
    placeholder,
    readOnly,
    showErrorMessage,
    errors,
    touched,
    classNameErrorMessage,
    customOnChange = null,
}) => {
    if (customOnChange) {
        field.onChange = customOnChange;
    }
    return (
        <>
            {get(errors, field.name, '') && get(touched, field.name, '') && showErrorMessage && (
                <small className={classNameErrorMessage}>{get(errors, field.name, '')}</small>
            )}
            <textarea
                {...field}
                id={id}
                placeholder={placeholder}
                className={`${className} ${
                    Boolean(get(errors, field.name, '') && get(touched, field.name, '')) ? 'has-error' : ''
                }`}
                style={{ whiteSpace: 'pre-wrap' }}
                readOnly={readOnly}
                onChange={customOnChange || field.onChange}
            />
        </>
    );
};

InputTextArea.propTypes = {
    field: PropTypes.object.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    showErrorMessage: PropTypes.bool,
    errors: PropTypes.object,
    touched: PropTypes.object,
    classNameErrorMessage: PropTypes.string,
    customOnChange: PropTypes.func,
};

InputTextArea.defaultProps = {
    showErrorMessage: true,
    classNameErrorMessage: 'text-danger',
    errors: {},
    touched: {},
};

export default InputTextArea;
