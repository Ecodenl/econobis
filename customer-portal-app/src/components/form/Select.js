import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Select = ({
    field,
    className,
    id,
    options,
    optionLabel,
    emptyOption,
    placeholder,
    showErrorMessage,
    errors,
    touched,
    classNameErrorMessage,
    disabled,
    customOnChange = null,
}) => {
    if (customOnChange) {
        field.onChange = customOnChange;
    }
    return (
        <>
            {get(errors, field.name, '') && get(touched, field.name, '') && showErrorMessage ? (
                <small className={`${classNameErrorMessage}`}>{get(errors, field.name, '')}</small>
            ) : null}
            <select
                className={`select-field w-select content ${className} ${
                    Boolean(get(errors, field.name, '') && get(touched, field.name, '')) ? 'has-error mb-0' : ''
                } `}
                id={id}
                {...field}
                disabled={disabled}
            >
                {emptyOption ? <option value="">{placeholder ? `-- ${placeholder} --` : ''}</option> : null}
                {options.map(option => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option[optionLabel]}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

Select.defaultProps = {
    className: '',
    readOnly: false,
    required: '',
    optionLabel: 'name',
    emptyOption: true,
    placeholder: '',
    showErrorMessage: true,
    classNameErrorMessage: 'text-danger',
    errors: {},
    touched: {},
};

Select.propTypes = {
    field: PropTypes.object.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionLabel: PropTypes.string,
    emptyOption: PropTypes.bool,
    placeholder: PropTypes.string,
    showErrorMessage: PropTypes.bool,
    classNameErrorMessage: PropTypes.string,
    errors: PropTypes.object,
    touched: PropTypes.object,
};

export default Select;
