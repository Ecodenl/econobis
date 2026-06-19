import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const InputCheckBox = ({
    field,
    id,
    className,
    label,
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
        <div className={`checkbox-group ${className}`}>
            <label htmlFor={id} className="checkbox-label">
                <input
                    type="checkbox"
                    {...field}
                    id={id}
                    checked={field.value}
                    readOnly={readOnly}
                    onChange={customOnChange || field.onChange}
                    className={`checkbox-input ${
                        get(errors, field.name, '') && get(touched, field.name, '') ? 'has-error' : ''
                    }`}
                />
                {label}
            </label>
            {get(errors, field.name, '') && get(touched, field.name, '') && showErrorMessage && (
                <small className={classNameErrorMessage}>{get(errors, field.name, '')}</small>
            )}
        </div>
    );
};

InputCheckBox.propTypes = {
    field: PropTypes.object.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    readOnly: PropTypes.bool,
    showErrorMessage: PropTypes.bool,
    errors: PropTypes.object,
    touched: PropTypes.object,
    classNameErrorMessage: PropTypes.string,
    customOnChange: PropTypes.func,
};

InputCheckBox.defaultProps = {
    showErrorMessage: true,
    classNameErrorMessage: 'text-danger',
    errors: {},
    touched: {},
};

export default InputCheckBox;
