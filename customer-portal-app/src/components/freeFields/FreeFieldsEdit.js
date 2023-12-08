import React, { useState } from 'react';
import moment from 'moment/moment';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextBlock from '../general/TextBlock';
import MoneyPresenter from '../../helpers/MoneyPresenter';
// import { checkFieldRecord } from '../../helpers/FreeFieldsHelpers';

function FreeFieldsEdit({
    freeFieldsFieldRecords,
    // setFreeFieldsFieldRecords,
    // switchToView,
    // recordId,
    // fetchFreeFieldsFieldRecords,
}) {
    // const [errors, setErrors] = useState({
    //     name: false,
    //     type: false,
    // });
    //
    // const [errorsMessage, setErrorsMessage] = useState({
    //     name: false,
    //     type: false,
    // });

    function handleInputChangeBoolean(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        handleInputChange(value, name, 'fieldRecordValueBoolean');
    }
    function handleInputChangeText(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        handleInputChange(value, name, 'fieldRecordValueText');
    }

    function handleInputChangeInt(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        handleInputChange(value, name, 'fieldRecordValueInt');
    }
    function handleInputChangeDouble(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        handleInputChange(value, name, 'fieldRecordValueDouble');
    }

    function handleInputChangeDate(date, name) {
        handleInputChange(date, name, 'fieldRecordValueDatetime');
    }

    function handleInputChangeDatetimeDate(dateOrTime, name) {
        const currentRecord = freeFieldsFieldRecords.find(record => 'record-' + record.id === name);

        let date = dateOrTime ? dateOrTime : '';
        let time = '08:00';
        if (currentRecord.fieldRecordValueDatetime) {
            time = moment(currentRecord.fieldRecordValueDatetime).format('HH:mm');
        }

        let value = '';
        // if (!validator.isEmpty(date)) {
        if (date != '') {
            value = moment(date + ' ' + time + ':00').format('YYYY-MM-DD HH:mm:ss');
        }

        handleInputChange(value, name, 'fieldRecordValueDatetime');
    }
    function handleInputChangeDatetimeTime(dateOrTime, name) {
        const currentRecord = freeFieldsFieldRecords.find(record => 'record-' + record.id === name);

        let date = '';
        let time = dateOrTime ? dateOrTime : '08:00';
        if (currentRecord.fieldRecordValueDatetime) {
            date = moment(currentRecord.fieldRecordValueDatetime).format('Y-MM-DD');
        }
        let value = '';
        // if (!validator.isEmpty(date)) {
        if (date != '') {
            value = moment(date + ' ' + time + ':00').format('YYYY-MM-DD HH:mm:ss');
        }

        handleInputChange(value, name, 'fieldRecordValueDatetime');
    }

    function handleInputChange(value, name, type) {
        // setFreeFieldsFieldRecords(
        //     freeFieldsFieldRecords.map(record => {
        //         if ('record-' + record.id === name) {
        //             return { ...record, [type]: value };
        //         } else {
        //             return {
        //                 ...record,
        //             };
        //         }
        //     })
        // );
    }

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //
    //     let hasErrors = false;
    //     let errorsMessage = {};
    //     let dynamicVariableName = {};
    //
    //     freeFieldsFieldRecords.map(record => {
    //         const response = checkFieldRecord(record);
    //         if (response) {
    //             errorsMessage['record' + record.id] = response;
    //             dynamicVariableName['record' + record.id] = true;
    //             hasErrors = true;
    //         }
    //     });
    // if (hasErrors) {
    //     console.log(errorsMessage);
    //     console.log(dynamicVariableName);
    // }
    //     setErrors(dynamicVariableName);
    //     setErrorsMessage(errorsMessage);
    //
    //     if (!hasErrors) {
    //         try {
    //             await FreeFieldsAPI.updateFreeFieldsFieldRecords(freeFieldsFieldRecords, recordId);
    //             // fetchFreeFieldsFieldRecords();
    //             switchToView();
    //         } catch (error) {
    //             console.log(error);
    //             alert('Er is iets misgegaan met het opslaan van de gegevens!');
    //         }
    //     }
    // }

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

export default FreeFieldsEdit;
