import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import { connect } from 'react-redux';
import Panel from '../../../../../components/panel/Panel';
import MutationFormEditResult from './MutationFormEditResult';
import MutationFormEditDeposit from './MutationFormEditDeposit';
import ParticipantDetailsMutationConclusion from './conclusion';

const MutationFormEdit = ({
    participantMutation,
    errors,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
    cancelEdit,
    participantMutationStatuses,
}) => {
    const {
        type,
        status: originalStatus,
        statusId,
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
        participationWorth,
        returns,
        paidOn,
        entry,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
    } = participantMutation;

    let buttonTextSubmit = 'Opslaan';

    if (originalStatus.id !== Number(statusId)) {
        switch (originalStatus.codeRef) {
            case 'interest':
                buttonTextSubmit = 'Status doorzetten naar optie';
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

    let participantMutationStatusesOptions = [];

    switch (originalStatus.codeRef) {
        case 'interest':
            participantMutationStatusesOptions = participantMutationStatuses.filter(
                participantMutationStatus =>
                    participantMutationStatus.codeRef === 'interest' || participantMutationStatus.codeRef === 'option'
            );
            break;
        case 'option':
            participantMutationStatusesOptions = participantMutationStatuses.filter(
                participantMutationStatus =>
                    participantMutationStatus.codeRef === 'option' || participantMutationStatus.codeRef === 'granted'
            );
            break;
        case 'granted':
            participantMutationStatusesOptions = participantMutationStatuses.filter(
                participantMutationStatus =>
                    participantMutationStatus.codeRef === 'granted' || participantMutationStatus.codeRef === 'final'
            );
            break;
    }

    return (
        <div>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <Panel className={'panel-grey'}>
                    {type.codeRef === 'first_deposit' || type.codeRef === 'deposit' ? (
                        <MutationFormEditDeposit
                            type={type}
                            originalStatus={originalStatus}
                            participantMutationStatusesOptions={participantMutationStatusesOptions}
                            statusId={statusId}
                            participationWorth={participationWorth}
                            quantityInterest={quantityInterest}
                            amountInterest={amountInterest}
                            dateInterest={dateInterest}
                            quantityOption={quantityOption}
                            amountOption={amountOption}
                            dateOption={dateOption}
                            errors={errors}
                            quantityGranted={quantityGranted}
                            amountGranted={amountGranted}
                            dateGranted={dateGranted}
                            quantityFinal={quantityFinal}
                            amountFinal={amountFinal}
                            dateEntry={dateEntry}
                            dateContractRetour={dateContractRetour}
                            projectTypeCodeRef={projectTypeCodeRef}
                            handleInputChange={handleInputChange}
                            handleInputChangeDate={handleInputChangeDate}
                            datePayment={datePayment}
                            createdAt={createdAt}
                            createdBy={createdBy}
                            updatedAt={updatedAt}
                            updatedBy={updatedBy}
                            statusLogs={participantMutation.statusLogs}
                            cancelEdit={cancelEdit}
                            buttonText={buttonTextSubmit}
                            handleSubmit={handleSubmit}
                        />
                    ) : null}

                    {type.codeRef === 'result' ? (
                        <MutationFormEditResult
                            type={type}
                            originalStatus={originalStatus}
                            returns={returns}
                            datePayment={datePayment}
                            entry={entry}
                            paidOn={paidOn}
                            createdAt={createdAt}
                            createdBy={createdBy}
                            updatedAt={updatedAt}
                            updatedBy={updatedBy}
                            cancelEdit={cancelEdit}
                        />
                    ) : null}
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
        participantMutationStatuses: state.systemData.participantMutationStatuses,
    };
};

export default connect(mapStateToProps)(MutationFormEdit);
