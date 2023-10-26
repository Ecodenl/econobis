import React from 'react';
import PropTypes from 'prop-types';

const InputSelectGroup = props => {
    const {
        label,
        className,
        size,
        divSize,
        id,
        name,
        value,
        optionsInGroups,
        onChangeAction,
        onBlurAction,
        required,
        error,
        readOnly,
        emptyOption,
    } = props;

    return (
        <div className={`form-group ${divSize}`}>
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>
            <div className={`${size}`}>
                <select
                    className={`form-control input-sm ${className}` + (error && ' has-error')}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChangeAction}
                    onBlur={onBlurAction}
                    disabled={readOnly}
                >
                    {emptyOption && <option value=""></option>}
                    {optionsInGroups.map((group, i) => {
                        const optionName = group.optionName || 'name';
                        return (
                            <optgroup key={i} label={group.label}>
                                {group.options.map(option => {
                                    return (
                                        <option key={option.id} value={group.name + option.id}>
                                            {option[optionName]}
                                        </option>
                                    );
                                })}
                            </optgroup>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

InputSelectGroup.defaultProps = {
    className: '',
    size: 'col-sm-6',
    divSize: 'col-sm-6',
    readOnly: false,
    required: '',
    error: false,
    value: '',
    emptyOption: true,
};

InputSelectGroup.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    divSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    optionsInGroups: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    optionName: PropTypes.string,
    emptyOption: PropTypes.bool,
};

export default InputSelectGroup;
