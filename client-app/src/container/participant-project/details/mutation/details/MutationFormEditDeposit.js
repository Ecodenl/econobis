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
import React from 'react';
import ParticipantDetailsMutationMolliePayments from './mollie-payments';

function MutationFormEditDeposit({
    participantMutationFromProps,
    participantMutationFromState,
    participantMutationStatusesOptions,
    projectTypeCodeRef,
    projectTransactionCostsCodeRef,
    projectCurrentBookWorth,
    handleInputChange,
    handleInputChangeDate,
    cancelEdit,
    handleSubmit,
    errors,
    errorMessage,
    buttonText,
    participantProjectDateRegister,
    participantInDefinitiveRevenue,
}) {
    return (
        <PanelBody>
            <div className="row">
                <ViewText
                    label={'Type'}
                    id={'type'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.type.name}
                />
                {participantMutationFromProps.status.codeRef === 'final' ? (
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

            {projectTypeCodeRef === 'loan' ? (
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
                        value={MoneyPresenter(participantMutationFromProps.amount)}
                    />
                </div>
            ) : (
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
                        value={MoneyPresenter(
                            participantMutationFromProps.status.codeRef === 'final'
                                ? participantMutationFromProps.participationWorth
                                : participantMutationFromProps.quantity * projectCurrentBookWorth
                        )}
                    />
                </div>
            )}
            {projectTransactionCostsCodeRef === 'none' ? null : (
                <div className="row">
                    <ViewText
                        label={'Transactiekosten'}
                        id={'transactionCostsAmount'}
                        className={'col-sm-6 form-group'}
                        value={MoneyPresenter(participantMutationFromProps.transactionCostsAmount)}
                    />
                </div>
            )}

            {participantMutationFromProps.status.codeRef === 'interest' && (
                <MutationFormEditStatusInterest
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
                    participantMutationFromProps={participantMutationFromProps}
                    participantMutationFromState={participantMutationFromState}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    errors={errors}
                    errorMessage={errorMessage}
                    projectTypeCodeRef={projectTypeCodeRef}
                />
            )}

            {participantMutationFromProps.status.codeRef === 'final' && (
                <MutationFormEditStatusFinal
                    participantMutationFromProps={participantMutationFromProps}
                    participantMutationFromState={participantMutationFromState}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    errors={errors}
                    errorMessage={errorMessage}
                    projectTypeCodeRef={projectTypeCodeRef}
                    participantProjectDateRegister={participantProjectDateRegister}
                    participantInDefinitiveRevenue={participantInDefinitiveRevenue}
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
                <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={cancelEdit} />
                <ButtonText buttonText={buttonText} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
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
    cancelEdit: PropTypes.any,
    buttonText: PropTypes.string,
    handleSubmit: PropTypes.any,
    participantProjectDateRegister: PropTypes.any,
    participantInDefinitiveRevenue: PropTypes.bool,
};

export default MutationFormEditDeposit;
