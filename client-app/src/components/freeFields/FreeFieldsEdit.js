import React, { useEffect, useState } from 'react';
import InputText from '../form/InputText';
import InputToggle from '../form/InputToggle';
import ButtonText from '../button/ButtonText';
import InputDate from '../form/InputDate';
import InputTime from '../form/InputTime';
import moment from 'moment/moment';
import InputTextArea from '../form/InputTextArea';
import FreeFieldsAPI from '../../api/free-fields/FreeFieldsAPI';
import validator from 'validator';

function FreeFieldsEdit({
    freeFieldsFieldRecords,
    setFreeFieldsFieldRecords,
    switchToView,
    objectId,
    fetchFreeFieldsFieldRecords,
}) {
    const [errors, setErrors] = useState({
        name: false,
        type: false,
    });

    const [errorsMessage, setErrorsMessage] = useState({
        name: false,
        type: false,
    });

    function checkMask(value, mask, mandatory) {
        console.log('checkMask');
        console.log(value);
        console.log(mask);
        //if not mandatory and field is empty, we dont need to do this check
        if (mandatory == 0 && value == null) {
            return false;
        }

        //check if the value complies with the mask
        if (mandatory == 1 && value != null && mask != null) {
            //explode the mask
            let explodedMask = mask.split('');
            let explodedValue = value.split('');
            let i = 0;
            let isCorrect = true;

            //if mask contains no ? and value and mask are not the same length we can skip all this and return false
            if (!mask.includes('?') && mask.length != value.length) {
                return false;
            }

            for (i in explodedMask) {
                switch (explodedMask[i]) {
                    case '9':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[0-9]$/)) {
                            return false;
                        }
                        break;
                    case 'a':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[a-zA-Z]$/)) {
                            return false;
                        }
                        break;
                    case 'x':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[a-zA-Z0-9]$/)) {
                            return false;
                        }
                        break;
                    default:
                        if (explodedValue[i] != explodedMask[i]) {
                            return false;
                        }
                        break;
                }
            }
        }

        return true;
    }

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
        const value = date ? moment(date).format('Y-MM-DD') : '';

        handleInputChange(date, name, 'fieldRecordValueDatetime');
    }

    function handleInputChangeDatetime(date, name) {
        const value = date ? moment(date).format('Y-MM-DD') : '';

        handleInputChange(date, name, 'fieldRecordValueDatetime');
    }

    function handleInputChange(value, name, type) {
        let isTime = false;
        let isDate = false;

        if (name.endsWith('T')) {
            name = name.replace('T', '');
            isTime = true;
        }

        if (name.endsWith('D')) {
            name = name.replace('D', '');
            isDate = true;
        }

        setFreeFieldsFieldRecords(
            freeFieldsFieldRecords.map(record => {
                if ('record-' + record.id === name) {
                    //if isTime is true we want the new time combined with the old date since this is in a separate field
                    if (isTime) {
                        value = record.fieldRecordValueDatetime.split(' ')[0] + ' ' + value;
                    }
                    //if isDate is true we want the new date combined with the old time since this is in a separate field
                    if (isDate) {
                        value = value + ' ' + record.fieldRecordValueDatetime.split(' ')[1];
                    }

                    return { ...record, [type]: value };
                } else {
                    return {
                        ...record,
                    };
                }
            })
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let hasErrors = false;
        let errorsMessage = {};
        let dynamicVariableName = {};

        freeFieldsFieldRecords.map(record => {
            switch (record.fieldFormatType) {
                case 'boolean':
                    if (!checkMask(String(record.fieldRecordValueBoolean), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueBoolean) ||
                            record.fieldRecordValueBoolean == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
                case 'text_short':
                    if (!checkMask(String(record.fieldRecordValueText), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueText) || record.fieldRecordValueText == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'verplicht';
                    }
                    break;
                case 'text_long':
                    if (!checkMask(String(record.fieldRecordValueText), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueText) || record.fieldRecordValueText == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
                case 'int':
                    if (!checkMask(String(record.fieldRecordValueInt), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueInt) || record.fieldRecordValueInt == null)
                    ) {
                        dynamicVariableName['.record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
                case 'double_2_dec':
                    if (!checkMask(String(record.fieldRecordValueDouble), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueDouble) || record.fieldRecordValueDouble == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
                case 'amount_euro':
                    if (!checkMask(String(record.fieldRecordValueDouble), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueDouble) || record.fieldRecordValueDouble == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
                case 'date':
                    if (!checkMask(String(record.fieldRecordValueDatetime), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueDatetime) ||
                            record.fieldRecordValueDatetime == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
                case 'datetime':
                    if (!checkMask(String(record.fieldRecordValueDatetime), record.mask, record.mandatory)) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                        errorsMessage['record' + record.id] = 'voldoet niet aan het masker: ' + record.mask;
                    }
                    if (
                        record.mandatory == 1 &&
                        (validator.isEmpty('' + record.fieldRecordValueDatetime) ||
                            record.fieldRecordValueDatetime == null)
                    ) {
                        dynamicVariableName['record' + record.id] = true;
                        hasErrors = true;
                    }
                    break;
            }
        });

        setErrors(dynamicVariableName);
        setErrorsMessage(errorsMessage);

        if (!hasErrors) {
            try {
                await FreeFieldsAPI.updateFreeFieldsFieldRecords(freeFieldsFieldRecords, objectId);

                fetchFreeFieldsFieldRecords();
                switchToView();
            } catch (error) {
                console.log(error);
                alert('Er is iets misgegaan met het opslaan van de gegevens!');
            }
        }
    }

    let inputField = null;

    return (
        <>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className={`panel panel-default`}>
                    <div className="panel-heading ">
                        <span className="h5 text-bold">Vrije velden</span>
                    </div>
                    <div className="panel-body ">
                        <div className="row">
                            {freeFieldsFieldRecords &&
                                freeFieldsFieldRecords.length > 0 &&
                                freeFieldsFieldRecords.map(record => {
                                    switch (record.fieldFormatType) {
                                        case 'boolean':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputToggle
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueBoolean}
                                                        onChangeAction={handleInputChangeBoolean}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'text_short':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputText
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueText}
                                                        onChangeAction={handleInputChangeText}
                                                        type={'text'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'text_long':
                                            return (
                                                <div className="col-xs-12">
                                                    <InputTextArea
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueText}
                                                        onChangeAction={handleInputChangeText}
                                                        sizeLabel={'col-sm-3'}
                                                        sizeInput={'col-sm-9'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'int':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputText
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueInt}
                                                        onChangeAction={handleInputChangeInt}
                                                        type={'number'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'double_2_dec':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputText
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueDouble}
                                                        onChangeAction={handleInputChangeDouble}
                                                        type={'number'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'amount_euro':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputText
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueDouble}
                                                        onChangeAction={handleInputChangeDouble}
                                                        type={'number'}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'date':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputDate
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueDatetime}
                                                        onChangeAction={handleInputChangeDate}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={errorsMessage['record' + record.id]}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'datetime':
                                            return (
                                                <div className="col-xs-6">
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <InputDate
                                                                label={record.fieldName}
                                                                name={'record-' + record.id + 'D'}
                                                                value={moment(record.fieldRecordValueDatetime).format(
                                                                    'Y-MM-DD'
                                                                )}
                                                                onChangeAction={handleInputChangeDatetime}
                                                                divSize={'col-sm-6'}
                                                                labelSize={'col-sm-8'}
                                                                size={'col-sm-4'}
                                                                required={record.mandatory ? 'required' : ''}
                                                                error={errors['record' + record.id]}
                                                                errorMessage={errorsMessage['record' + record.id]}
                                                            />

                                                            <InputTime
                                                                label={''}
                                                                name={'record-' + record.id + 'T'}
                                                                value={moment(record.fieldRecordValueDatetime).format(
                                                                    'LT'
                                                                )}
                                                                onChangeAction={handleInputChangeDatetime}
                                                                divSize={'col-sm-3'}
                                                                labelSize={'col-sm-0'}
                                                                size={'col-sm-12'}
                                                                required={record.mandatory ? 'required' : ''}
                                                                error={errors['record' + record.id]}
                                                                errorMessage={errorsMessage['record' + record.id]}
                                                                readOnly={false}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                            break;
                                    }
                                })}
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="pull-right btn-group" role="group">
                                    <ButtonText
                                        buttonClassName={'btn-default'}
                                        buttonText={'Sluiten'}
                                        onClickAction={switchToView}
                                    />
                                    <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FreeFieldsEdit;
