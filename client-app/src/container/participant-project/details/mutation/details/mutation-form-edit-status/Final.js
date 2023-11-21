import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';

const MutationFormEditStatusFinal = ({
    readOnly,
    participantMutationFromState,
    participantMutationFromProps,
    handleInputChange,
    handleInputChangeDate,
    errors,
    errorMessage,
    projectTypeCodeRef,
    disableBeforeEntryDate,
}) => (
    <React.Fragment>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <ViewText
                    label={'Bedrag interesse'}
                    id={'amountInterest'}
                    className={'col-sm-6 form-group'}
                    value={MoneyPresenter(participantMutationFromProps.amountInterest)}
                />
            ) : (
                <ViewText
                    label={'Aantal interesse'}
                    id={'quantityInterest'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.quantityInterest}
                />
            )}
            <ViewText
                label={'Interessedatum'}
                id={'dateInterest'}
                className={'col-sm-6 form-group'}
                value={
                    participantMutationFromProps.dateInterest &&
                    moment(participantMutationFromProps.dateInterest).format('L')
                }
            />
        </div>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <ViewText
                    label={'Bedrag inschrijving'}
                    id={'amountOption'}
                    className={'col-sm-6 form-group'}
                    value={MoneyPresenter(participantMutationFromProps.amountOption)}
                />
            ) : (
                <ViewText
                    label={'Aantal inschrijving'}
                    id={'quantityOption'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.quantityOption}
                />
            )}
            <ViewText
                label={'Inschrijvingsdatum'}
                id={'dateOption'}
                className={'col-sm-6 form-group'}
                value={
                    participantMutationFromProps.dateOption &&
                    moment(participantMutationFromProps.dateOption).format('L')
                }
            />
        </div>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <ViewText
                    label={'Bedrag toegekend'}
                    id={'amountGranted'}
                    className={'col-sm-6 form-group'}
                    value={MoneyPresenter(participantMutationFromProps.amountGranted)}
                />
            ) : (
                <ViewText
                    label={'Aantal toegekend'}
                    id={'quantityGranted'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.quantityGranted}
                />
            )}
            <ViewText
                label={'Toewijzingsdatum'}
                id={'dateGranted'}
                className={'col-sm-6 form-group'}
                value={
                    participantMutationFromProps.dateGranted &&
                    moment(participantMutationFromProps.dateGranted).format('L')
                }
            />
        </div>

        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                readOnly ? (
                    <ViewText
                        label={'Bedrag definitief'}
                        id={'amountFinal'}
                        className={'col-sm-6 form-group'}
                        value={MoneyPresenter(participantMutationFromProps.amountFinal)}
                    />
                ) : (
                    <InputText
                        type={'number'}
                        label={'Bedrag definitief'}
                        id={'amountFinal'}
                        name={'amountFinal'}
                        value={participantMutationFromState.amountFinal}
                        onChangeAction={handleInputChange}
                        required={'required'}
                        readOnly={!participantMutationFromProps.changeAllowed}
                        error={errors.amountFinal}
                        errorMessage={errorMessage.amountFinal}
                    />
                )
            ) : readOnly ? (
                <ViewText
                    label={'Aantal definitief'}
                    id={'quantityFinal'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.quantityFinal}
                />
            ) : (
                <InputText
                    type={'number'}
                    label={'Aantal definitief'}
                    id={'quantityFinal'}
                    name={'quantityFinal'}
                    value={participantMutationFromState.quantityFinal}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    disabled={!participantMutationFromProps.changeAllowed}
                    readOnly={!participantMutationFromProps.changeAllowed}
                    error={errors.quantityFinal}
                    errorMessage={errorMessage.quantityFinal}
                />
            )}
            {readOnly ? (
                <ViewText
                    label={'Ingangsdatum'}
                    id={'dateEntry'}
                    className={'col-sm-6 form-group'}
                    value={moment(participantMutationFromProps.dateEntry).format('L')}
                />
            ) : (
                <InputDate
                    label={'Ingangsdatum'}
                    name={'dateEntry'}
                    value={participantMutationFromState.dateEntry}
                    onChangeAction={handleInputChangeDate}
                    disabledBefore={disableBeforeEntryDate}
                    required={'required'}
                    readOnly={!participantMutationFromProps.changeAllowed}
                    error={errors.dateEntry}
                />
            )}
        </div>
        {readOnly ? (
            <div className="row">
                <ViewText
                    label={'Contract retour'}
                    id={'dateContractRetour'}
                    className={'col-sm-6 form-group'}
                    value={
                        participantMutationFromProps.dateContractRetour
                            ? moment(participantMutationFromProps.dateContractRetour).format('L')
                            : ''
                    }
                />
                <ViewText
                    label={'Betaal datum'}
                    id={'datePayment'}
                    className={'col-sm-6 form-group'}
                    value={
                        participantMutationFromProps.dateContractRetour
                            ? moment(participantMutationFromProps.dateContractRetour).format('L')
                            : ''
                    }
                />
            </div>
        ) : (
            <div className="row">
                <InputDate
                    label={'Contract retour'}
                    name={'dateContractRetour'}
                    value={participantMutationFromState.dateContractRetour}
                    onChangeAction={handleInputChangeDate}
                />
                <InputDate
                    label={'Betaal datum'}
                    name={'datePayment'}
                    value={participantMutationFromState.datePayment}
                    onChangeAction={handleInputChangeDate}
                />
            </div>
        )}
        <div className="row">
            <div className={'form-group col-md-6'} />
            {readOnly ? (
                <ViewText
                    label={'Betalingskenmerk'}
                    id={'paymentReference'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.paymentReference}
                />
            ) : (
                <InputText
                    label={'Betalingskenmerk'}
                    id={'paymentReference'}
                    name={'paymentReference'}
                    value={participantMutationFromState.paymentReference}
                    onChangeAction={handleInputChange}
                />
            )}
        </div>
    </React.Fragment>
);

export default MutationFormEditStatusFinal;
