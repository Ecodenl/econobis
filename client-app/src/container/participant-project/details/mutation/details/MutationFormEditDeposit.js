import PanelBody from '../../../../../components/panel/PanelBody';
import ViewText from '../../../../../components/form/ViewText';
import InputSelect from '../../../../../components/form/InputSelect';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import MutationFormEditStatusInterest from './mutation-form-edit-status/Interest';
import MutationFormEditStatusOption from './mutation-form-edit-status/Option';
import MutationFormEditStatusGranted from './mutation-form-edit-status/Granted';
import MutationFormEditStatusFinal from './mutation-form-edit-status/Final';
import ParticipantDetailsMutationStatusLog from './status-log';
import ParticipantDetailsMutationConclusion from './conclusion';
import ButtonText from '../../../../../components/button/ButtonText';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ParticipantDetailsMutationMolliePayments from './mollie-payments';
import moment from 'moment';
import calculateTransactionCosts from '../../../../../helpers/CalculateTransactionCosts';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';
import ParticipantProjectDetailsAPI from '../../../../../api/participant-project/ParticipantProjectDetailsAPI';

function MutationFormEditDeposit({
    participationId,
    readOnly,
    participantMutationFromProps,
    participantMutationFromState,
    participantMutationStatusesOptions,
    projectTypeCodeRef,
    projectTransactionCostsCodeRef,
    projectCurrentBookWorth,
    handleInputChange,
    handleInputChangeDate,
    cancelDetails,
    handleSubmit,
    errors,
    errorMessage,
    buttonText,
    participantProjectDateRegister,
    participantBelongsToMembershipGroup,
    participantChoiceMembership,
    projectDateInterestBearingKwh,
    project,
    participationHasMutationsWithStatusDepositOrWithdrawal,
}) {
    useEffect(() => {
        getAdditionalInfoForTerminatingOrChangeEntryDate(participationId);
    }, [participationId]);

    function getAdditionalInfoForTerminatingOrChangeEntryDate(participantProjectId) {
        ParticipantProjectDetailsAPI.getAdditionalInfoForTerminatingOrChangeEntryDate(participantProjectId).then(
            payload => {
                setDisableBeforeEntryDate(
                    payload.dateTerminatedAllowedFrom
                        ? moment(payload.dateTerminatedAllowedFrom)
                              .add(1, 'day')
                              .format('YYYY-MM-DD')
                        : ''
                );
            }
        );
    }

    const [disableBeforeEntryDate, setDisableBeforeEntryDate] = useState('');

    // let disableBeforeEntryDate = '';
    // if (projectTypeCodeRef === 'postalcode_link_capital') {
    //     if (projectDateInterestBearingKwh) {
    //         disableBeforeEntryDate = moment(projectDateInterestBearingKwh).format('YYYY-MM-DD');
    //     }
    // }

    function calculateAmount() {
        let amountMutation = participantMutationFromState.amount;
        let quantityMutation = calculateQuantity();

        if (projectTypeCodeRef === 'loan') {
            if (participantMutationFromProps.status.codeRef === 'interest') {
                // next status alread selected
                if (participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId)) {
                    amountMutation = participantMutationFromState.amountOption;
                } else {
                    amountMutation = participantMutationFromState.amountInterest;
                }
            }
            if (participantMutationFromProps.status.codeRef === 'option') {
                // next status alread selected
                if (participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId)) {
                    amountMutation = participantMutationFromState.amountGranted;
                } else {
                    amountMutation = participantMutationFromState.amountOption;
                }
            }

            if (participantMutationFromProps.status.codeRef === 'granted') {
                // next status alread selected
                if (participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId)) {
                    amountMutation = participantMutationFromState.amountFinal;
                } else {
                    amountMutation = participantMutationFromState.amountGranted;
                }
            }

            if (participantMutationFromProps.status.codeRef === 'final') {
                amountMutation = participantMutationFromState.amountFinal;
            }
        } else {
            amountMutation = quantityMutation * projectCurrentBookWorth;
        }

        return amountMutation;
    }
    function calculateQuantity() {
        let quantityMutation = participantMutationFromState.quantity;

        if (projectTypeCodeRef === 'loan') {
            return 0;
        } else {
            if (participantMutationFromProps.status.codeRef === 'interest') {
                // next status alread selected
                if (participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId)) {
                    quantityMutation = participantMutationFromState.quantityOption;
                } else {
                    quantityMutation = participantMutationFromState.quantityInterest;
                }
            }

            if (participantMutationFromProps.status.codeRef === 'option') {
                // next status alread selected
                if (participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId)) {
                    quantityMutation = participantMutationFromState.quantityGranted;
                } else {
                    quantityMutation = participantMutationFromState.quantityOption;
                }
            }

            if (participantMutationFromProps.status.codeRef === 'granted') {
                // next status alread selected
                if (participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId)) {
                    quantityMutation = participantMutationFromState.quantityFinal;
                } else {
                    quantityMutation = participantMutationFromState.quantityGranted;
                }
            }

            if (participantMutationFromProps.status.codeRef === 'final') {
                quantityMutation = participantMutationFromState.quantityFinal;
            }
        }

        return quantityMutation;
    }
    function calculateTransactionCostsAmount() {
        // indien transactie_costs niet meer gewijzigd mag worden, dan laten we transaction_costs_amount zoals het was.
        // voorwaarde voor niet meer wijzigen:
        // - mutationstatus is final (Definitief) en (participant in definitive revenue of waardestaat)
        //   nb: indien in definitieve waardestaat dan is hier readOnly al true
        if (readOnly || participantMutationFromProps.status.codeRef === 'final') {
            return participantMutationFromProps.transactionCostsAmount
                ? participantMutationFromProps.transactionCostsAmount
                : 0;
        }

        //Vragen over lid worden aan en Transactie kosten ook bij lidmaatschap Uit (keuze 1)
        if (project.showQuestionAboutMembership && !project.useTransactionCostsWithMembership) {
            //Indien al lid of indien keuze 1 (wil lid worden) dan geen transactiekosten,
            if (participantBelongsToMembershipGroup || participantChoiceMembership === 1) {
                return 0;
            }
        }

        return calculateTransactionCosts(project, calculateAmount(), calculateQuantity());
    }

    return (
        <PanelBody>
            <div className="row">
                <ViewText
                    label={'Type'}
                    id={'type'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.type.name}
                />
                {readOnly || participantMutationFromProps.status.codeRef === 'final' ? (
                    <ViewText
                        label={'Status'}
                        id={'status'}
                        className={'col-sm-6 form-group'}
                        value={participantMutationFromProps.status.name}
                    />
                ) : (
                    <InputSelect
                        label={'Status'}
                        name={'statusId'}
                        options={participantMutationStatusesOptions}
                        value={participantMutationFromState.statusId}
                        onChangeAction={handleInputChange}
                    />
                )}
            </div>
            <div className="row">
                <ViewText
                    label={
                        'Bedrag ' +
                        (participantMutationFromProps.status.codeRef === 'final'
                            ? '(definitief)'
                            : '(nog niet definitief)')
                    }
                    id={'participationWorth'}
                    className={'col-sm-6 form-group'}
                    value={MoneyPresenter(calculateAmount())}
                />
            </div>
            {projectTransactionCostsCodeRef === 'none' ? null : (
                <>
                    <div className="row">
                        <ViewText
                            label={'Transactiekosten (berekend)'}
                            id={'transactionCostsAmount'}
                            className={'col-sm-6 form-group'}
                            value={MoneyPresenter(calculateTransactionCostsAmount())}
                        />
                        {participantMutationFromState.createdWith === 'econobis' ? (
                            <InputText
                                // type={'number'}
                                label={'Transactiekosten (afwijkend)'}
                                id={'differentTransactionCostsAmount'}
                                name={'differentTransactionCostsAmount'}
                                labelClassName={
                                    calculateTransactionCostsAmount() !=
                                    participantMutationFromState.differentTransactionCostsAmount
                                        ? 'text-danger'
                                        : ''
                                }
                                value={participantMutationFromState.differentTransactionCostsAmount}
                                allowZero={true}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                readOnly={
                                    participantMutationFromProps.status.codeRef === 'final' &&
                                    !participantMutationFromProps.changeAllowed
                                }
                                error={errors.differentTransactionCostsAmount}
                                errorMessage={errorMessage.differentTransactionCostsAmount}
                            />
                        ) : null}
                    </div>
                </>
            )}
            {participantMutationFromProps.status.codeRef === 'interest' && (
                <MutationFormEditStatusInterest
                    readOnly={readOnly}
                    participantMutationFromProps={participantMutationFromProps}
                    participantMutationFromState={participantMutationFromState}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    errors={errors}
                    errorMessage={errorMessage}
                    projectTypeCodeRef={projectTypeCodeRef}
                />
            )}
            {participantMutationFromProps.status.codeRef === 'option' && (
                <MutationFormEditStatusOption
                    readOnly={readOnly}
                    participantMutationFromProps={participantMutationFromProps}
                    participantMutationFromState={participantMutationFromState}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    errors={errors}
                    errorMessage={errorMessage}
                    projectTypeCodeRef={projectTypeCodeRef}
                />
            )}
            {participantMutationFromProps.status.codeRef === 'granted' && (
                <MutationFormEditStatusGranted
                    readOnly={readOnly}
                    participantMutationFromProps={participantMutationFromProps}
                    participantMutationFromState={participantMutationFromState}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    errors={errors}
                    errorMessage={errorMessage}
                    projectTypeCodeRef={projectTypeCodeRef}
                    disableBeforeEntryDate={disableBeforeEntryDate}
                    participationHasMutationsWithStatusDepositOrWithdrawal={
                        participationHasMutationsWithStatusDepositOrWithdrawal
                    }
                    typeCodeRef={participantMutationFromProps.type.codeRef}
                />
            )}
            {participantMutationFromProps.status.codeRef === 'final' && (
                <MutationFormEditStatusFinal
                    readOnly={readOnly}
                    participantMutationFromProps={participantMutationFromProps}
                    participantMutationFromState={participantMutationFromState}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    errors={errors}
                    errorMessage={errorMessage}
                    projectTypeCodeRef={projectTypeCodeRef}
                    participantProjectDateRegister={participantProjectDateRegister}
                    disableBeforeEntryDate={disableBeforeEntryDate}
                />
            )}
            <ParticipantDetailsMutationStatusLog statusLogs={participantMutationFromProps.statusLogs} />
            <ParticipantDetailsMutationMolliePayments molliePayments={participantMutationFromProps.molliePayments} />
            <ParticipantDetailsMutationConclusion
                createdAt={participantMutationFromProps.createdAt}
                createdWith={participantMutationFromProps.createdWith}
                createdBy={participantMutationFromProps.createdBy}
                updatedAt={participantMutationFromProps.updatedAt}
                updatedWith={participantMutationFromProps.updatedWith}
                updatedBy={participantMutationFromProps.updatedBy}
            />
            <div className="pull-right btn-group" role="group">
                {readOnly ? (
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Sluiten'} onClickAction={cancelDetails} />
                ) : (
                    <>
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={cancelDetails}
                        />
                        <ButtonText
                            buttonText={buttonText}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </>
                )}
            </div>
        </PanelBody>
    );
}

MutationFormEditDeposit.propTypes = {
    participantMutationFromProps: PropTypes.object,
    participantMutationFromState: PropTypes.object,
    participantMutationStatusesOptions: PropTypes.arrayOf(PropTypes.any),
    handleInputChange: PropTypes.any,
    projectTypeCodeRef: PropTypes.any,
    handleInputChangeDate: PropTypes.any,
    errors: PropTypes.any,
    errorMessage: PropTypes.any,
    participantMutation: PropTypes.any,
    cancelDetails: PropTypes.any,
    buttonText: PropTypes.string,
    handleSubmit: PropTypes.any,
    participantProjectDateRegister: PropTypes.any,
    participantBelongsToMembershipGroup: PropTypes.bool,
    participantChoiceMembership: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        project: state.participantProjectDetails.project,
    };
};

export default connect(mapStateToProps, null)(MutationFormEditDeposit);
