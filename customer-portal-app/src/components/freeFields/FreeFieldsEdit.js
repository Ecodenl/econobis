import React, { useState } from 'react';
import moment from 'moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextBlock from '../general/TextBlock';
import { Field } from 'formik';
import InputText from '../form/InputText';
import InputTextCurrency from '../form/InputTextCurrency';
import InputTextDate from '../form/InputTextDate';
import { checkFieldRecord } from '../../helpers/FreeFieldsHelpers';
import InputCheckBox from '../form/InputCheckBox';
import InputTextArea from '../form/InputTextArea';

function FreeFieldsEdit({
    freeFieldsFieldRecords,
    touched,
    errors,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    values,
    layout,
}) {
    const isSingleColumn = layout === 'single';

    const handleFieldChange = (record, fieldRecordName, valueType, value) => {
        // Update the field value
        setFieldValue(fieldRecordName, value);

        // Perform validation for the current field
        const validationError = checkFieldRecord({ ...record, [valueType]: value });

        if (validationError) {
            // Set an error if validation fails
            setFieldError(fieldRecordName, validationError);
        } else {
            // Clear the error for the current field only if it is now valid
            setFieldError(fieldRecordName, undefined);

            // Check if all fields are valid to potentially clear empty errors.freeFieldsFieldRecords
            const allFieldsValid = freeFieldsFieldRecords.every(
                rec => !errors.freeFieldsFieldRecords[`record-${rec.id}`]
            );
            if (allFieldsValid) {
                setFieldError('freeFieldsFieldRecords', undefined);
            }
        }

        setFieldTouched(fieldRecordName, true, false);
    };

    return (
        <Row>
            {freeFieldsFieldRecords.map(record => {
                const fieldRecordName = `freeFieldsFieldRecords.record-${record.id}`;
                const fieldValue = values.freeFieldsFieldRecords[`record-${record.id}`] || null;

                return (
                    <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                        <FormLabel className={`field-label ${record.mandatory ? 'required' : ''}`}>
                            {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                            {record.mandatory ? 'Ja' : 'Nee'}
                        </FormLabel>
                        {record.changePortal ? (
                            <Field name={fieldRecordName}>
                                {({ field }) => {
                                    const fieldTypeComponent = {
                                        boolean: (
                                            <InputCheckBox
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                id={fieldRecordName}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueBoolean',
                                                        e.target.checked
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                                label={
                                                    <span
                                                        htmlFor={`change-${fieldRecordName}`}
                                                        className="checkbox-label w-form-label ml-2"
                                                    >
                                                        {field.value ? 'Ja' : 'Nee'}
                                                    </span>
                                                }
                                            />
                                        ),
                                        text_short: (
                                            <InputText
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                id={fieldRecordName}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueText',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                        text_long: (
                                            <InputTextArea
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                className={'form-control'}
                                                id={fieldRecordName}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueText',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                        int: (
                                            <InputText
                                                type="number"
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                id={fieldRecordName}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueInt',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                        double_2_dec: (
                                            <InputTextCurrency
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                id={fieldRecordName}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueDouble',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                        amount_euro: (
                                            <InputTextCurrency
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                id={fieldRecordName}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueDouble',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                        date: (
                                            <InputTextDate
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                type="date"
                                                id={fieldRecordName}
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueDatetime',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                        datetime: (
                                            <InputTextDate
                                                field={
                                                    field || {
                                                        name: fieldRecordName,
                                                        value: fieldValue,
                                                        onChange: () => {},
                                                    }
                                                }
                                                type="datetime-local"
                                                id={fieldRecordName}
                                                step="900"
                                                customOnChange={e =>
                                                    handleFieldChange(
                                                        record,
                                                        fieldRecordName,
                                                        'fieldRecordValueDatetime',
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors}
                                                touched={touched}
                                            />
                                        ),
                                    };

                                    return (
                                        <>
                                            {/*{get(errors, field.name, '') && get(touched, field.name, '') && (*/}
                                            {/*    <small className="text-danger">{get(errors, field.name, '')}</small>*/}
                                            {/*)}*/}
                                            {fieldTypeComponent[record.fieldFormatType]}
                                        </>
                                    );
                                }}
                            </Field>
                        ) : (
                            <TextBlock className="col-12" placeholder={''}>
                                {(() => {
                                    switch (record.fieldFormatType) {
                                        case 'boolean':
                                            return fieldValue ? 'Ja' : 'Nee';
                                        case 'double_2_dec':
                                            return fieldValue ? parseFloat(fieldValue).toFixed(2) : '';
                                        case 'amount_euro':
                                            return fieldValue ? MoneyPresenter(fieldValue) : '';
                                        case 'date':
                                            return fieldValue ? moment(fieldValue).format('L') : '';
                                        case 'datetime':
                                            const valueTime = fieldValue ? moment(fieldValue).format('HH:mm') : '00:00';
                                            return valueTime === '00:00'
                                                ? `${moment(fieldValue).format('L')} (onbekend)`
                                                : moment(fieldValue).format('L HH:mm');
                                        default:
                                            return fieldValue || '';
                                    }
                                })()}
                            </TextBlock>
                        )}
                    </Col>
                );
            })}
        </Row>
    );
}

export default FreeFieldsEdit;
