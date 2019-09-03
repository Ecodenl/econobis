import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ field, className, id, options, optionLabel, error, emptyOption, placeholder }) => {
    return (
        <select className={`select-field w-select ${className}`} id={id} {...field} error={error}>
            {emptyOption ? <option value="">{placeholder ? `-- ${placeholder} --` : ''}</option> : null}
            {options.map(option => {
                return (
                    <option key={option.id} value={option.id}>
                        {option[optionLabel]}
                    </option>
                );
            })}
        </select>
    );
};

Select.defaultProps = {
    className: '',
    readOnly: false,
    required: '',
    error: false,
    optionLabel: 'name',
    emptyOption: true,
    placeholder: '',
};

Select.propTypes = {
    field: PropTypes.object.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionLabel: PropTypes.string,
    error: PropTypes.bool,
    emptyOption: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default Select;
