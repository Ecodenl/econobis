import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const InputMultiSelect = props => {
    const {
        label,
        className,
        size,
        id,
        name,
        value,
        options,
        optionId,
        optionName,
        onChangeAction,
        required,
        multi,
        error,
    } = props;

    return (
        <div className="form-group col-sm-6">
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>
            <div className={`${size}`}>
                <Select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChangeAction}
                    options={options}
                    valueKey={optionId}
                    labelKey={optionName}
                    placeholder={''}
                    noResultsText={'Geen resultaat gevonden'}
                    multi={multi}
                    simpleValue
                    removeSelected
                    className={error ? ' has-error' : ''}
                />
            </div>
        </div>
    );
};

InputMultiSelect.defaultProps = {
    className: '',
    size: 'col-sm-6',
    optionId: 'id',
    optionName: 'name',
    readOnly: false,
    required: '',
    error: false,
    value: '',
    multi: true,
};

InputMultiSelect.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    optionId: PropTypes.string,
    optionName: PropTypes.string,
    value: PropTypes.string,
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    multi: PropTypes.bool,
};

export default InputMultiSelect;
