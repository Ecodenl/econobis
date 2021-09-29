import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const InputReactSelect = props => {
    const {
        label,
        divSize,
        size,
        id,
        name,
        value,
        options,
        optionId,
        optionName,
        onChangeAction,
        required,
        error,
        errorMessage,
        isLoading,
        disabled,
        placeholder,
        clearable,
    } = props;

    const customStyles = {
        option: provided => ({ ...provided, fontSize: '12px' }),
        singleValue: provided => ({ ...provided, fontSize: '12px' }),
        menu: provided => ({ ...provided, zIndex: 20 }),
    };

    return (
        <div className={`form-group ${divSize}`}>
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>
            <div className={`${size}`}>
                <Select
                    id={id}
                    name={name}
                    value={options && value ? options.find(option => option[optionId] === value) : ''}
                    onChange={option => onChangeAction(option ? option[optionId] : '', name)}
                    options={options}
                    getOptionLabel={option => option[optionName]}
                    getOptionValue={option => option[optionId]}
                    placeholder={placeholder}
                    noOptionsMessage={function() {
                        return 'Geen opties gevonden';
                    }}
                    loadingMessage={function() {
                        return 'Laden';
                    }}
                    isMulti={false}
                    simpleValue
                    removeSelected
                    className={error ? ' has-error' : ''}
                    isLoading={isLoading}
                    isDisabled={disabled}
                    styles={customStyles}
                    isClearable={clearable}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                        },
                        spacing: {
                            ...theme.spacing,
                            baseUnit: 2,
                            controlHeight: 24,
                            menuGutter: 4,
                        },
                    })}
                />
            </div>
            {error && (
                <div className="col-sm-offset-3 col-sm-8">
                    <span className="has-error-message"> {errorMessage}</span>
                </div>
            )}
        </div>
    );
};

InputReactSelect.defaultProps = {
    size: 'col-sm-6',
    divSize: 'col-sm-6',
    optionId: 'id',
    optionName: 'name',
    disabled: false,
    required: '',
    error: false,
    errorMessage: '',
    value: '',
    isLoading: false,
    placeholder: '',
    clearable: false,
};

InputReactSelect.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string,
    divSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    optionId: PropTypes.string,
    optionName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    placeholder: PropTypes.string,
    clearable: PropTypes.bool,
};

export default InputReactSelect;
