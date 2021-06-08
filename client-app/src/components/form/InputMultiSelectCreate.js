import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { sortBy } from 'lodash';

const InputMultiSelectCreate = props => {
    const {
        label,
        className,
        size,
        id,
        name,
        value,
        options,
        optionId,
        optionName,
        onChangeAction,
        required,
        allowCreate,
        error,
    } = props;

    const onPromptTextCreator = label => {
        return `Maak optie "${label}" aan`;
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
                    <Select.Creatable
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChangeAction}
                        options={sortBy(options, x => (x[optionName] ? x[optionName].toUpperCase() : ''))}
                        valueKey={optionId}
                        labelKey={optionName}
                        placeholder={''}
                        noResultsText={'Geen resultaat gevonden'}
                        multi
                        simpleValue
                        removeSelected
                        promptTextCreator={onPromptTextCreator}
                        className={error ? ' has-error' : ''}
                    />
                </div>
            </div>
        </div>
    );
};

InputMultiSelectCreate.defaultProps = {
    allowCreate: false,
    className: '',
    size: 'col-sm-6',
    optionId: 'id',
    optionName: 'name',
    readOnly: false,
    required: '',
    error: false,
    value: '',
};

InputMultiSelectCreate.propTypes = {
    allowCreate: PropTypes.bool,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    optionId: PropTypes.string,
    optionName: PropTypes.string,
    value: PropTypes.string,
    onChangeAction: PropTypes.func,
    onBlurAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
};

export default InputMultiSelectCreate;
