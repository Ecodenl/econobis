import React, { useEffect, useState } from 'react';
import InputText from '../form/InputText';
import InputToggle from '../form/InputToggle';
import ButtonText from '../button/ButtonText';
import InputDate from '../form/InputDate';
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

    function handleInputChangeDatetime(date, name) {
        const value = date ? moment(date).format('Y-MM-DD') : '';

        handleInputChange(date, name, 'fieldRecordValueDatetime');
    }

    function handleInputChange(value, name, type) {
        setFreeFieldsFieldRecords(
            freeFieldsFieldRecords.map(record => {
                if ('record-' + record.id === name) {
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

        let errorsObj = {};
        let hasErrors = false;

        let dynamicVariableName = {};

        freeFieldsFieldRecords.map(record => {
            // if (validator.isEmpty('' + freeFieldsFieldRecords.typeId)) {
            //     errorsObj.type = true;
            //     hasErrors = true;
            // }

            if (record.mandatory == 1) {
                switch (record.fieldFormatType) {
                    case 'boolean':
                        if (validator.isEmpty('' + record.fieldRecordValueBoolean)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'text_short':
                        if (validator.isEmpty('' + record.fieldRecordValueText)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'text_long':
                        if (validator.isEmpty('' + record.fieldRecordValueText)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'int':
                        if (validator.isEmpty('' + record.fieldRecordValueInt)) {
                            dynamicVariableName['.record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'double_2_dec':
                        if (validator.isEmpty('' + record.fieldRecordValueDouble)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'amount_euro':
                        if (validator.isEmpty('' + record.fieldRecordValueDouble)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'date':
                        if (validator.isEmpty('' + record.fieldRecordValueDatetime)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                    case 'datetime':
                        if (validator.isEmpty('' + record.fieldRecordValueDatetime)) {
                            dynamicVariableName['record' + record.id] = true;
                            hasErrors = true;
                        }
                        break;
                }
            }
        });

        setErrors(dynamicVariableName);

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
                                                        errorMessage={'dit veld is verplicht'}
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
                                                        errorMessage={'dit veld is verplicht'}
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
                                                        errorMessage={'dit veld is verplicht'}
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
                                                        errorMessage={'dit veld is verplicht'}
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
                                                        errorMessage={'dit veld is verplicht'}
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
                                                        errorMessage={'dit veld is verplicht'}
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
                                                        onChangeAction={handleInputChangeDatetime}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={'dit veld is verplicht'}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case 'datetime':
                                            return (
                                                <div className="col-xs-6">
                                                    <InputDate
                                                        label={record.fieldName}
                                                        name={'record-' + record.id}
                                                        value={record.fieldRecordValueDatetime}
                                                        onChangeAction={handleInputChangeDatetime}
                                                        divSize={'col-sm-12'}
                                                        labelSize={'col-sm-6'}
                                                        size={'col-sm-6'}
                                                        required={record.mandatory ? 'required' : ''}
                                                        error={errors['record' + record.id]}
                                                        errorMessage={'dit veld is verplicht'}
                                                    />
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
