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

function MutationFormEditWithDrawal({
    readOnly,
    participantMutationFromProps,
    participantMutationFromState,
    participantMutationStatusesOptions,
    projectTypeCodeRef,
    handleInputChange,
    handleInputChangeDate,
    cancelDetails,
    handleSubmit,
    errors,
    errorMessage,
    buttonText,
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
            {projectTypeCodeRef === 'loan' ? null : (
                <div className="row">
                    <ViewText
                        label={'Bedrag'}
                        id={'participationWorth'}
                        className={'col-sm-6 form-group'}
                        value={MoneyPresenter(participantMutationFromProps.participationWorth)}
                    />
                </div>
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
                />
            )}

            <ParticipantDetailsMutationStatusLog statusLogs={participantMutationFromProps.statusLogs} />

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

MutationFormEditWithDrawal.propTypes = {
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
};

export default MutationFormEditWithDrawal;
