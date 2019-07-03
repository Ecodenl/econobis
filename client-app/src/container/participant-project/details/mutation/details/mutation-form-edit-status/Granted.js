import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';

const MutationFormEditStatusGranted = ({
    participantMutationFromState,
    participantMutationFromProps,
    handleInputChange,
    handleInputChangeDate,
    errors,
    projectTypeCodeRef,
}) => (
    <React.Fragment>
        {participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId) ? (
            <React.Fragment>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <ViewText
                            label={'Bedrag interesse'}
                            id={'amountInterest'}
                            className={'col-sm-6 form-group'}
                            value={participantMutationFromProps.amountInterest}
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
                            moment(participantMutationFromProps.dateInterest.date).format('L')
                        }
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <ViewText
                            label={'Bedrag inschrijving'}
                            id={'amountOption'}
                            className={'col-sm-6 form-group'}
                            value={participantMutationFromProps.amountOption}
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
                            moment(participantMutationFromProps.dateOption.date).format('L')
                        }
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <ViewText
                            label={'Bedrag toegekend'}
                            id={'amountGranted'}
                            className={'col-sm-6 form-group'}
                            value={participantMutationFromProps.amountGranted}
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
                            moment(participantMutationFromProps.dateGranted.date).format('L')
                        }
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag definitief'}
                            id={'amountFinal'}
                            name={'amountFinal'}
                            value={participantMutationFromState.amountFinal}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountFinal}
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
                            error={errors.quantityFinal}
                        />
                    )}
                    <InputDate
                        label={'Ingangsdatum'}
                        name={'dateEntry'}
                        value={participantMutationFromState.dateEntry}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateEntry}
                    />
                </div>
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
            </React.Fragment>
        ) : (
            <React.Fragment>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <ViewText
                            label={'Bedrag interesse'}
                            id={'amountInterest'}
                            className={'col-sm-6 form-group'}
                            value={participantMutationFromProps.amountInterest}
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
                            moment(participantMutationFromProps.dateInterest.date).format('L')
                        }
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <ViewText
                            label={'Bedrag inschrijving'}
                            id={'amountOption'}
                            className={'col-sm-6 form-group'}
                            value={participantMutationFromProps.amountOption}
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
                            moment(participantMutationFromProps.dateOption.date).format('L')
                        }
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag toegekend'}
                            id={'amountGranted'}
                            name={'amountGranted'}
                            value={participantMutationFromState.amountGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountGranted}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal toegekend'}
                            id={'quantityGranted'}
                            name={'quantityGranted'}
                            value={participantMutationFromState.quantityGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityGranted}
                        />
                    )}
                    <InputDate
                        label={'Datum toegekend'}
                        name={'dateGranted'}
                        value={participantMutationFromState.dateGranted}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateGranted}
                    />
                </div>
            </React.Fragment>
        )}
    </React.Fragment>
);

export default MutationFormEditStatusGranted;
