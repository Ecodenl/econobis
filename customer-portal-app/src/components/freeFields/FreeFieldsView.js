import React from 'react';
import moment from 'moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextBlock from '../general/TextBlock';
import { Field } from 'formik';
import InputText from '../form/InputText';

function FreeFieldsView({ freeFieldsFieldRecords, values, layout }) {
    const isSingleColumn = layout === 'single';

    return (
        <Row>
            {freeFieldsFieldRecords.map(record => {
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
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className="field-label">{record.fieldName}</FormLabel>
                                <TextBlock className="col-12" placeholder={''}>
                                    {fieldValue || ''}
                                </TextBlock>
                            </Col>
                        );
                        break;
                    case 'text_long':
                        return (
                            <Col xs={12} md={isSingleColumn ? 12 : 6} key={record.id}>
                                <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                                <TextBlock className={'col-12'} placeholder={''}>
                                    <p className={'text-left'} style={{ whiteSpace: 'break-spaces' }}>
                                        {fieldValue || ''}
                                    </p>
                                </TextBlock>
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
function FreeFieldsView({ freeFieldsFieldRecords }) {
    return freeFieldsFieldRecords.map(record => {
        switch (record.fieldFormatType) {
            case 'boolean':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueBoolean == true ? 'Ja' : 'Nee'}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'text_short':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueText ? record.fieldRecordValueText : ''}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'text_long':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueText ? record.fieldRecordValueText : ''}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'int':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueInt ? record.fieldRecordValueInt : ''}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'double_2_dec':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueDouble
                                    ? parseFloat(record.fieldRecordValueDouble).toFixed(2)
                                    : ''}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'amount_euro':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueDouble ? MoneyPresenter(record.fieldRecordValueDouble) : ''}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'date':
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {record.fieldRecordValueDatetime
                                    ? moment(record.fieldRecordValueDatetime).format('L')
                                    : ''}
                            </TextBlock>
                        </Row>
                    </>
                );
                break;
            case 'datetime':
                const valueTime = moment(record.fieldRecordValueDatetime).format('HH:mm');
                const dateTimeFormated = record.fieldRecordValueDatetime
                    ? valueTime === '00:00'
                        ? moment(record.fieldRecordValueDatetime).format('L') + ' (onbekend)'
                        : moment(record.fieldRecordValueDatetime).format('L HH:mm')
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
                return (
                    <>
                        <FormLabel className={'field-label'}>{record.fieldName}</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-6'} placeholder={''}>
                                {dateTimeFormated}
                            </TextBlock>
                        </Row>
                    </>
                );
        }
    });
}

export default FreeFieldsView;
