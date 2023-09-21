import React from 'react';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const InputText = props => {
    const {
        label,
        labelClassName,
        type,
        className,
        size,
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
        textToolTip,
        textClearOrDelete,
        actionClearOrDelete,
        errorMessage,
        divSize,
        labelSize,
        divClassName,
        autoComplete,
        disabled,
        attribute,
        allowZero, // Prevent zero's from being transformed to empty string
    } = props;

    return (
        <div className={`form-group ${divSize} ${divClassName}`}>
            {!!label && (
                <label htmlFor={id} className={`${labelSize} ${required} ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className={`${size}`}>
                <input
                    type={type}
                    className={`form-control input-sm ${className}` + (error ? 'has-error' : '')}
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    value={value ? value : allowZero && value === 0 ? 0 : ''}
                    onClick={onClickAction}
                    onChange={onChangeAction}
                    onBlur={onBlurAction}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    min={min}
                    max={max}
                    autoComplete={autoComplete}
                    step={step}
                    disabled={disabled}
                    data-item-id={props.itemId ?? ''}
                />
            </div>{' '}
            {(textToolTip || textClearOrDelete) && (
                <div className="col-sm-1">
                    {textToolTip && (
                        <>
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={textToolTip}
                                data-for={`tooltip-${name ? name : id}`}
                            />
                            <ReactTooltip
                                id={`tooltip-${name ? name : id}`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                            &nbsp;
                        </>
                    )}
                    {textClearOrDelete && (
                        <span onClick={actionClearOrDelete}>
                            <FaTimesCircle
                                color={'red'}
                                size={'15px'}
                                data-tip={textClearOrDelete}
                                data-for={`clearOrDelete-${name}`}
                            />
                            <ReactTooltip
                                id={`clearOrDelete-${name}`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </span>
                    )}
                </div>
            )}
            {error && (
                <div className={`${size}`}>
                    <span className="has-error-message"> {errorMessage}</span>
                </div>
            )}
        </div>
    );
};

InputText.defaultProps = {
    className: '',
    divClassName: '',
    labelClassName: '',
    size: 'col-sm-6',
    divSize: 'col-sm-6',
    labelSize: 'col-sm-6',
    name: '',
    type: 'text',
    value: '',
    required: '',
    readOnly: false,
    maxLength: null,
    error: false,
    min: '',
    max: '',
    step: '',
    textToolTip: '',
    textClearOrDelete: '',
    actionClearOrDelete: '',
    errorMessage: '',
    autoComplete: 'off',
    disabled: false,
    allowZero: false,
    onBlurAction: () => {},
    onClickAction: () => {},
    onChangeAction: () => {},
};

InputText.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    className: PropTypes.string,
    divClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    size: PropTypes.string,
    divSize: PropTypes.string,
    labelSize: PropTypes.string,
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
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    textToolTip: PropTypes.string,
    textClearOrDelete: PropTypes.string,
    actionClearOrDelete: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    errorMessage: PropTypes.string,
    autoComplete: PropTypes.string,
    disabled: PropTypes.bool,
    allowZero: PropTypes.bool,
};

export default InputText;
