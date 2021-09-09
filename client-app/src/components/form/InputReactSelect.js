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
        // onCreateOption,
        onChangeAction,
        required,
        // allowCreate,
        multi,
        error,
        errorMessage,
        isLoading,
        disabled,
        placeholder,
        clearable,
    } = props;

    // const onPromptTextCreator = label => {
    //     return `Maak optie "${label}" aan`;
    // };

    const customStyles = {
        option: provided => ({ ...provided, fontSize: '12px' }),
        singleValue: provided => ({ ...provided, fontSize: '12px' }),
        menu: provided => ({ ...provided, zIndex: 20 }),
    };

    // if (value != '' && options && options.length > 0) {
    //     let valueArray = [];
    //     if (!Array.isArray(value)) {
    //         valueArray = value.toString().split(',');
    //     } else {
    //         valueArray = value;
    //     }
    //
    //     let newValues = [];
    //     valueArray.map(valueItem => {
    //         if (!searchNewItem(valueItem, options)) {
    //             newValues.push({
    //                 id: valueItem,
    //                 name: valueItem,
    //                 email: valueItem,
    //             });
    //         }
    //     });
    //     options.push(...newValues);
    // }
    //
    // function searchNewItem(idKey, myArray) {
    //     for (var i = 0; i < myArray.length; i++) {
    //         if (myArray[i].id == idKey) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    return (
        <div className={`form-group ${divSize}`}>
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>
            <div className={`${size}`}>
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
                    // onCreateOption={onCreateOption}
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
                    // formatCreateLabel={onPromptTextCreator}
                    // getNewOptionData={(optionId, optionName) =>
                    //     allowCreate
                    //         ? {
                    //               id: optionName,
                    //               name: optionName,
                    //               __isNew__: true,
                    //       }
                    //         : {}
                    // }
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
    // allowCreate: false,
    size: 'col-sm-6',
    divSize: 'col-sm-6',
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

InputReactSelect.propTypes = {
    // allowCreate: PropTypes.bool,
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
    multi: PropTypes.bool,
    isLoading: PropTypes.bool,
    placeholder: PropTypes.string,
    clearable: PropTypes.bool,
};

export default InputReactSelect;
