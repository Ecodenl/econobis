import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import { connect } from 'react-redux';
import Panel from '../../../../../components/panel/Panel';
import MutationFormEditEnergyTaxRefund from './MutationFormEditEnergyTaxRefund';
import MutationFormEditResult from './MutationFormEditResult';
import MutationFormEditDeposit from './MutationFormEditDeposit';
import MutationFormEditWithDrawal from './MutationFormEditWithDrawal';
import MutationFormEditRedemption from './MutationFormEditRedemption';

const MutationFormEdit = ({
    readOnly,
    participantMutationFromState,
    participantMutationFromProps,
    errors,
    errorMessage,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
    projectTransactionCostsCodeRef,
    projectCurrentBookWorth,
    cancelDetails,
    participantMutationStatuses,
    participantProjectDateRegister,
    participantBelongsToMembershipGroup,
    participantChoiceMembership,
    projectDateInterestBearingKwh,
}) => {
    const { type, statusId } = participantMutationFromState;
    let buttonTextSubmit = 'Opslaan';
    let participantMutationStatusesOptions = [];

    if (participantMutationFromProps.status) {
        if (participantMutationFromProps.status.id !== Number(statusId)) {
            switch (participantMutationFromProps.status.codeRef) {
                case 'interest':
                    buttonTextSubmit = 'Status doorzetten naar inschrijving';
                    break;
                case 'option':
                    buttonTextSubmit = 'Status doorzetten naar toegekend';
                    break;
                case 'granted':
                    buttonTextSubmit = 'Status doorzetten naar definitief';
                    break;
                default:
                    buttonTextSubmit = 'Opslaan';
            }
        }

        switch (participantMutationFromProps.status.codeRef) {
            case 'interest':
                participantMutationStatusesOptions = participantMutationStatuses.filter(
                    participantMutationStatus =>
                        participantMutationStatus.codeRef === 'interest' ||
                        participantMutationStatus.codeRef === 'option'
                );
                break;
            case 'option':
                participantMutationStatusesOptions = participantMutationStatuses.filter(
                    participantMutationStatus =>
                        participantMutationStatus.codeRef === 'option' ||
                        participantMutationStatus.codeRef === 'granted'
                );
                break;
            case 'granted':
                participantMutationStatusesOptions = participantMutationStatuses.filter(
                    participantMutationStatus =>
                        participantMutationStatus.codeRef === 'granted' || participantMutationStatus.codeRef === 'final'
                );
                break;
        }
    }
    return (
        <div>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <Panel className={'panel-grey'}>
                    {type.codeRef === 'first_deposit' || type.codeRef === 'deposit' ? (
                        <MutationFormEditDeposit
                            readOnly={readOnly}
                            participantMutationFromState={participantMutationFromState}
                            participantMutationFromProps={participantMutationFromProps}
                            participantMutationStatusesOptions={participantMutationStatusesOptions}
                            errors={errors}
                            errorMessage={errorMessage}
                            projectTypeCodeRef={projectTypeCodeRef}
                            projectTransactionCostsCodeRef={projectTransactionCostsCodeRef}
                            projectCurrentBookWorth={projectCurrentBookWorth}
                            handleInputChange={handleInputChange}
                            handleInputChangeDate={handleInputChangeDate}
                            cancelDetails={cancelDetails}
                            buttonText={buttonTextSubmit}
                            handleSubmit={handleSubmit}
                            participantProjectDateRegister={participantProjectDateRegister}
                            participantBelongsToMembershipGroup={participantBelongsToMembershipGroup}
                            participantChoiceMembership={participantChoiceMembership}
                            projectDateInterestBearingKwh={projectDateInterestBearingKwh}
                        />
                    ) : null}
                    {type.codeRef === 'withDrawal' || type.codeRef === 'sell' ? (
                        <MutationFormEditWithDrawal
                            readOnly={readOnly}
                            participantMutationFromState={participantMutationFromState}
                            participantMutationFromProps={participantMutationFromProps}
                            participantMutationStatusesOptions={participantMutationStatusesOptions}
                            errors={errors}
                            errorMessage={errorMessage}
                            projectTypeCodeRef={projectTypeCodeRef}
                            handleInputChange={handleInputChange}
                            handleInputChangeDate={handleInputChangeDate}
                            cancelDetails={cancelDetails}
                            buttonText={buttonTextSubmit}
                            handleSubmit={handleSubmit}
                            projectDateInterestBearingKwh={projectDateInterestBearingKwh}
                        />
                    ) : null}
                    {type.codeRef === 'result' ? (
                        <MutationFormEditResult
                            participantMutationFromProps={participantMutationFromProps}
                            cancelDetails={cancelDetails}
                        />
                    ) : null}
                    {type.codeRef === 'redemption' ? (
                        <MutationFormEditRedemption
                            participantMutationFromProps={participantMutationFromProps}
                            cancelDetails={cancelDetails}
                        />
                    ) : null}
                    {type.codeRef === 'energyTaxRefund' ? (
                        <MutationFormEditEnergyTaxRefund
                            participantMutationFromProps={participantMutationFromProps}
                            cancelDetails={cancelDetails}
                        />
                    ) : null}
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.participantProjectDetails.project?.projectType?.codeRef,
        projectTransactionCostsCodeRef: state.participantProjectDetails.project?.transactionCostsCodeRef,
        projectCurrentBookWorth: state.participantProjectDetails.project.currentBookWorth,
        participantProjectDateRegister: state.participantProjectDetails.dateRegister,
        participantBelongsToMembershipGroup: state.participantProjectDetails.participantBelongsToMembershipGroup,
        participantChoiceMembership: state.participantProjectDetails.participantChoiceMembership,
        projectDateInterestBearingKwh: state.participantProjectDetails.project.dateInterestBearingKwh,
        participantMutationStatuses: state.systemData.participantMutationStatuses,
    };
};

export default connect(mapStateToProps)(MutationFormEdit);
