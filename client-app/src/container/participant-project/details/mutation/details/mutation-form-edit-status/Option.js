import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';

const MutationFormEditStatusOption = ({
    participantMutationFromState,
    participantMutationFromProps,
    handleInputChange,
    handleInputChangeDate,
    errors,
    errorMessage,
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
                        <InputText
                            type={'number'}
                            label={'Bedrag toegekend'}
                            id={'amountGranted'}
                            name={'amountGranted'}
                            value={participantMutationFromState.amountGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountGranted}
                            errorMessage={errorMessage.amountGranted}
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
                            errorMessage={errorMessage.quantityGranted}
                        />
                    )}
                    <InputDate
                        label={'Toewijzingsdatum'}
                        name={'dateGranted'}
                        value={participantMutationFromState.dateGranted}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateGranted}
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
                        <InputText
                            type={'number'}
                            label={'Bedrag inschrijving'}
                            id={'amountOption'}
                            name={'amountOption'}
                            value={participantMutationFromState.amountOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountOption}
                            errorMessage={errorMessage.amountOption}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal inschrijving'}
                            id={'quantityOption'}
                            name={'quantityOption'}
                            value={participantMutationFromState.quantityOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityOption}
                            errorMessage={errorMessage.quantityOption}
                        />
                    )}
                    <InputDate
                        label={'Inschrijvingsdatum'}
                        name={'dateOption'}
                        value={participantMutationFromState.dateOption}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateOption}
                    />
                </div>
            </React.Fragment>
        )}
    </React.Fragment>
);

export default MutationFormEditStatusOption;
