import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import ButtonText from '../button/ButtonText';

const InputReactSelect_3_6 = props => {
    const {
        label,
        divSize,
        labelSize,
        valueSize,
        buttonSize,
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
        textToolTip,
        buttonText,
        buttonAction,
    } = props;

    const customStyles = {
        option: provided => ({ ...provided, fontSize: '12px' }),
        singleValue: provided => ({ ...provided, fontSize: '12px' }),
        menu: provided => ({ ...provided, zIndex: 20 }),
    };

    return (
        <div className={`form-group ${divSize}`}>
            <div className="row">
                <div className={`${labelSize}`}>
                    <label htmlFor={id} className={`col-sm-12 ${required}`}>
                        {label}
                    </label>
                </div>
                <div className={`${valueSize}`}>
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
                </div>{' '}
                {textToolTip && (
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
                {buttonText && (
                    <div className={`${buttonSize}`}>
                        <div className="pull-left btn-group" role="group">
                            <ButtonText
                                buttonText={buttonText}
                                onClickAction={buttonAction}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </div>
                )}
                {error && (
                    <div className="col-sm-offset-3 col-sm-8">
                        <span className="has-error-message"> {errorMessage}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

InputReactSelect_3_6.defaultProps = {
    divSize: 'col-sm-12',
    labelSize: 'col-sm-3',
    valueSize: 'col-sm-6',
    buttonSize: 'col-sm-3',
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
    textToolTip: '',
    buttonText: '',
};

InputReactSelect_3_6.propTypes = {
    label: PropTypes.string.isRequired,
    divSize: PropTypes.string,
    labelSize: PropTypes.string,
    valueSize: PropTypes.string,
    buttonSize: PropTypes.string,
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
    textToolTip: PropTypes.string,
    buttonText: PropTypes.string,
    buttonAction: PropTypes.func,
};

export default InputReactSelect_3_6;
