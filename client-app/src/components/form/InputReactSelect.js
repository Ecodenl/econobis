import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const InputReactSelect = props => {
    const {
        label,
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
        isLoading,
    } = props;

    const onChange = selectedOption => {
        onChangeAction(selectedOption || '', name);
    };

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
                    onChange={onChange}
                    options={options}
                    valueKey={optionId}
                    labelKey={optionName}
                    placeholder={''}
                    noResultsText={'Geen resultaat gevonden'}
                    multi={multi}
                    simpleValue
                    removeSelected
                    className={error ? ' has-error' : ''}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

InputReactSelect.defaultProps = {
    className: '',
    size: 'col-sm-6',
    optionId: 'id',
    optionName: 'name',
    readOnly: false,
    required: '',
    error: false,
    value: '',
    multi: true,
    isLoading: false,
};

InputReactSelect.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    optionId: PropTypes.string,
    optionName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    multi: PropTypes.bool,
    isLoading: PropTypes.bool,
};

export default InputReactSelect;
