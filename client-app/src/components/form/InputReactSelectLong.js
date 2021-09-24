import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const InputReactSelectLong = props => {
    const {
        label,
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
        <div className={`form-group col-sm-12`}>
            <div className={`row`}>
                <div className={`col-sm-3`}>
                    <label htmlFor={id} className={`col-sm-12 ${required}`}>
                        {label}
                    </label>
                </div>
                <div className={`col-sm-8`}>
                    <Select
                        id={id}
                        name={name}
                        value={
                            options && value
                                ? multi
                                    ? options.map(option => {
                                          if (value.includes(option[optionId])) {
                                              return option;
                                          }
                                      })
                                    : options.find(option => option[optionId] === value)
                                : ''
                        }
                        onChange={
                            multi
                                ? option => onChangeAction(option ? option.map(item => item[optionId]).join() : '')
                                : option => onChangeAction(option ? option[optionId] : '', name)
                        }
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
                        isMulti={multi}
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
        </div>
    );
};

InputReactSelectLong.defaultProps = {
    optionId: 'id',
    optionName: 'name',
    disabled: false,
    required: '',
    error: false,
    errorMessage: '',
    value: '',
    multi: true,
    isLoading: false,
    placeholder: '',
    clearable: false,
};

InputReactSelectLong.propTypes = {
    label: PropTypes.string.isRequired,
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
    multi: PropTypes.bool,
    isLoading: PropTypes.bool,
    placeholder: PropTypes.string,
    clearable: PropTypes.bool,
};

export default InputReactSelectLong;
