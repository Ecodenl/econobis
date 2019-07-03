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

function MutationFormEditDeposit({
    originalStatus,
    type,
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
    participantMutationStatusesOptions,
    projectTypeCodeRef,
    handleInputChange,
    handleInputChangeDate,
    handleBlurAmount,
    cancelEdit,
    handleSubmit,
    errors,
    buttonText,
    statusLogs,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
}) {
    return (
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
                    handleBlurAmount={handleBlurAmount}
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
                    handleBlurAmount={handleBlurAmount}
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
                    handleBlurAmount={handleBlurAmount}
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
                    handleBlurAmount={handleBlurAmount}
                    errors={errors}
                    projectTypeCodeRef={projectTypeCodeRef}
                />
            )}

            <ParticipantDetailsMutationStatusLog statusLogs={statusLogs} />

            <ParticipantDetailsMutationConclusion
                createdAt={createdAt}
                createdBy={createdBy}
                updatedAt={updatedAt}
                updatedBy={updatedBy}
            />

            <div className="pull-right btn-group" role="group">
                <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={cancelEdit} />
                <ButtonText buttonText={buttonText} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
            </div>
        </PanelBody>
    );
}

MutationFormEditDeposit.propTypes = {
    type: PropTypes.any,
    originalStatus: PropTypes.any,
    participantMutationStatusesOptions: PropTypes.arrayOf(PropTypes.any),
    statusId: PropTypes.string,
    handleInputChange: PropTypes.any,
    projectTypeCodeRef: PropTypes.any,
    amount: PropTypes.any,
    quantityInterest: PropTypes.any,
    amountInterest: PropTypes.any,
    dateInterest: PropTypes.any,
    quantityOption: PropTypes.any,
    amountOption: PropTypes.any,
    dateOption: PropTypes.any,
    handleInputChangeDate: PropTypes.any,
    handleBlurAmount: PropTypes.any,
    errors: PropTypes.any,
    quantityGranted: PropTypes.any,
    amountGranted: PropTypes.any,
    dateGranted: PropTypes.any,
    quantityFinal: PropTypes.any,
    amountFinal: PropTypes.any,
    dateEntry: PropTypes.any,
    dateContractRetour: PropTypes.any,
    datePayment: PropTypes.any,
    statusLogs: PropTypes.any,
    participantMutation: PropTypes.any,
    cancelEdit: PropTypes.any,
    buttonText: PropTypes.string,
    handleSubmit: PropTypes.any,
    createdAt: PropTypes.object,
    createdBy: PropTypes.object,
    updatedAt: PropTypes.object,
    updatedBy: PropTypes.object,
};

export default MutationFormEditDeposit;
