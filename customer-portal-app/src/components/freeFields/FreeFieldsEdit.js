import React, { useState } from 'react';
import moment from 'moment/moment';
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

    return (
        <Row>
            {freeFieldsFieldRecords.map(record => {
                const fieldRecordName = `freeFieldsFieldRecords.record-${record.id}`;

                const fieldValue = values.freeFieldsFieldRecords[`record-${record.id}`]
                    ? values.freeFieldsFieldRecords[`record-${record.id}`]
                    : null;

                switch (record.fieldFormatType) {
                    case 'boolean':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <>
                                                <label className="w-checkbox checkbox-fld">
                                                    <input
                                                        type="checkbox"
                                                        {...field}
                                                        id={`change-${fieldRecordName}`}
                                                        checked={field.value}
                                                        className="w-checkbox-input checkbox"
                                                        value={false}
                                                    />
                                                    <span
                                                        htmlFor={`change-${fieldRecordName}`}
                                                        className="checkbox-label w-form-label"
                                                    >
                                                        {Boolean(field.value) === true ? 'Ja' : 'Nee'}
                                                    </span>
                                                    {touched[fieldRecordName] && errors[fieldRecordName] ? (
                                                        <div className={'error-message text-danger'}>
                                                            {errors[fieldRecordName]}
                                                        </div>
                                                    ) : null}
                                                </label>
                                            </>
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className="col-12" placeholder={''}>
                                        {Boolean(fieldValue) === true ? 'Ja' : 'Nee'}
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'text_short':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id} className="mb-3">
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <InputText
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id={fieldRecordName}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
                                                customOnChange={e => {
                                                    const newValue = e.target.value;
                                                    setFieldValue(fieldRecordName, newValue);

                                                    // Immediate validation on change
                                                    const validationError = checkFieldRecord({
                                                        ...record,
                                                        fieldRecordValueText: newValue,
                                                    });

                                                    if (validationError) {
                                                        setFieldError(fieldRecordName, validationError); // Set the error
                                                        setFieldTouched(fieldRecordName, true, false); // Mark field as touched
                                                    } else {
                                                        setFieldError(fieldRecordName, undefined); // Clear the specific error if validation passes

                                                        // Check if we should clear the entire section of errors
                                                        const allFieldsValid = freeFieldsFieldRecords.every(
                                                            rec => !errors[`freeFieldsFieldRecords.record-${rec.id}`]
                                                        );
                                                        if (allFieldsValid) {
                                                            // Clear the entire freeFieldsFieldRecords object if no errors exist
                                                            setFieldError('freeFieldsFieldRecords', undefined);
                                                        }
                                                        setFieldTouched(fieldRecordName, true, false); // Ensure touched is still set
                                                    }
                                                }}
                                            />
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className="col-12" placeholder={''}>
                                        {fieldValue || ''}
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'text_long':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id} className="mb-3">
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field
                                        name={fieldRecordName}
                                        as="textarea"
                                        className="form-control"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    />
                                ) : (
                                    <TextBlock className={'col-12'} placeholder={''}>
                                        <p className={'text-left'} style={{ whiteSpace: 'break-spaces' }}>
                                            {fieldValue || ''}
                                        </p>
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'int':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <InputText
                                                type="number"
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id={fieldRecordName}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
                                            />
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className={'col-12'} placeholder={''}>
                                        {fieldValue || ''}
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'double_2_dec':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <InputTextCurrency
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id={fieldRecordName}
                                            />
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className="col-12" placeholder={''}>
                                        {fieldValue ? parseFloat(fieldValue).toFixed(2) : ''}
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'amount_euro':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <InputTextCurrency
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id={fieldRecordName}
                                            />
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className="col-12" placeholder={''}>
                                        {fieldValue ? MoneyPresenter(fieldValue) : ''}
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'date':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="date"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id={fieldRecordName}
                                            />
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className={'col-12'} placeholder={''}>
                                        {fieldValue ? moment(fieldValue).format('L') : ''}
                                    </TextBlock>
                                )}
                            </Col>
                        );
                        break;
                    case 'datetime':
                        const valueTime = fieldValue ? moment(fieldValue).format('HH:mm') : '00:00';
                        const dateTimeFormated = fieldValue
                            ? valueTime === '00:00'
                                ? moment(fieldValue).format('L') + ' (onbekend)'
                                : moment(fieldValue).format('L HH:mm')
                            : '';

                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>
                                    {record.fieldName} Wijzigbaar: {record.changePortal ? 'Ja' : 'Nee'} Verplicht:{' '}
                                    {record.mandatory ? 'Ja' : 'Nee'}
                                </FormLabel>
                                {record.changePortal ? (
                                    <Field name={fieldRecordName}>
                                        {({ field }) => (
                                            <InputTextDate
                                                field={field}
                                                type="datetime-local"
                                                errors={errors}
                                                touched={touched}
                                                onChangeAction={setFieldValue}
                                                id={fieldRecordName}
                                                step="900"
                                            />
                                        )}
                                    </Field>
                                ) : (
                                    <TextBlock className={'col-12'} placeholder={''}>
                                        {dateTimeFormated}
                                    </TextBlock>
                                )}
                            </Col>
                        );

                        break;
                }
            })}
        </Row>
    );
}

export default FreeFieldsEdit;
