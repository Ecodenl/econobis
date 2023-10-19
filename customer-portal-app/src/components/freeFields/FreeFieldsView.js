import React from 'react';
import moment from 'moment';
import MoneyPresenter from '../../helpers/MoneyPresenter';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextBlock from '../general/TextBlock';

function FreeFieldsView({ freeFieldsFieldRecords, switchToEdit }) {
    return (
        <Col xs={12} md={6}>
            {freeFieldsFieldRecords.map(record => {
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
                                        {record.fieldRecordValueDouble
                                            ? MoneyPresenter(record.fieldRecordValueDouble)
                                            : ''}
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
            })}
        </Col>
    );
}

export default FreeFieldsView;
