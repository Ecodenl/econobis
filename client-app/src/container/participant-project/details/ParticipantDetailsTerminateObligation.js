import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import { fetchParticipantProjectDetails } from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { connect } from 'react-redux';
import InputDate from '../../../components/form/InputDate';
import InputText from '../../../components/form/InputText';
import moment from 'moment';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';
import ViewText from '../../../components/form/ViewText';
import validator from 'validator';
import InputSelect from '../../../components/form/InputSelect';
import styled from '@emotion/styled';

const StyledEm = styled.em`
    font-weight: normal;
`;

const ParticipantDetailsTerminateObligation = ({
    participantProject,
    setErrorModal,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
    projectRevenueDistributionTypes,
}) => {
    const [dateTerminated, setDateTerminated] = useState(
        moment(participantProject.dateTerminatedAllowedFrom)
            .subtract(1, 'day')
            .format('Y-MM-DD')
    );
    const [dateTerminatedAllowedFrom, setDateTerminatedAllowedFrom] = useState(
        moment(participantProject.dateTerminatedAllowedFrom).format('Y-MM-DD')
    );
    const [dateTerminatedAllowedTo, setDateTerminatedAllowedTo] = useState(
        moment(participantProject.dateTerminatedAllowedTo).format('Y-MM-DD')
    );

    const [distributionTypeId, setDistributionTypeId] = useState('inPossessionOf');
    const [dateReference, setDateReference] = useState(dateTerminated);
    const [dateBegin, setDateBegin] = useState(dateTerminatedAllowedFrom);
    const [dateEnd, setDateEnd] = useState(
        moment(dateTerminatedAllowedFrom)
            .add(1, 'year')
            .subtract(1, 'day')
            .format('Y-MM-DD') > participantProject.dateTerminatedAllowedTo
            ? participantProject.dateTerminatedAllowedTo
            : moment(dateTerminatedAllowedFrom)
                  .add(1, 'year')
                  .subtract(1, 'day')
                  .format('Y-MM-DD')
    );
    const [payPercentage, setPayPercentage] = useState(0);
    const [payAmount, setPayAmount] = useState(null);
    const [keyAmountFirstPercentage, setKeyAmountFirstPercentage] = useState(null);
    const [payPercentageValidFromKeyAmount, setPayPercentageValidFromKeyAmount] = useState(null);
    const [errors, setErrors] = useState({
        dateTerminated: false,
        distributionTypeId: false,
        dateReference: false,
        dateBegin: false,
        dateEnd: false,
        payPercentage: false,
        payAmount: false,
        keyAmountFirstPercentage: false,
        payPercentageValidFromKeyAmount: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        dateTerminated: '',
        distributionTypeId: '',
        dateReference: '',
        dateBegin: '',
        dateEnd: '',
        payPercentage: '',
        payAmount: '',
        keyAmountFirstPercentage: '',
        payPercentageValidFromKeyAmount: '',
    });

    const onChangeDateTerminated = value => {
        setDateTerminated(value);
    };

    const onChangeDistributionTypeId = event => {
        const value = event.target.value;
        setDistributionTypeId(value);
    };
    const onChangeDateReference = (value, name) => {
        setDateReference(value);
    };
    const onChangeDateBegin = (value, name) => {
        setDateBegin(value);
    };
    const onChangeDateEnd = (value, name) => {
        setDateEnd(value);
    };
    const onChangePayPercentage = event => {
        const value = event.target.value;
        setPayPercentage(value);
    };
    const onChangePayAmount = event => {
        const value = event.target.value;
        setPayAmount(value);
    };
    const onChangeKeyAmountFirstPercentage = event => {
        const value = event.target.value;
        setKeyAmountFirstPercentage(value);
    };
    const onChangePayPercentageValidFromKeyAmount = event => {
        const value = event.target.value;
        setPayPercentageValidFromKeyAmount(value);
    };

    const confirmAction = () => {
        let errors = {
            dateTerminated: false,
        };
        let errorMessages = {
            dateTerminated: '',
        };
        let hasErrors = false;

        if (validator.isEmpty(dateTerminated)) {
            errors.dateTerminated = true;
            errorMessages.dateTerminated = 'Ongeldige datum';
            hasErrors = true;
        }

        setErrors(errors);
        setErrorMessages(errorMessages);

        if (!hasErrors) {
            ParticipantProjectDetailsAPI.terminateParticipantProjectObligation(participantProject.id, {
                dateTerminated,
                distributionTypeId,
                dateReference,
                dateBegin,
                dateEnd,
                payPercentage,
                payAmount,
                keyAmountFirstPercentage,
                payPercentageValidFromKeyAmount,
            })
                .then(payload => {
                    fetchParticipantProjectDetails(participantProject.id);
                    closeDeleteItemModal();
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));
                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }
                    setErrorModal(errorMessage);
                });
        }
    };

    return (
        <>
            <Modal
                buttonConfirmText="Deelname beëindigen"
                buttonClassName={'btn-danger'}
                closeModal={closeDeleteItemModal}
                confirmAction={() => confirmAction()}
                title="Beëindigen"
                modalClassName={'modal-lg'}
            >
                <p>Weet u zeker dat u deze deelname wilt beëindigen?</p>
                <div className="row">
                    <InputDate
                        label={'Datum beëindigen'}
                        name="dateTerminated"
                        value={dateTerminated}
                        onChangeAction={onChangeDateTerminated}
                        disabledBefore={moment(dateTerminatedAllowedFrom).subtract(1, 'day')}
                        disabledAfter={dateTerminatedAllowedTo}
                        error={errors.dateTerminated}
                        errorMessage={errorMessages.dateTerminated}
                    />
                    <ViewText
                        label={'Datum laatste mutatie storting/terugbetaling'}
                        value={
                            participantProject.dateEntryLastMutation
                                ? moment(participantProject.dateEntryLastMutation).format('DD-MM-Y')
                                : ''
                        }
                    />
                </div>

                {participantProject.participationsDefinitive != 0 ? (
                    <>
                        <p>Afsluitende opbrengst verdeling (uitkering) voor deze deelnemer maken?</p>
                        <div className="row">
                            <InputSelect
                                label={'Type opbrengst verdeling'}
                                name={'distributionTypeId'}
                                options={projectRevenueDistributionTypes}
                                emptyOption={false}
                                value={distributionTypeId}
                                onChangeAction={onChangeDistributionTypeId}
                                error={errors.distributionTypeId}
                                errorMessage={errorMessages.distributionTypeId}
                            />
                            {distributionTypeId === 'inPossessionOf' ? (
                                <InputDate
                                    label={'Peildatum'}
                                    name={'dateReference'}
                                    value={dateReference}
                                    required={'required'}
                                    onChangeAction={onChangeDateReference}
                                    error={errors.dateReference}
                                    errorMessage={errorMessages.dateReference}
                                />
                            ) : null}
                        </div>

                        <div className="row">
                            <InputDate
                                label={'Begin periode'}
                                name={'dateBegin'}
                                value={dateBegin}
                                onChangeAction={onChangeDateBegin}
                                error={errors.dateBegin}
                                errorMessage={errorMessages.dateBegin}
                                disabledBefore={participantProject.dateTerminatedAllowedFrom}
                                disabledAfter={participantProject.dateTerminatedAllowedTo}
                            />
                            <InputDate
                                label={'Eind periode'}
                                name={'dateEnd'}
                                value={dateEnd}
                                onChangeAction={onChangeDateEnd}
                                error={errors.dateEnd}
                                errorMessage={errorMessages.dateEnd}
                                disabledBefore={dateBegin}
                                disabledAfter={
                                    moment(dateBegin)
                                        .add(1, 'year')
                                        .subtract(1, 'day')
                                        .format('Y-MM-DD') > participantProject.dateTerminatedAllowedTo
                                        ? participantProject.dateTerminatedAllowedTo
                                        : moment(dateBegin)
                                              .add(1, 'year')
                                              .subtract(1, 'day')
                                              .format('Y-MM-DD')
                                }
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Uitkering (rente) %'}
                                name={'payPercentage'}
                                value={payPercentage}
                                onChangeAction={onChangePayPercentage}
                                error={errors.payPercentage}
                                errorMessage={errorMessages.payPercentage}
                            />
                            <InputText
                                type={'number'}
                                label={'of uitkeringsbedrag per deelname'}
                                name={'payAmount'}
                                value={payAmount}
                                onChangeAction={onChangePayAmount}
                                error={errors.payAmount}
                                errorMessage={errorMessages.payAmount}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={
                                    <>
                                        Bedrag <StyledEm>(uitkering % geldig tot en met)</StyledEm>
                                    </>
                                }
                                name={'keyAmountFirstPercentage'}
                                value={keyAmountFirstPercentage}
                                onChangeAction={onChangeKeyAmountFirstPercentage}
                                error={errors.keyAmountFirstPercentage}
                                errorMessage={errorMessages.keyAmountFirstPercentage}
                            />
                        </div>
                        {keyAmountFirstPercentage ? (
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={<>Uitkering (rente) % vanaf bedrag</>}
                                    name={'payPercentageValidFromKeyAmount'}
                                    value={payPercentageValidFromKeyAmount}
                                    onChangeAction={onChangePayPercentageValidFromKeyAmount}
                                    error={errors.payPercentageValidFromKeyAmount}
                                    errorMessage={errorMessages.payPercentageValidFromKeyAmount}
                                />
                            </div>
                        ) : null}
                    </>
                ) : null}

                <p className={'has-error-message'}>
                    LET OP: zodra een deelname beëindigd is zal deze NOOIT meer in nieuw aangemaakte opbrengst
                    verdelingen voorkomen, ook niet als je een nieuwe opbrengst verdeling aanmaakt op de datum voor de
                    beëindiging.
                </p>
            </Modal>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: participantProjectId => {
        dispatch(fetchParticipantProjectDetails(participantProjectId));
    },
});
const mapStateToProps = state => {
    return {
        projectRevenueDistributionTypes: state.systemData.projectRevenueDistributionTypes,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetailsTerminateObligation);
