import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import { connect } from 'react-redux';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import ViewText from '../../../../../components/form/ViewText';
import ParticipantDetailsMutationConclusion from './conclusion';
import ParticipantDetailsMutationStatusLog from './status-log';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import InputSelect from '../../../../../components/form/InputSelect';
import MutationFormEditStatusInterest from './MutationFormEditStatus/Interest';
import MutationFormEditStatusOption from './MutationFormEditStatus/Option';
import MutationFormEditStatusGranted from './MutationFormEditStatus/Granted';
import MutationFormEditStatusFinal from './MutationFormEditStatus/Final';

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
                    <PanelBody>
                        <div className="row">
                            <ViewText label={'Type'} id={'type'} className={'col-sm-6 form-group'} value={type.name} />
                            {originalStatus.codeRef === 'final' ? (
                                <ViewText
                                    label={'Status'}
                                    id={'status'}
                                    className={'col-sm-6 form-group'}
                                    value={originalStatus.name}
                                />
                            ) : (
                                <InputSelect
                                    label={'Status'}
                                    name={'statusId'}
                                    options={participantMutationStatusesOptions}
                                    value={statusId}
                                    onChangeAction={handleInputChange}
                                />
                            )}
                        </div>

                        {projectTypeCodeRef === 'loan' ? null : (
                            <div className="row">
                                <ViewText
                                    label={'Bedrag'}
                                    id={'participationWorth'}
                                    className={'col-sm-6 form-group'}
                                    value={MoneyPresenter(participationWorth)}
                                />
                            </div>
                        )}

                        {originalStatus.codeRef === 'interest' && (
                            <MutationFormEditStatusInterest
                                originalStatus={originalStatus}
                                statusId={statusId}
                                quantityInterest={quantityInterest}
                                amountInterest={amountInterest}
                                dateInterest={dateInterest}
                                quantityOption={quantityOption}
                                amountOption={amountOption}
                                dateOption={dateOption}
                                handleInputChange={handleInputChange}
                                handleInputChangeDate={handleInputChangeDate}
                                errors={errors}
                                projectTypeCodeRef={projectTypeCodeRef}
                            />
                        )}

                        {originalStatus.codeRef === 'option' && (
                            <MutationFormEditStatusOption
                                originalStatus={originalStatus}
                                statusId={statusId}
                                quantityInterest={quantityInterest}
                                amountInterest={amountInterest}
                                dateInterest={dateInterest}
                                quantityOption={quantityOption}
                                amountOption={amountOption}
                                dateOption={dateOption}
                                quantityGranted={quantityGranted}
                                amountGranted={amountGranted}
                                dateGranted={dateGranted}
                                handleInputChange={handleInputChange}
                                handleInputChangeDate={handleInputChangeDate}
                                errors={errors}
                                projectTypeCodeRef={projectTypeCodeRef}
                            />
                        )}

                        {originalStatus.codeRef === 'granted' && (
                            <MutationFormEditStatusGranted
                                originalStatus={originalStatus}
                                statusId={statusId}
                                quantityInterest={quantityInterest}
                                amountInterest={amountInterest}
                                dateInterest={dateInterest}
                                quantityOption={quantityOption}
                                amountOption={amountOption}
                                dateOption={dateOption}
                                quantityGranted={quantityGranted}
                                amountGranted={amountGranted}
                                dateGranted={dateGranted}
                                quantityFinal={quantityFinal}
                                amountFinal={amountFinal}
                                dateEntry={dateEntry}
                                dateContractRetour={dateContractRetour}
                                datePayment={datePayment}
                                handleInputChange={handleInputChange}
                                handleInputChangeDate={handleInputChangeDate}
                                errors={errors}
                                projectTypeCodeRef={projectTypeCodeRef}
                            />
                        )}

                        {originalStatus.codeRef === 'final' && (
                            <MutationFormEditStatusFinal
                                originalStatus={originalStatus}
                                statusId={statusId}
                                quantityInterest={quantityInterest}
                                amountInterest={amountInterest}
                                dateInterest={dateInterest}
                                quantityOption={quantityOption}
                                amountOption={amountOption}
                                dateOption={dateOption}
                                quantityGranted={quantityGranted}
                                amountGranted={amountGranted}
                                dateGranted={dateGranted}
                                quantityFinal={quantityFinal}
                                amountFinal={amountFinal}
                                dateEntry={dateEntry}
                                dateContractRetour={dateContractRetour}
                                datePayment={datePayment}
                                handleInputChange={handleInputChange}
                                handleInputChangeDate={handleInputChangeDate}
                                errors={errors}
                                projectTypeCodeRef={projectTypeCodeRef}
                            />
                        )}

                        <ParticipantDetailsMutationStatusLog statusLogs={participantMutation.statusLogs} />

                        <ParticipantDetailsMutationConclusion participantMutation={participantMutation} />

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={cancelEdit}
                            />
                            <ButtonText
                                buttonText={buttonTextSubmit}
                                onClickAction={handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
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
