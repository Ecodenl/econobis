import React, { useState } from 'react';
import InputText from '../form/InputText';
import InputToggle from '../form/InputToggle';
import ButtonText from '../button/ButtonText';
import InputDate from '../form/InputDate';
import moment from 'moment/moment';
import InputTextArea from '../form/InputTextArea';
import FreeFieldsAPI from '../../api/free-fields/FreeFieldsAPI';
import InputDateTime from '../form/InputDateTime';
import { checkFieldRecord } from '../../helpers/FreeFieldsHelpers';
import validator from 'validator';

function FreeFieldsEdit({
    freeFieldsFieldRecords,
    setFreeFieldsFieldRecords,
    switchToView,
    recordId,
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
        if (!validator.isEmpty(date)) {
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
        if (!validator.isEmpty(date)) {
            value = moment(date + ' ' + time + ':00').format('YYYY-MM-DD HH:mm:ss');
        }

        handleInputChange(value, name, 'fieldRecordValueDatetime');
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

    function closeEdit() {
        fetchFreeFieldsFieldRecords();
        switchToView();
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let hasErrors = false;
        let errorsMessage = {};
        let dynamicVariableName = {};

        freeFieldsFieldRecords.map(record => {
            const response = checkFieldRecord(record);
            if (response) {
                errorsMessage['record' + record.id] = response;
                dynamicVariableName['record' + record.id] = true;
                hasErrors = true;
            }
        });
        // if (hasErrors) {
        //     console.log(errorsMessage);
        //     console.log(dynamicVariableName);
        // }
        setErrors(dynamicVariableName);
        setErrorsMessage(errorsMessage);

        if (!hasErrors) {
            try {
                await FreeFieldsAPI.updateFreeFieldsFieldRecords(freeFieldsFieldRecords, recordId);
                fetchFreeFieldsFieldRecords();
                switchToView();
            } catch (error) {
                console.log(error);
                alert('Er is iets misgegaan met het opslaan van de gegevens!');
            }
        }
    }

    return (
        <div className="panel-body ">
            <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
                <div className="row">
                    {freeFieldsFieldRecords &&
                        freeFieldsFieldRecords.length > 0 &&
                        freeFieldsFieldRecords.map(record => {
                            switch (record.fieldFormatType) {
                                case 'boolean':
                                    return (
                                        <InputToggle
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueBoolean}
                                            onChangeAction={handleInputChangeBoolean}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'text_short':
                                    return (
                                        <InputText
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueText}
                                            onChangeAction={handleInputChangeText}
                                            type={'text'}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'text_long':
                                    return (
                                        <InputTextArea
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueText}
                                            onChangeAction={handleInputChangeText}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'int':
                                    return (
                                        <InputText
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueInt}
                                            onChangeAction={handleInputChangeInt}
                                            type={'number'}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'double_2_dec':
                                    return (
                                        <InputText
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueDouble}
                                            onChangeAction={handleInputChangeDouble}
                                            type={'number'}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'amount_euro':
                                    return (
                                        <InputText
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueDouble}
                                            onChangeAction={handleInputChangeDouble}
                                            type={'number'}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'date':
                                    return (
                                        <InputDate
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueDatetime}
                                            onChangeAction={handleInputChangeDate}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                        />
                                    );
                                case 'datetime':
                                    return (
                                        <InputDateTime
                                            label={record.fieldName}
                                            name={'record-' + record.id}
                                            value={record.fieldRecordValueDatetime}
                                            onChangeActionDate={handleInputChangeDatetimeDate}
                                            onChangeActionTime={handleInputChangeDatetimeTime}
                                            required={record.mandatory ? 'required' : ''}
                                            error={errors['record' + record.id]}
                                            errorMessage={errorsMessage['record' + record.id]}
                                            nullable={true}
                                        />
                                    );
                            }
                        })}
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Sluiten'}
                                    onClickAction={closeEdit}
                                />
                                <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FreeFieldsEdit;
