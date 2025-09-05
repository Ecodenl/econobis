import React, { useEffect, useState } from 'react';
import InputText from '../../../../../components/form/InputText';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment';
import ParticipantProjectDetailsAPI from '../../../../../api/participant-project/ParticipantProjectDetailsAPI';

const MutationNewWithDrawal = ({
    statusCodeRef,
    participationId,
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
    datePayment,
    paymentReference,
    dateEntry,
    errors,
    errorMessage,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
    disableBeforeEntryDate,
}) => {
    useEffect(() => {
        getAdditionalInfoForTerminatingOrChangeEntryDate(participationId);
    }, [participationId]);

    return (
        <React.Fragment>
            {statusCodeRef === 'interest' ? (
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag interesse'}
                            name={'amountInterest'}
                            id={'amountInterest'}
                            value={amountInterest}
                            onChangeAction={handleInputChange}
                            error={errors.amountInterest}
                            errorMessage={errorMessage.amountInterest}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal interesse'}
                            name={'quantityInterest'}
                            id={'quantityInterest'}
                            value={quantityInterest}
                            onChangeAction={handleInputChange}
                            error={errors.quantityInterest}
                            errorMessage={errorMessage.quantityInterest}
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
                            type={'number'}
                            label={'Bedrag inschrijving'}
                            name={'amountOption'}
                            id={'amountOption'}
                            value={amountOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountOption}
                            errorMessage={errorMessage.amountOption}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal inschrijving'}
                            name={'quantityOption'}
                            id={'quantityOption'}
                            value={quantityOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityOption}
                            errorMessage={errorMessage.quantityOption}
                        />
                    )}

                    <InputDate
                        label={'Inschrijvingsdatum'}
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
                            type={'number'}
                            label={'Bedrag toegekend'}
                            name={'amountGranted'}
                            id={'amountGranted'}
                            value={amountGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountGranted}
                            errorMessage={errorMessage.amountGranted}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal toegekend'}
                            name={'quantityGranted'}
                            id={'quantityGranted'}
                            value={quantityGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityGranted}
                            errorMessage={errorMessage.quantityGranted}
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
                                type={'number'}
                                label={'Bedrag definitief'}
                                name={'amountFinal'}
                                id={'amountFinal'}
                                value={amountFinal}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.amountFinal}
                                errorMessage={errorMessage.amountFinal}
                            />
                        ) : (
                            <InputText
                                type={'number'}
                                label={'Aantal definitief'}
                                name={'quantityFinal'}
                                id={'quantityFinal'}
                                value={quantityFinal}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.quantityFinal}
                                errorMessage={errorMessage.quantityFinal}
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
                            label={'Ingangsdatum'}
                            name={'dateEntry'}
                            id={'dateEntry'}
                            value={dateEntry}
                            onChangeAction={handleInputChangeDate}
                            disabledBefore={disableBeforeEntryDate}
                            required={'required'}
                            error={errors.dateEntry}
                            errorMessage={errorMessage.dateEntry}
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
                        <div className={'form-group col-md-6'} />
                        <InputText
                            label={'Betalingskenmerk'}
                            id={'paymentReference'}
                            name={'paymentReference'}
                            value={paymentReference}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                </React.Fragment>
            ) : null}
        </React.Fragment>
    );
};

export default MutationNewWithDrawal;
