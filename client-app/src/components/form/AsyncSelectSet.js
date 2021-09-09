import React from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/async-creatable';

const AsyncSelectSet = props => {
    const {
        label,
        size,
        id,
        name,
        value,
        loadOptions,
        optionId,
        optionName,
        onChangeAction,
        handleInputChange,
        required,
        allowCreate,
        multi,
        error,
        errorMessage,
        isLoading,
        disabled,
        placeholder,
        clearable,
    } = props;

    const onPromptTextCreator = label => {
        return `Maak optie "${label}" aan`;
    };

    const customStyles = {
        option: provided => ({ ...provided, fontSize: '12px' }),
        singleValue: provided => ({ ...provided, fontSize: '12px' }),
        menu: provided => ({ ...provided, zIndex: 20 }),
    };

    return (
        <div className="form-group col-sm-12">
            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor={id} className={`col-sm-12 ${required}`}>
                        {label}
                    </label>
                </div>
                <div className={`${size}`}>
                    <AsyncCreatableSelect
                        id={id}
                        name={name}
                        onChange={
                            multi
                                ? option => onChangeAction(option ? option.map(item => item[optionId]).join() : '')
                                : option => onChangeAction(option ? option[optionId] : '')
                        }
                        value={value}
                        loadOptions={loadOptions}
                        onInputChange={handleInputChange}
                        getOptionLabel={option => option[optionName]}
                        getOptionValue={option => option[optionId]}
                        placeholder={placeholder}
                        noOptionsMessage={function() {
                            return 'Geen opties gevonden (tik om te zoeken minimaal 2 tekens)';
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
                        formatCreateLabel={onPromptTextCreator}
                        getNewOptionData={(optionId, optionName) =>
                            allowCreate
                                ? {
                                      id: optionName,
                                      name: optionName,
                                      __isNew__: true,
                                  }
                                : {}
                        }
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

AsyncSelectSet.defaultProps = {
    allowCreate: false,
    className: '',
    size: 'col-sm-6',
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

AsyncSelectSet.propTypes = {
    allowCreate: PropTypes.bool,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    loadOptions: PropTypes.array,
    optionId: PropTypes.string,
    optionName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.email, PropTypes.number]),
    onChangeAction: PropTypes.func,
    handleInputChange: PropTypes.func,
    required: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    multi: PropTypes.bool,
    isLoading: PropTypes.bool,
    placeholder: PropTypes.string,
    clearable: PropTypes.bool,
};

export default AsyncSelectSet;
