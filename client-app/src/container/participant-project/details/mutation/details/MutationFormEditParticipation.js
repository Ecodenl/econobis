import React from 'react';
import moment from 'moment';
import PanelBody from '../../../../../components/panel/PanelBody';
import ViewText from '../../../../../components/form/ViewText';
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import ParticipantDetailsMutationStatusLog from './status-log';
import ParticipantDetailsMutationConclusion from './conclusion';

const MutationFormEditParticipation = ({
    readOnly,
    participantMutationFromProps,
    participantMutationFromState,
    participantMutationStatusesOptions,
    handleInputChange,
    handleInputChangeDate,
    cancelDetails,
    handleSubmit,
    errors,
    buttonText,
}) => {
    const statusCodeRef = participantMutationFromProps.status.codeRef;
    const statusChanged = participantMutationFromProps.status.id !== Number(participantMutationFromState.statusId);

    const viewDate = (label, id, value) => (
        <ViewText
            label={label}
            id={id}
            className={'col-sm-6 form-group'}
            value={value ? moment(value).format('L') : ''}
        />
    );

    return (
        <PanelBody>
            <div className="row">
                <ViewText
                    label={'Type'}
                    id={'type'}
                    className={'col-sm-6 form-group'}
                    value={participantMutationFromProps.type.name}
                />

                {readOnly || statusCodeRef === 'final' ? (
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

            {statusCodeRef === 'interest' && (
                <>
                    {statusChanged ? (
                        <>
                            <div className="row">
                                {viewDate('Interessedatum', 'dateInterest', participantMutationFromProps.dateInterest)}
                            </div>
                            <div className="row">
                                <InputDate
                                    label={'Inschrijvingsdatum'}
                                    name={'dateOption'}
                                    value={participantMutationFromState.dateOption}
                                    onChangeAction={handleInputChangeDate}
                                    required={'required'}
                                    error={errors.dateOption}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            {readOnly ? (
                                viewDate('Interessedatum', 'dateInterest', participantMutationFromProps.dateInterest)
                            ) : (
                                <InputDate
                                    label={'Interessedatum'}
                                    name={'dateInterest'}
                                    value={participantMutationFromState.dateInterest}
                                    onChangeAction={handleInputChangeDate}
                                    error={errors.dateInterest}
                                />
                            )}
                        </div>
                    )}
                </>
            )}

            {statusCodeRef === 'option' && (
                <>
                    <div className="row">
                        {viewDate('Interessedatum', 'dateInterest', participantMutationFromProps.dateInterest)}
                    </div>

                    {statusChanged ? (
                        <>
                            <div className="row">
                                {viewDate('Inschrijvingsdatum', 'dateOption', participantMutationFromProps.dateOption)}
                            </div>
                            <div className="row">
                                <InputDate
                                    label={'Toewijzingsdatum'}
                                    name={'dateGranted'}
                                    value={participantMutationFromState.dateGranted}
                                    onChangeAction={handleInputChangeDate}
                                    required={'required'}
                                    error={errors.dateGranted}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            {readOnly ? (
                                viewDate('Inschrijvingsdatum', 'dateOption', participantMutationFromProps.dateOption)
                            ) : (
                                <InputDate
                                    label={'Inschrijvingsdatum'}
                                    name={'dateOption'}
                                    value={participantMutationFromState.dateOption}
                                    onChangeAction={handleInputChangeDate}
                                    required={'required'}
                                    error={errors.dateOption}
                                />
                            )}
                        </div>
                    )}
                </>
            )}

            {statusCodeRef === 'granted' && (
                <>
                    <div className="row">
                        {viewDate('Interessedatum', 'dateInterest', participantMutationFromProps.dateInterest)}
                    </div>
                    <div className="row">
                        {viewDate('Inschrijvingsdatum', 'dateOption', participantMutationFromProps.dateOption)}
                    </div>

                    {statusChanged ? (
                        <>
                            <div className="row">
                                {viewDate('Toewijzingsdatum', 'dateGranted', participantMutationFromProps.dateGranted)}
                            </div>
                            <div className="row">
                                <InputDate
                                    label={'Ingangsdatum'}
                                    name={'dateEntry'}
                                    value={participantMutationFromState.dateEntry}
                                    onChangeAction={handleInputChangeDate}
                                    required={'required'}
                                    error={errors.dateEntry}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            {readOnly ? (
                                viewDate('Toewijzingsdatum', 'dateGranted', participantMutationFromProps.dateGranted)
                            ) : (
                                <InputDate
                                    label={'Toewijzingsdatum'}
                                    name={'dateGranted'}
                                    value={participantMutationFromState.dateGranted}
                                    onChangeAction={handleInputChangeDate}
                                    required={'required'}
                                    error={errors.dateGranted}
                                />
                            )}
                        </div>
                    )}
                </>
            )}

            {statusCodeRef === 'final' && (
                <>
                    {participantMutationFromProps.dateInterest && (
                        <div className="row">
                            {viewDate('Interessedatum', 'dateInterest', participantMutationFromProps.dateInterest)}
                        </div>
                    )}

                    {participantMutationFromProps.dateOption && (
                        <div className="row">
                            {viewDate('Inschrijvingsdatum', 'dateOption', participantMutationFromProps.dateOption)}
                        </div>
                    )}

                    {participantMutationFromProps.dateGranted && (
                        <div className="row">
                            {viewDate('Toewijzingsdatum', 'dateGranted', participantMutationFromProps.dateGranted)}
                        </div>
                    )}

                    <div className="row">
                        {readOnly ? (
                            viewDate('Ingangsdatum', 'dateEntry', participantMutationFromProps.dateEntry)
                        ) : (
                            <InputDate
                                label={'Ingangsdatum'}
                                name={'dateEntry'}
                                value={participantMutationFromState.dateEntry}
                                onChangeAction={handleInputChangeDate}
                                required={'required'}
                                readOnly={!participantMutationFromProps.changeAllowed}
                                error={errors.dateEntry}
                            />
                        )}
                    </div>
                </>
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
};

export default MutationFormEditParticipation;
