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
    participantMutationFromState,
    participantMutationFromProps,
    errors,
    errorMessage,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
    cancelEdit,
    participantMutationStatuses,
    participantProjectDateRegister,
    participantInDefinitiveRevenue,
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
                            participantMutationFromState={participantMutationFromState}
                            participantMutationFromProps={participantMutationFromProps}
                            participantMutationStatusesOptions={participantMutationStatusesOptions}
                            errors={errors}
                            errorMessage={errorMessage}
                            projectTypeCodeRef={projectTypeCodeRef}
                            handleInputChange={handleInputChange}
                            handleInputChangeDate={handleInputChangeDate}
                            cancelEdit={cancelEdit}
                            buttonText={buttonTextSubmit}
                            handleSubmit={handleSubmit}
                            participantProjectDateRegister={participantProjectDateRegister}
                            participantInDefinitiveRevenue={participantInDefinitiveRevenue}
                        />
                    ) : null}
                    {type.codeRef === 'withDrawal' || type.codeRef === 'sell' ? (
                        <MutationFormEditWithDrawal
                            participantMutationFromState={participantMutationFromState}
                            participantMutationFromProps={participantMutationFromProps}
                            participantMutationStatusesOptions={participantMutationStatusesOptions}
                            errors={errors}
                            errorMessage={errorMessage}
                            projectTypeCodeRef={projectTypeCodeRef}
                            handleInputChange={handleInputChange}
                            handleInputChangeDate={handleInputChangeDate}
                            cancelEdit={cancelEdit}
                            buttonText={buttonTextSubmit}
                            handleSubmit={handleSubmit}
                        />
                    ) : null}
                    {type.codeRef === 'result' ? (
                        <MutationFormEditResult
                            participantMutationFromProps={participantMutationFromProps}
                            cancelEdit={cancelEdit}
                        />
                    ) : null}
                    {type.codeRef === 'redemption' ? (
                        <MutationFormEditRedemption
                            participantMutationFromProps={participantMutationFromProps}
                            cancelEdit={cancelEdit}
                        />
                    ) : null}
                    {type.codeRef === 'energyTaxRefund' ? (
                        <MutationFormEditEnergyTaxRefund
                            participantMutationFromProps={participantMutationFromProps}
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
        participantProjectDateRegister: state.participantProjectDetails.dateRegister,
        participantInDefinitiveRevenue: state.participantProjectDetails.participantInDefinitiveRevenue,
        participantMutationStatuses: state.systemData.participantMutationStatuses,
    };
};

export default connect(mapStateToProps)(MutationFormEdit);
