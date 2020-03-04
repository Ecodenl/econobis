import React from 'react';
import PropTypes from 'prop-types';
import DataTableCustomFilterSelectString from './DataTableCustomFilterSelectString';
import DataTableCustomFilterSelectNumber from './DataTableCustomFilterSelectNumber';
import DataTableCustomFilterSelectDropdown from './DataTableCustomFilterSelectDropdown';
import DataTableCustomFilterSelectDate from './DataTableCustomFilterSelectDate';

import moment from 'moment';
import DataTableDateFilter from './DataTableDateFilter';
import DataTableCustomFilterSelectDropdownHas from './DataTableCustomFilterSelectDropdownHas';
import InputSelectGroup from '../form/InputSelectGroup';

moment.locale('nl');

const DataTableCustomFilter = props => {
    const handleFieldChange = event => {
        const target = event.target;
        const value = target.value;

        props.handleFilterFieldChange(value, props.filterNumber);
    };

    const handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        props.handleFilterValueChange(name, value, props.filterNumber);
    };

    const handleInputChangeDate = value => {
        props.handleFilterValueChange('data', value, props.filterNumber);
    };

    const deleteRow = () => {
        props.deleteFilterRow(props.filterNumber);
    };

    const { fields } = props;
    const { field } = props.filter;
    const { type } = props.filter;

    const fieldList = Object.entries(fields).map(([key, value], i) => {
        if (key === 'dateStart' || key === 'dateFinish' || key === 'orderStatus') return;

        return (
            <option key={i} value={key}>
                {value.name}
            </option>
        );
    });

    const isCustomProductField = field == 'dateStart' || field == 'dateFinish' || field == 'orderStatus';
    const fieldType = props.fields[props.filter.field].type;
    const optionName = props.fields[props.filter.field].optionName
        ? props.fields[props.filter.field].optionName
        : 'name';

    return (
        <tr>
            <td className="col-md-4">
                {isCustomProductField ? (
                    <select disabled={true} className="form-control input-sm" name={'field'} value={field}>
                        <option key={0} value={field}>
                            {fields[field].name}
                        </option>
                    </select>
                ) : (
                    <select
                        disabled={props.filter.readOnly}
                        className="form-control input-sm"
                        name={'field'}
                        value={field}
                        onChange={handleFieldChange}
                    >
                        {fieldList}
                    </select>
                )}
            </td>
            <td className="col-md-3">
                {fieldType === 'string' && (
                    <DataTableCustomFilterSelectString
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'number' && (
                    <DataTableCustomFilterSelectNumber
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'dropdown' && (
                    <DataTableCustomFilterSelectDropdown
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'dropdownHas' ||
                    (fieldType === 'dropdownGrouped' && (
                        <DataTableCustomFilterSelectDropdownHas
                            handleInputChange={handleInputChange}
                            type={type}
                            readOnly={props.filter.readOnly}
                        />
                    ))}
                {fieldType === 'date' && (
                    <DataTableCustomFilterSelectDate
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
            </td>
            {props.filter.comperator !== 'nl' && props.filter.comperator !== 'nnl' && (
                <td className="col-md-4">
                    {(fieldType === 'number' || fieldType === 'string') && (
                        <input
                            className={'form-control input-sm'}
                            type="text"
                            id="data"
                            name="data"
                            value={props.filter.data}
                            onChange={handleInputChange}
                            readOnly={props.filter.readOnly}
                        />
                    )}
                    {(fieldType === 'dropdown' || fieldType === 'dropdownHas') && (
                        <select
                            className={`form-control input-sm`}
                            id="data"
                            name="data"
                            value={props.filter.data}
                            onChange={handleInputChange}
                            disabled={props.filter.readOnly}
                        >
                            <option />
                            {props.fields[props.filter.field].dropDownOptions.map(option => {
                                return (
                                    <option key={option.id} value={option.id}>
                                        {option[optionName]}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                    {fieldType === 'dropdownGrouped' && (
                        <select
                            className={`form-control input-sm`}
                            id="data"
                            name="data"
                            value={props.filter.data}
                            onChange={handleInputChange}
                            disabled={props.filter.readOnly}
                        >
                            <option />
                            <optgroup key="primair" label="Primaire rol">
                                {props.fields[props.filter.field].dropDownOptions.map(option => {
                                    if (option.id.includes('primary')) {
                                        return (
                                            <option key={option.id} value={option.id}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    }
                                })}
                            </optgroup>
                            <optgroup key="secundair" label="Secundaire rol">
                                {props.fields[props.filter.field].dropDownOptions.map(option => {
                                    if (option.id.includes('secondary')) {
                                        return (
                                            <option key={option.id} value={option.id}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    }
                                })}
                            </optgroup>
                        </select>
                    )}
                    {fieldType === 'date' && (
                        <DataTableDateFilter
                            id="data"
                            value={props.filter.data}
                            onChangeAction={handleInputChangeDate}
                            readOnly={props.filter.readOnly}
                        />
                    )}
                </td>
            )}
            {isCustomProductField || props.filter.readOnly ? (
                <td />
            ) : (
                <td className="col-md-1">
                    <span className="glyphicon glyphicon-trash mybtn-danger" role="button" onClick={deleteRow} />
                </td>
            )}
        </tr>
    );
};

DataTableCustomFilter.propTypes = {
    fields: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
};

export default DataTableCustomFilter;
