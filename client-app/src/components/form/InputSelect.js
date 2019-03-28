import React from 'react';
import PropTypes from 'prop-types';

const InputSelect = props => {
    const { label, className, size, id, name, value, options, onChangeAction, onBlurAction, required, error, optionValue, optionName, readOnly, placeholder, divClassName, emptyOption} = props;

    return (
        <div className={`form-group ${size} ${divClassName}`}>
            <label htmlFor={ id } className={`col-sm-6 ${required}`}>{label}</label>
            <div className={"col-sm-6"}>
                <select className={`form-control input-sm ${className}` + (error && ' has-error')} id={ id } name={name} value={value} onChange={onChangeAction} onBlur={onBlurAction} readOnly={readOnly}>
                    {emptyOption && <option value=''>{placeholder}</option>}
                    { options.map((option) => {
                        return <option key={ option.id } value={ option[optionValue] }>{ option[optionName] }</option>
                    }) }
                </select>
            </div>
        </div>
    );
};

InputSelect.defaultProps = {
    divClassName: '',
    className: '',
    size: 'col-sm-6',
    readOnly: false,
    required: '',
    error: false,
    value: '',
    optionValue: 'id',
    optionName: 'name',
    placeholder: '',
    emptyOption: true,
};

InputSelect.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    emptyOption: PropTypes.bool,
    optionValue: PropTypes.string,
    optionName: PropTypes.string,
    placeholder: PropTypes.string
};

export default InputSelect;