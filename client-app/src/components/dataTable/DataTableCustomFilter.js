import React from 'react';
import PropTypes from 'prop-types';
import DataTableCustomFilterSelectString from './DataTableCustomFilterSelectString';
import DataTableCustomFilterSelectStringWithoutNull from './DataTableCustomFilterSelectStringWithoutNull';
import DataTableCustomFilterSelectNumber from './DataTableCustomFilterSelectNumber';
import DataTableCustomFilterSelectNumberOrString from './DataTableCustomFilterSelectNumberOrString';
import DataTableCustomFilterSelectDropdown from './DataTableCustomFilterSelectDropdown';
import DataTableCustomFilterSelectDate from './DataTableCustomFilterSelectDate';
import DataTableCustomFilterSelectBoolean from './DataTableCustomFilterSelectBoolean';
import DataTableCustomFilterSelectDropdownHas from './DataTableCustomFilterSelectDropdownHas';
import DataTableCustomFilterSelectDropdownRelations from './DataTableCustomFilterSelectDropdownRelations';
import DataTableCustomFilterSelectDropdownHousingFileFields from './DataTableCustomFilterSelectDropdownHousingFileFields';
import DataTableCustomFilterSelectHousingFileField from './DataTableCustomFilterSelectHousingFileField';

import moment from 'moment';
import DataTableDateFilter from './DataTableDateFilter';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import DataTableHousingFileFieldFilter from './DataTableHousingFileFieldFilter';
import DataTableCustomFilterSelectDropdownFreeFields from './DataTableCustomFilterSelectDropdownFreeFields';
import DataTableCustomFilterSelectFreeFieldsField from './DataTableCustomFilterSelectFreeFieldsField';
import DataTableFreeFieldsFieldFilter from './DataTableFreeFieldsFieldFilter';

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
        if (
            key === 'opportunityStatus' ||
            key === 'opportunityMeasure' ||
            key === 'opportunityEvaluationRealised' ||
            key === 'opportunityCampaign'
        )
            return;
        if (key === 'intakeDateStart' || key === 'intakeDateFinish' || key === 'intakeStatus') return;
        if (key === 'housingFileFieldValue') return;
        if (key === 'freeFieldsFieldValue') return;
        if (props.contactType === 'organisation' && key === 'portalUser') return;

        return (
            <option key={i} value={key}>
                {value.name}
            </option>
        );
    });

    const isCustomProductField = field === 'dateStart' || field === 'dateFinish' || field === 'orderStatus';
    const isCustomOpportunityField =
        field === 'opportunityStatus' ||
        field === 'opportunityMeasure' ||
        field === 'opportunityEvaluationRealised' ||
        field === 'opportunityCampaign';
    const isCustomIntakeField = field === 'intakeDateStart' || field === 'intakeDateFinish' || field === 'intakeStatus';
    const isCustomHousingFileField = field === 'housingFileFieldValue';
    const isCustomFreeFieldsField = field === 'freeFieldsFieldValue';
    const fieldType = props.fields[props.filter.field].type;
    const optionName = props.fields[props.filter.field].optionName
        ? props.fields[props.filter.field].optionName
        : 'name';

    const housingFileField = props.filter.housingFileField;
    const freeFieldFormatType = props.filter.freeFieldFormatType;

    return (
        <tr>
            <td className="col-md-4">
                {isCustomProductField ||
                isCustomOpportunityField ||
                isCustomIntakeField ||
                isCustomHousingFileField ||
                isCustomFreeFieldsField ? (
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
                {fieldType === 'stringWithoutNull' && (
                    <DataTableCustomFilterSelectStringWithoutNull
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
                {fieldType === 'numberOrString' && (
                    <DataTableCustomFilterSelectNumberOrString
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'boolean' && (
                    <DataTableCustomFilterSelectBoolean
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
                {fieldType === 'dropdownHas' && (
                    <DataTableCustomFilterSelectDropdownHas
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'dropdownHousingFileFields' && (
                    <DataTableCustomFilterSelectDropdownHousingFileFields
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'housingFileFieldValue' && (
                    <DataTableCustomFilterSelectHousingFileField
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                        housingFileField={housingFileField}
                    />
                )}
                {fieldType === 'dropdownFreeFields' && (
                    <DataTableCustomFilterSelectDropdownFreeFields
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
                {fieldType === 'freeFieldsFieldValue' && (
                    <DataTableCustomFilterSelectFreeFieldsField
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                        freeFieldFormatType={freeFieldFormatType}
                    />
                )}
                {fieldType === 'dropdownRelations' && (
                    <DataTableCustomFilterSelectDropdownRelations
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                        contactType={props.contactType}
                    />
                )}
                {fieldType === 'date' && (
                    <DataTableCustomFilterSelectDate
                        handleInputChange={handleInputChange}
                        type={type}
                        readOnly={props.filter.readOnly}
                    />
                )}
            </td>
            <td className="col-md-4">
                {props.filter.type !== 'nl' &&
                    props.filter.type !== 'nnl' &&
                    props.filter.type !== 'is0' &&
                    props.filter.type !== 'isn0' && (
                        <React.Fragment>
                            {(fieldType === 'number' ||
                                fieldType === 'string' ||
                                fieldType === 'numberOrString' ||
                                fieldType === 'stringWithoutNull') && (
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
                                    <option value="">--Willekeurige waarde--</option>
                                    {props.fields[props.filter.field].dropDownOptions.map(option => {
                                        return (
                                            <option key={option.id} value={option.id}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                            {fieldType === 'boolean' && (
                                <select
                                    className={`form-control input-sm`}
                                    id="data"
                                    name="data"
                                    value={props.filter.data}
                                    onChange={handleInputChange}
                                    disabled={props.filter.readOnly}
                                >
                                    {props.fields[props.filter.field].dropDownOptions.map(option => {
                                        return (
                                            <option key={option.id} value={option.id}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                            {fieldType === 'dropdownRelations' && (
                                <select
                                    className={`form-control input-sm`}
                                    id="data"
                                    name="data"
                                    value={props.filter.data}
                                    onChange={handleInputChange}
                                    disabled={props.filter.readOnly}
                                >
                                    <option value="">--Willekeurige waarde--</option>
                                    {props.fields[props.filter.field].dropDownOptions.map(option => {
                                        return (
                                            <option key={option.id} value={option.id}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    })}
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
                            {fieldType === 'dropdownHousingFileFields' && (
                                <select
                                    className={`form-control input-sm`}
                                    id="data"
                                    name="data"
                                    value={props.filter.data}
                                    onChange={handleInputChange}
                                    disabled={props.filter.readOnly}
                                >
                                    <option value="">--Kies een kenmerk--</option>
                                    {props.fields[props.filter.field].dropDownOptions.map(option => {
                                        return (
                                            <option key={option.key} value={option.key}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                            {fieldType === 'housingFileFieldValue' && (
                                <DataTableHousingFileFieldFilter
                                    id="data"
                                    name="data"
                                    value={props.filter.data}
                                    handleInputChange={handleInputChange}
                                    handleInputChangeDate={handleInputChangeDate}
                                    readOnly={props.filter.readOnly}
                                    housingFileField={housingFileField}
                                />
                            )}
                            {fieldType === 'dropdownFreeFields' && (
                                <select
                                    className={`form-control input-sm`}
                                    id="data"
                                    name="data"
                                    value={props.filter.data}
                                    onChange={handleInputChange}
                                    disabled={props.filter.readOnly}
                                >
                                    <option value="">--Kies een kenmerk--</option>
                                    {props.fields[props.filter.field].dropDownOptions.map(option => {
                                        return (
                                            <option key={option.key} value={option.key}>
                                                {option[optionName]}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                            {fieldType === 'freeFieldsFieldValue' && (
                                <DataTableFreeFieldsFieldFilter
                                    id="data"
                                    name="data"
                                    value={props.filter.data}
                                    handleInputChange={handleInputChange}
                                    handleInputChangeDate={handleInputChangeDate}
                                    readOnly={props.filter.readOnly}
                                    freeFieldFormatType={freeFieldFormatType}
                                />
                            )}
                        </React.Fragment>
                    )}
            </td>
            {isCustomProductField ||
            isCustomOpportunityField ||
            isCustomIntakeField ||
            isCustomHousingFileField ||
            isCustomFreeFieldsField ||
            props.filter.readOnly ? (
                <td />
            ) : (
                <td className="col-md-1">
                    <Icon className="mybtn-danger" size={14} icon={trash} role="button" onClick={deleteRow} />
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
