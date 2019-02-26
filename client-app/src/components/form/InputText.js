import React from 'react';
import PropTypes from 'prop-types';

const InputText = props => {
    const {
        label,
        type,
        className,
        size,
        id,
        placeholder,
        name,
        value,
        onChangeAction,
        required,
        readOnly,
        maxLength,
        error,
        min,
        max,
        errorMessage,
        divSize,
        divClassName,
        autoComplete,
    } = props;

    return (
        <div className={`form-group ${divSize} ${divClassName}`}>
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>
            <div className={`${size}`}>
                <input
                    type={type}
                    className={`form-control input-sm ${className}` + (error ? 'has-error' : '')}
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChangeAction}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    min={min}
                    max={max}
                    autoComplete={autoComplete}
                />
            </div>
            {error && (
                <div className="col-sm-offset-6 col-sm-6">
                    <span className="has-error-message"> {errorMessage}</span>
                </div>
            )}
        </div>
    );
};

InputText.defaultProps = {
    divClassName: '',
    className: '',
    size: 'col-sm-6',
    divSize: 'col-sm-6',
    type: 'text',
    value: '',
    required: '',
    readOnly: false,
    maxLength: null,
    error: false,
    min: '',
    max: '',
    errorMessage: '',
    autoComplete: 'off',
    onChangeAction: () => {},
};

InputText.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    divSize: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.string,
    error: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
    errorMessage: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default InputText;
