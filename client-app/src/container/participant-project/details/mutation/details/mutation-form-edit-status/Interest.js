import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';

const MutationFormEditStatusInterest = ({
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
                            moment(participantMutationFromProps.dateInterest.date).format('L')
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
        ) : (
            <div className="row">
                {projectTypeCodeRef === 'loan' ? (
                    <InputText
                        type={'number'}
                        label={'Bedrag interesse'}
                        id={'amountInterest'}
                        name={'amountInterest'}
                        value={participantMutationFromState.amountInterest}
                        onChangeAction={handleInputChange}
                        error={errors.amountInterest}
                        errorMessage={errorMessage.amountInterest}
                    />
                ) : (
                    <InputText
                        type={'number'}
                        label={'Aantal interesse'}
                        id={'quantityInterest'}
                        name={'quantityInterest'}
                        value={participantMutationFromState.quantityInterest}
                        onChangeAction={handleInputChange}
                        error={errors.quantityInterest}
                        errorMessage={errorMessage.quantityInterest}
                    />
                )}
                <InputDate
                    label={'Interessedatum'}
                    name={'dateInterest'}
                    value={participantMutationFromState.dateInterest}
                    onChangeAction={handleInputChangeDate}
                />
            </div>
        )}
    </React.Fragment>
);

export default MutationFormEditStatusInterest;
