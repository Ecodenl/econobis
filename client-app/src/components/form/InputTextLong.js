import React from 'react';
import PropTypes from 'prop-types';

const InputTextLong = props => {
    const {
        label,
        type,
        className,
        id,
        placeholder,
        name,
        value,
        onClickAction,
        onChangeAction,
        onBlurAction,
        required,
        readOnly,
        maxLength,
        error,
        min,
        max,
        step,
        errorMessage,
        divClassName,
        autoComplete,
    } = props;

    return (
        <div className={`form-group col-sm-12 ${divClassName}`}>
            <div className={`row`}>
                <div className={`col-sm-3`}>
                    <label htmlFor={id} className={`col-sm-12 ${required}`}>
                        {label}
                    </label>
                </div>
                <div className={`col-sm-8`}>
                    <input
                        type={type}
                        className={`form-control input-sm ${className}` + (error ? 'has-error' : '')}
                        id={id}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onClick={onClickAction}
                        onChange={onChangeAction}
                        onBlur={onBlurAction}
                        readOnly={readOnly}
                        maxLength={maxLength}
                        min={min}
                        max={max}
                        autoComplete={autoComplete}
                        step={step}
                    />
                </div>
            </div>
            {error && (
                <div className="col-sm-offset-6 col-sm-6">
                    <span className="has-error-message"> {errorMessage}</span>
                </div>
            )}
        </div>
    );
};

InputTextLong.defaultProps = {
    divClassName: '',
    className: '',
    name: '',
    type: 'text',
    value: '',
    required: '',
    readOnly: false,
    maxLength: null,
    error: false,
    addRow: false,
    min: '',
    max: '',
    step: '',
    errorMessage: '',
    autoComplete: 'off',
    onBlurAction: () => {},
    onClickAction: () => {},
    onChangeAction: () => {},
};

InputTextLong.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    divClassName: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClickAction: PropTypes.func,
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.string,
    error: PropTypes.bool,
    addRow: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    errorMessage: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default InputTextLong;
