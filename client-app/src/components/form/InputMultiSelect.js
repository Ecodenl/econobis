import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const InputMultiSelect = props => {
    const { label, className, size, id, name, value, options, onChangeAction, required } = props;

    const optionsFormatted = options.map((option) => {
       return {value: option.id, label: option.name}
    });

    return (
        <div className="form-group col-sm-6">
            <label htmlFor={ id } className={`col-sm-6 ${required}`}>{label}</label>
            <div className={`${size}`}>
                <Select
                        id={ id }
                        name={name}
                        value={value}
                        onChange={onChangeAction}
                        options={optionsFormatted}
                        multi
                        simpleValue
                        removeSelected
                        >
                </Select>
            </div>
        </div>
    );
};

InputMultiSelect.defaultProps = {
    className: '',
    size: 'col-sm-6',
    readOnly: false,
    required: '',
    error: false,
    value: '',
};

InputMultiSelect.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    value: PropTypes.string,
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
};

export default InputMultiSelect;