import React, { useEffect, useState } from 'react';

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

const ParticipantDetailsTerminateLoanOrObligation = ({
    participantProject,
    setErrorModal,
    closeDeleteItemModal,
    projectTypeCodeRef,
    fetchParticipantProjectDetails,
    projectRevenueDistributionTypes,
}) => {
    useEffect(() => {
        getAdditionalInfoForTerminatingOrChangeEntryDate(participantProject.id);
    }, [participantProject.id]);
    function getAdditionalInfoForTerminatingOrChangeEntryDate(participantProjectId) {
        ParticipantProjectDetailsAPI.getAdditionalInfoForTerminatingOrChangeEntryDate(participantProjectId).then(
            payload => {
                setDateReference(payload.dateReference ? payload.dateReference : '');
                setDateTerminatedAllowedFrom(
                    payload.dateTerminatedAllowedFrom ? payload.dateTerminatedAllowedFrom : ''
                );
                setDateTerminatedAllowedTo(payload.dateTerminatedAllowedTo ? payload.dateTerminatedAllowedTo : '');
                setDateEntryLastMutation(payload.dateEntryLastMutation ? payload.dateEntryLastMutation : '');
                setHasLastRevenueConceptDistribution(
                    payload.hasLastRevenueConceptDistribution ? payload.hasLastRevenueConceptDistribution : false
                );
                setDateBeginRevenue(payload.dateBeginRevenueTerminated ? payload.dateBeginRevenueTerminated : '');
                setDateEndRevenue(payload.dateEndRevenueTerminated ? payload.dateEndRevenueTerminated : '');
                setDistributionTypeIdRevenue(
                    payload.lastRevenueDistributionTypeId ? payload.lastRevenueDistributionTypeId : null
                );
                setDateReferenceRevenue(payload.lastRevenueDateReference ? payload.lastRevenueDateReference : null);
                setPayPercentageRevenue(payload.lastRevenuePayPercentage ? payload.lastRevenuePayPercentage : null);
                setPayAmountRevenue(payload.lastRevenuePayAmount ? payload.lastRevenuePayAmount : null);
                setKeyAmountFirstPercentageRevenue(
                    payload.lastRevenueKeyAmountFirstPercentage ? payload.lastRevenueKeyAmountFirstPercentage : null
                );
                setPayPercentageValidFromKeyAmountRevenue(
                    payload.lastRevenuePayPercentageValidFromKeyAmount
                        ? payload.lastRevenuePayPercentageValidFromKeyAmount
                        : null
                );

                // set dateTerminated after settings *Revenue fields because of useEffect actions on dateTerminated
                setDateTerminated(payload.dateTerminatedAllowedFrom ? payload.dateTerminatedAllowedFrom : '');
            }
        );
    }

    const [dateEntryLastMutation, setDateEntryLastMutation] = useState(null);
    const [dateTerminatedAllowedFrom, setDateTerminatedAllowedFrom] = useState('');
    const [dateTerminatedAllowedTo, setDateTerminatedAllowedTo] = useState('');
    const [dateBeginAllowedFrom, setDateBeginAllowedFrom] = useState('');
    const [dateBeginAllowedTo, setDateBeginAllowedTo] = useState('');
    const [hasLastRevenueConceptDistribution, setHasLastRevenueConceptDistribution] = useState(false);
    const [blockRevenueChange, setBlockRevenueChange] = useState(true);

    const [amountOrParticipationsDefinitive, setAmountOrParticipationsDefinitive] = useState(
        projectTypeCodeRef === 'loan'
            ? participantProject.amountDefinitive
            : participantProject.participationsDefinitive
    );

    const [dateBeginRevenue, setDateBeginRevenue] = useState(null);
    const [dateEndRevenue, setDateEndRevenue] = useState(null);
    const [distributionTypeIdRevenue, setDistributionTypeIdRevenue] = useState(null);
    const [dateReferenceRevenue, setDateReferenceRevenue] = useState(null);
    const [payPercentageRevenue, setPayPercentageRevenue] = useState(null);
    const [payAmountRevenue, setPayAmountRevenue] = useState(null);
    const [keyAmountFirstPercentageRevenue, setKeyAmountFirstPercentageRevenue] = useState(null);
    const [payPercentageValidFromKeyAmountRevenue, setPayPercentageValidFromKeyAmountRevenue] = useState(null);
    // set dateTerminated after settings *Revenue fields because of useEffect actions on dateTerminated
    const [dateTerminated, setDateTerminated] = useState(null);

    const [dateBegin, setDateBegin] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [distributionTypeId, setDistributionTypeId] = useState(
        projectTypeCodeRef === 'loan' ? 'howLongInPossession' : 'inPossessionOf'
    );
    const [dateReference, setDateReference] = useState(moment());
    const [payPercentage, setPayPercentage] = useState(null);
    const [payAmount, setPayAmount] = useState(null);
    const [keyAmountFirstPercentage, setKeyAmountFirstPercentage] = useState(null);
    const [payPercentageValidFromKeyAmount, setPayPercentageValidFromKeyAmount] = useState(null);

    useEffect(() => {
        setRevenueFields();
    }, [dateTerminated]);

    function setRevenueFields() {
        if (dateTerminated > dateEndRevenue) {
            let newBeginDate = moment(dateEndRevenue)
                .add(1, 'day')
                .format('Y-MM-DD');
            setDateBegin(newBeginDate);
            let newEndDate = moment(newBeginDate)
                .add(1, 'year')
                .subtract(1, 'day')
                .format('Y-MM-DD');
            setDateEnd(newEndDate);
            setDateBeginAllowedFrom(newBeginDate);
            setDateBeginAllowedTo(newEndDate);
            setBlockRevenueChange(false);
        } else {
            setDateBegin(dateBeginRevenue ? dateBeginRevenue : '');
            setDateEnd(dateEndRevenue ? dateEndRevenue : '');
            setDateBeginAllowedFrom(dateBeginRevenue ? dateBeginRevenue : '');
            setDateBeginAllowedTo(dateEndRevenue ? dateEndRevenue : '');
            setDistributionTypeId(
                distributionTypeIdRevenue
                    ? distributionTypeIdRevenue
                    : projectTypeCodeRef === 'loan'
                    ? 'howLongInPossession'
                    : 'inPossessionOf'
            );
            setDateReference(dateReferenceRevenue ? dateReferenceRevenue : moment());
            setPayPercentage(payPercentageRevenue ? payPercentageRevenue : null);
            setPayAmount(payAmountRevenue ? payAmountRevenue : null);
            setKeyAmountFirstPercentage(keyAmountFirstPercentageRevenue ? keyAmountFirstPercentageRevenue : null);
            setPayPercentageValidFromKeyAmount(
                payPercentageValidFromKeyAmountRevenue ? payPercentageValidFromKeyAmountRevenue : null
            );
            setBlockRevenueChange(hasLastRevenueConceptDistribution);
        }
    }

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
            distributionTypeId: false,
            dateReference: false,
            dateBegin: false,
            dateEnd: false,
            payPercentage: false,
            payAmount: false,
            keyAmountFirstPercentage: false,
            payPercentageValidFromKeyAmount: false,
        };
        let errorMessages = {
            dateTerminated: '',
            distributionTypeId: '',
            dateReference: '',
            dateBegin: '',
            dateEnd: '',
            payPercentage: '',
            payAmount: '',
            keyAmountFirstPercentage: '',
            payPercentageValidFromKeyAmount: '',
        };
        let hasErrors = false;

        if (validator.isEmpty(dateTerminated)) {
            errors.dateTerminated = true;
            errorMessages.dateTerminated = 'Ongeldige datum';
            hasErrors = true;
        }

        if (amountOrParticipationsDefinitive != 0) {
            if (!dateBegin) {
                errors.dateBegin = true;
                errorMessages.dateBegin = 'Verplicht';
                hasErrors = true;
            }
            if (!dateEnd) {
                errors.dateEnd = true;
                errorMessages.dateEnd = 'Verplicht';
                hasErrors = true;
            }
            if (!hasErrors && dateEnd < dateBegin) {
                errors.dateEnd = true;
                errorMessages.dateEnd = 'Eind periode mag niet voor Begin periode liggen.';
                hasErrors = true;
            }

            if (
                !hasErrors &&
                moment(dateBegin).format('Y-MM-DD') <
                    moment(dateEnd)
                        .add(-1, 'year')
                        .add(1, 'day')
                        .format('Y-MM-DD')
            ) {
                errors.dateBegin = true;
                errorMessages.dateBegin = 'Periode mag maximaal 1 jaar zijn.';
                errors.dateEnd = true;
                errorMessages.dateEnd = 'Periode mag maximaal 1 jaar zijn.';
                hasErrors = true;
            }

            if (distributionTypeId === 'inPossessionOf') {
                if (!hasErrors && validator.isEmpty('' + dateReference)) {
                    errors.dateReference = true;
                    hasErrors = true;
                }
            }
            if (payAmount && !validator.isEmpty('' + payAmount)) {
                if (!hasErrors && distributionTypeId !== 'inPossessionOf') {
                    errors.payAmount = true;
                    errorMessages.payAmount =
                        'Bedrag mag alleen bij type opbrengst verdeling "In bezit op" ingevuld zijn.';
                    hasErrors = true;
                }
                if (!hasErrors && payAmount && payAmount < 0) {
                    errors.payAmount = true;
                    errorMessages.payAmount = 'Bedrag mag niet negatief zijn.';
                    hasErrors = true;
                }
            }
            if (!hasErrors && payPercentage && payPercentage < 0) {
                errors.payPercentage = true;
                errorMessages.payPercentage = 'Percentage mag niet negatief zijn.';
                hasErrors = true;
            }

            if (
                !hasErrors &&
                ((payPercentage && !validator.isEmpty('' + payPercentage)) ||
                    (keyAmountFirstPercentage && !validator.isEmpty(keyAmountFirstPercentage)) ||
                    (payPercentageValidFromKeyAmount && !validator.isEmpty('' + payPercentageValidFromKeyAmount))) &&
                payAmount &&
                !validator.isEmpty('' + payAmount)
            ) {
                errors.payAmount = true;
                errors.payPercentage = true;
                errors.keyAmountFirstPercentage = true;
                errors.payPercentageValidFromKeyAmount = true;
                errorMessages.payAmount = 'Percentage(s) en Bedrag mogen niet allebei ingevuld zijn.';
                hasErrors = true;
            }
        }

        setErrors(errors);
        setErrorMessages(errorMessages);

        if (!hasErrors) {
            ParticipantProjectDetailsAPI.terminateParticipantProjectLoanOrObligation(participantProject.id, {
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
                        disabledBefore={dateTerminatedAllowedFrom}
                        disabledAfter={dateTerminatedAllowedTo}
                        error={errors.dateTerminated}
                        errorMessage={errorMessages.dateTerminated}
                        readOnly={dateTerminatedAllowedFrom == dateTerminatedAllowedTo}
                    />
                    {amountOrParticipationsDefinitive != 0 ? (
                        <ViewText
                            label={
                                'Datum laatste ' +
                                (projectTypeCodeRef === 'loan' ? 'aflossing' : 'terugbetaling') +
                                ' wordt'
                            }
                            value={
                                dateEntryLastMutation && dateTerminated
                                    ? moment(dateTerminated)
                                          .add(1, 'day')
                                          .format('DD-MM-Y')
                                    : ''
                            }
                        />
                    ) : (
                        <ViewText
                            label={'Datum laatste mutatie inleg/opname was'}
                            value={dateEntryLastMutation ? moment(dateEntryLastMutation).format('DD-MM-Y') : ''}
                        />
                    )}
                </div>

                {hasLastRevenueConceptDistribution &&
                amountOrParticipationsDefinitive == 0 &&
                (dateTerminated < dateBeginRevenue || dateTerminated > dateEndRevenue) ? (
                    <p className={'has-error-message'}>
                        Datum beëindigen valt buiten een concept verdeling waar deelnemer nog in zit. Bij beëindigen zal
                        er GEEN afsluitende opbrengst verdeling (uitkering) voor deze deelnemer gemaakt worden !
                    </p>
                ) : (
                    // ) : dateTerminated >= dateBegin && dateTerminated <= dateEnd ? (
                    <>
                        <p>
                            Afsluitende opbrengst verdeling (uitkering) voor deze deelnemer maken
                            {blockRevenueChange ? '!' : '?'}
                        </p>
                        {projectTypeCodeRef === 'obligation' ? (
                            <div className="row">
                                <InputSelect
                                    label={'Type opbrengst verdeling'}
                                    name={'distributionTypeId'}
                                    options={projectRevenueDistributionTypes}
                                    emptyOption={false}
                                    value={distributionTypeId}
                                    readOnly={blockRevenueChange}
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
                                        readOnly={blockRevenueChange}
                                        onChangeAction={onChangeDateReference}
                                        error={errors.dateReference}
                                        errorMessage={errorMessages.dateReference}
                                    />
                                ) : null}
                            </div>
                        ) : null}
                        <div className="row">
                            <InputDate
                                label={'Begin periode'}
                                name={'dateBegin'}
                                value={dateBegin}
                                onChangeAction={onChangeDateBegin}
                                required={'required'}
                                readOnly={blockRevenueChange}
                                error={errors.dateBegin}
                                errorMessage={errorMessages.dateBegin}
                                disabledBefore={dateBeginAllowedFrom}
                                disabledAfter={dateBeginAllowedTo}
                            />
                            <InputDate
                                label={'Eind periode'}
                                name={'dateEnd'}
                                value={dateEnd}
                                onChangeAction={onChangeDateEnd}
                                required={'required'}
                                readOnly={blockRevenueChange}
                                error={errors.dateEnd}
                                errorMessage={errorMessages.dateEnd}
                                disabledBefore={dateBegin}
                                disabledAfter={
                                    moment(dateBegin)
                                        .add(1, 'year')
                                        .subtract(1, 'day')
                                        .format('Y-MM-DD') > dateBeginAllowedTo
                                        ? dateBeginAllowedTo
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
                                disabled={blockRevenueChange}
                                onChangeAction={onChangePayPercentage}
                                error={errors.payPercentage}
                                errorMessage={errorMessages.payPercentage}
                            />
                            {projectTypeCodeRef === 'obligation' ? (
                                <InputText
                                    type={'number'}
                                    label={'of uitkeringsbedrag per deelname'}
                                    name={'payAmount'}
                                    value={payAmount}
                                    disabled={blockRevenueChange}
                                    onChangeAction={onChangePayAmount}
                                    error={errors.payAmount}
                                    errorMessage={errorMessages.payAmount}
                                />
                            ) : null}
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
                                disabled={blockRevenueChange}
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
                                    disabled={blockRevenueChange}
                                    onChangeAction={onChangePayPercentageValidFromKeyAmount}
                                    error={errors.payPercentageValidFromKeyAmount}
                                    errorMessage={errorMessages.payPercentageValidFromKeyAmount}
                                />
                            </div>
                        ) : null}
                        <p className={'has-error-message'}>
                            LET OP: zodra een deelname beëindigd is zal deze NOOIT meer in nieuw aangemaakte project
                            opbrengst verdelingen voorkomen, ook niet als je een nieuwe opbrengst verdeling aanmaakt op
                            de datum voor de beëindiging. Een afsluitende opbrengst verdeling (uitkering) voor deze te
                            beëindigen deelnemer kan je aanmaken door bovenstaande gegevens in te vullen.
                        </p>
                    </>
                )}
                {/*) : null}*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetailsTerminateLoanOrObligation);
