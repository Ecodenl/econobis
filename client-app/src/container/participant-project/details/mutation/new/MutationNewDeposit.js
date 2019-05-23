import React from 'react';
import InputText from '../../../../../components/form/InputText';
import InputDate from '../../../../../components/form/InputDate';

const MutationNewDeposit = ({
    statusCodeRef,
    quantityInterest,
    amountInterest,
    dateInterest,
    quantityOption,
    amountOption,
    dateOption,
    quantityGranted,
    amountGranted,
    dateGranted,
    quantityFinal,
    amountFinal,
    dateContractRetour,
    datePayment,
    dateEntry,
    errors,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
}) => {
    return (
        <React.Fragment>
            {statusCodeRef === 'interest' ? (
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            label={'Bedrag interesse'}
                            name={'amountInterest'}
                            id={'amountInterest'}
                            value={amountInterest}
                            onChangeAction={handleInputChange}
                        />
                    ) : (
                        <InputText
                            label={'Aantal interesse'}
                            name={'quantityInterest'}
                            id={'quantityInterest'}
                            value={quantityInterest}
                            onChangeAction={handleInputChange}
                        />
                    )}

                    <InputDate
                        label={'Interesse datum'}
                        name={'dateInterest'}
                        id={'dateInterest'}
                        value={dateInterest}
                        onChangeAction={handleInputChangeDate}
                    />
                </div>
            ) : null}

            {statusCodeRef === 'option' ? (
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            label={'Bedrag optie'}
                            name={'amountOption'}
                            id={'amountOption'}
                            value={amountOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountOption}
                        />
                    ) : (
                        <InputText
                            label={'Aantal optie'}
                            name={'quantityOption'}
                            id={'quantityOption'}
                            value={quantityOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityOption}
                        />
                    )}

                    <InputDate
                        label={'Optiedatum'}
                        name={'dateOption'}
                        id={'dateOption'}
                        value={dateOption}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateOption}
                    />
                </div>
            ) : null}

            {statusCodeRef === 'granted' ? (
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            label={'Bedrag toegekend'}
                            name={'amountGranted'}
                            id={'amountGranted'}
                            value={amountGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountGranted}
                        />
                    ) : (
                        <InputText
                            label={'Aantal toegekend'}
                            name={'quantityGranted'}
                            id={'quantityGranted'}
                            value={quantityGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityGranted}
                        />
                    )}

                    <InputDate
                        label={'Toewijzingsdatum'}
                        name={'dateGranted'}
                        id={'dateGranted'}
                        value={dateGranted}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateGranted}
                    />
                </div>
            ) : null}

            {statusCodeRef === 'final' ? (
                <React.Fragment>
                    <div className="row">
                        {projectTypeCodeRef === 'loan' ? (
                            <InputText
                                label={'Bedrag definitief'}
                                name={'amountFinal'}
                                id={'amountFinal'}
                                value={amountFinal}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.amountFinal}
                            />
                        ) : (
                            <InputText
                                label={'Aantal definitief'}
                                name={'quantityFinal'}
                                id={'quantityFinal'}
                                value={quantityFinal}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.quantityFinal}
                            />
                        )}
                        <InputDate
                            label={'Toewijzingsdatum'}
                            name={'dateGranted'}
                            id={'dateGranted'}
                            value={dateGranted}
                            onChangeAction={handleInputChangeDate}
                        />
                    </div>
                    <div className="row">
                        <InputDate
                            label={'Contract retour'}
                            name={'dateContractRetour'}
                            id={'dateContractRetour'}
                            value={dateContractRetour}
                            onChangeAction={handleInputChangeDate}
                        />
                        <InputDate
                            label={'Betaaldatum'}
                            name={'datePayment'}
                            id={'datePayment'}
                            value={datePayment}
                            onChangeAction={handleInputChangeDate}
                        />
                    </div>
                    <div className="row">
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
                </React.Fragment>
            ) : null}
        </React.Fragment>
    );
};

export default MutationNewDeposit;
