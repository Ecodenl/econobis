import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {FaInfoCircle} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

const AsyncSelectSet = props => {
    const [isLoading, setIsLoading] = useState(false);

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
        disabled,
        placeholder,
        clearable,
        textToolTip,
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
                        onChange={option => onChangeAction(option)}
                        value={value}
                        loadOptions={async (searchTerm) => {
                            if (searchTerm.length <= 1) {
                                return;
                            }

                            setIsLoading(true);

                            let result = await loadOptions(searchTerm);

                            setIsLoading(false);

                            return result;
                        }}
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
                        // allowCreateWhileLoading={true}
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
                { textToolTip && (
                    <div className="col-sm-1">
                        <FaInfoCircle
                            color={'blue'}
                            size={'15px'}
                            data-tip={textToolTip}
                            data-for={`tooltip-${name}`}
                        />
                        <ReactTooltip
                            id={`tooltip-${name ? name : id}`}
                            effect="float"
                            place="right"
                            multiline={true}
                            aria-haspopup="true"
                        />
                        &nbsp;
                    </div>
                )}
            </div>
        </div>
    );
};

AsyncSelectSet.defaultProps = {
    allowCreate: false,
    className: '',
    size: 'col-sm-8',
    optionId: 'id',
    optionName: 'name',
    disabled: false,
    required: '',
    error: false,
    errorMessage: '',
    value: '',
    multi: true,
    placeholder: '',
    clearable: false,
    textToolTip: '',
};

AsyncSelectSet.propTypes = {
    allowCreate: PropTypes.bool,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    loadOptions: PropTypes.func,
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
    placeholder: PropTypes.string,
    clearable: PropTypes.bool,
    textToolTip: PropTypes.string,
};

export default AsyncSelectSet;
