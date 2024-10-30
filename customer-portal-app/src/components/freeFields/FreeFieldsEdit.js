import React, { useState } from 'react';
import moment from 'moment/moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextBlock from '../general/TextBlock';
import { Field } from 'formik';
import InputText from '../form/InputText';
// import { checkFieldRecord } from '../../helpers/FreeFieldsHelpers';

function FreeFieldsEdit({ freeFieldsFieldRecords, touched, errors, setFieldValue, values, layout }) {
    const isSingleColumn = layout === 'single';

    return (
        <Row>
            {freeFieldsFieldRecords.map(record => {
                const fieldName = `freeFieldsFieldRecords.record-${record.id}`;

                const fieldValue = values.freeFieldsFieldRecords[`record-${record.id}`]
                    ? values.freeFieldsFieldRecords[`record-${record.id}`]
                    : null;

                switch (record.fieldFormatType) {
                    case 'boolean':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className="col-12" placeholder={''}>
                                    {Boolean(fieldValue) === true ? 'Ja' : 'Nee'}
                                </TextBlock>
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
                                    <Field name={fieldName}>
                                        {({ field }) => (
                                            <InputText
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id={`record-${record.id}`}
                                                placeholder={record.fieldName}
                                                required={record.mandatory}
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
                                        name={fieldName}
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
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                    {fieldValue || ''}
                                </TextBlock>
                            </Col>
                        );
                        break;
                    case 'double_2_dec':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                    {fieldValue ? parseFloat(fieldValue).toFixed(2) : ''}
                                </TextBlock>
                            </Col>
                        );
                        break;
                    case 'amount_euro':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                    {fieldValue ? MoneyPresenter(fieldValue) : ''}
                                </TextBlock>
                            </Col>
                        );
                        break;
                    case 'date':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                    {fieldValue ? moment(fieldValue).format('L') : ''}
                                </TextBlock>
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
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                    {dateTimeFormated}
                                </TextBlock>
                            </Col>
                        );

                        break;
                }
            })}
        </Row>
    );
}

export default FreeFieldsEdit;
