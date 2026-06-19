import React from 'react';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';
import InputDate from '../../../components/form/InputDate';
import InputTextArea from '../../../components/form/InputTextArea';
import InputDateTime from '../../../components/form/InputDateTime';

function FreeFieldsDefaultValueEdit({
    fieldFormatType,
    defaultValue,
    mandatory,
    errors,
    errorsMessage,
    handleInputChange,
    handleInputChangeDate,
    handleInputChangeDatetimeDate,
    handleInputChangeDatetimeTime,
}) {
    switch (fieldFormatType) {
        case 'boolean':
            return (
                <InputToggle
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChange}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'text_short':
            return (
                <InputText
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChange}
                    type={'text'}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'text_long':
            return (
                <InputTextArea
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChange}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'int':
            return (
                <InputText
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChange}
                    type={'number'}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'double_2_dec':
            return (
                <InputText
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChange}
                    type={'number'}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'amount_euro':
            return (
                <InputText
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChange}
                    type={'number'}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'date':
            return (
                <InputDate
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeAction={handleInputChangeDate}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                />
            );
        case 'datetime':
            return (
                <InputDateTime
                    label={'Standaard waarde'}
                    name={'defaultValue'}
                    value={defaultValue}
                    onChangeActionDate={handleInputChangeDatetimeDate}
                    onChangeActionTime={handleInputChangeDatetimeTime}
                    required={mandatory ? 'required' : ''}
                    error={errors.defaultValue}
                    errorMessage={errorsMessage.defaultValue}
                    nullable={true}
                />
            );
    }
}

export default FreeFieldsDefaultValueEdit;
