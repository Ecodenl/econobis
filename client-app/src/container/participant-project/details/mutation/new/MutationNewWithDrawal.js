import React from 'react';
import InputText from '../../../../../components/form/InputText';
import InputDate from '../../../../../components/form/InputDate';

const MutationNewWithDrawal = ({
    amount,
    quantity,
    datePayment,
    dateEntry,
    errors,
    handleInputChange,
    handleInputChangeDate,
    handleBlurAmount,
    projectTypeCodeRef,
}) => {
    return (
        <React.Fragment>
            <div className="row">
                {projectTypeCodeRef === 'loan' ? (
                    <InputText
                        type={'number'}
                        label={'Bedrag'}
                        name={'amount'}
                        id={'amount'}
                        value={amount}
                        onChangeAction={handleInputChange}
                        onBlurAction={handleBlurAmount}
                        required={'required'}
                        error={errors.amount}
                    />
                ) : (
                    <InputText
                        type={'number'}
                        label={'Aantal'}
                        name={'quantity'}
                        id={'quantity'}
                        value={quantity}
                        onChangeAction={handleInputChange}
                        required={'required'}
                        error={errors.quantity}
                    />
                )}
                <InputDate
                    label={'Ingangsdatum'}
                    name={'dateEntry'}
                    id={'dateEntry'}
                    value={dateEntry}
                    onChangeAction={handleInputChangeDate}
                    required={'required'}
                    error={errors.dateEntry}
                />
            </div>
            <div className="row">
                <InputDate
                    label={'Betaaldatum'}
                    name={'datePayment'}
                    id={'datePayment'}
                    value={datePayment}
                    onChangeAction={handleInputChangeDate}
                />
            </div>
        </React.Fragment>
    );
};

export default MutationNewWithDrawal;
