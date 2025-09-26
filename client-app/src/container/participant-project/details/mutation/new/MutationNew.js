import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../../api/participant-project/ParticipantMutationAPI';
import { fetchParticipantProjectDetails } from '../../../../../actions/participants-project/ParticipantProjectDetailsActions';
import moment from 'moment/moment';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputSelect from '../../../../../components/form/InputSelect';
import ButtonText from '../../../../../components/button/ButtonText';
import MutationNewDeposit from './MutationNewDeposit';
import MutationNewValidateForm from './MutationNewValidateForm';
import MutationNewSubmitHelper from './MutationNewSubmitHelper';
import MutationNewWithDrawal from './MutationNewWithDrawal';
import Modal from '../../../../../components/modal/Modal';
import ErrorModal from '../../../../../components/modal/ErrorModal';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import calculateTransactionCosts from '../../../../../helpers/CalculateTransactionCosts';
import InputText from '../../../../../components/form/InputText';
import ParticipantProjectDetailsAPI from '../../../../../api/participant-project/ParticipantProjectDetailsAPI';

function MutationFormNew(props) {
    const [participationMutation, setParticipationMutation] = useState({
        participationId: props.id,
        typeId: '',
        statusId: '',
        quantityInterest: 0,
        amountInterest: 0,
        dateInterest: moment().format('YYYY-MM-DD'),
        quantityOption: 0,
        amountOption: 0,
        dateOption: moment().format('YYYY-MM-DD'),
        quantityGranted: 0,
        amountGranted: 0,
        dateGranted: moment().format('YYYY-MM-DD'),
        quantityFinal: 0,
        amountFinal: 0,
        dateContractRetour: null,
        datePayment: null,
        paymentReference: null,
        dateEntry: props.projectDateEntry
            ? moment(props.projectDateEntry).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
        transactionCostsAmount: 0,
        differentTransactionCostsAmount: null,
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState('');
    const [successNewMessage, setSuccessNewMessage] = useState(null);
    const [disableBeforeEntryDate, setDisableBeforeEntryDate] = useState('');

    useEffect(() => {
        getAdditionalInfoForTerminatingOrChangeEntryDate(participationMutation.participationId);
    }, [participationMutation.participationId]);

    function getAdditionalInfoForTerminatingOrChangeEntryDate(participationId) {
        ParticipantProjectDetailsAPI.getAdditionalInfoForTerminatingOrChangeEntryDate(participationId).then(payload => {
            setDisableBeforeEntryDate(
                payload.dateTerminatedAllowedFrom
                    ? moment(payload.dateTerminatedAllowedFrom)
                          .add(1, 'day')
                          .format('YYYY-MM-DD')
                    : ''
            );
        });
    }
    const handleInputChange = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'differentTransactionCostsAmount') {
            value = value ? Number(value) : null;
        }

        setParticipationMutation(prev => {
            const updated = { ...prev, [name]: value };
            linkedValueAdjustment(updated, name);
            return updated;
        });
    };

    // If field statusId is changed then change dateGranted when applicable
    let linkedValueAdjustment;
    linkedValueAdjustment = name => {
        if (name === 'statusId') {
            const currentStatusId = Number(updatedState.statusId);
            const checkStatusId = props.participantMutationStatuses.find(
                participantMutationStatus => participantMutationStatus.codeRef === 'final'
            ).id;
            updatedState.dateGranted = currentStatusId === checkStatusId ? null : moment().format('YYYY-MM-DD');
        }
    };

    const handleInputChangeDate = (value, name) => {
        setParticipationMutation(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        let localErrors = {};
        let localErrorMessage = {};
        let hasErrors = false;

        const type = props.participantMutationTypes.find(
            participantMutationType => participantMutationType.id == participationMutation.typeId
        );
        const mutationTypeCodeRef = type ? type.codeRef : null;

        const status = props.participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.id == participationMutation.statusId
        );

        const statusCodeRef = status ? status.codeRef : null;
        const projectTypeCodeRef = props.project ? props.project.typeCodeRef : null;

        const validatedForm = MutationNewValidateForm(
            participationMutation,
            disableBeforeEntryDate,
            localErrors,
            localErrorMessage,
            hasErrors,
            statusCodeRef,
            mutationTypeCodeRef,
            projectTypeCodeRef,
            props.participationsDefinitive,
            props.amountDefinitive
        );

        setErrors(validatedForm.errors);
        setErrorMessage(validatedForm.errorMessage);

        // If no errors send form
        if (!validatedForm.hasErrors) {
            const values = MutationNewSubmitHelper(
                participationMutation,
                statusCodeRef,
                mutationTypeCodeRef,
                projectTypeCodeRef
            );

            ParticipantMutationAPI.newParticipantMutation(values)
                .then(payload => {
                    props.fetchParticipantProjectDetails(props.id);
                    if (payload.data) {
                        setSuccessNewMessage(payload.data);
                    } else {
                        props.toggleShowNew();
                    }
                })
                .catch(error => {
                    let msg = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                    if (error.response.status !== 500) {
                        msg = error.response.data.message;
                    }
                    setModalErrorMessage(msg);
                    setShowErrorModal(true);
                });
        }
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
        setModalErrorMessage('');
    };

    // ----- render logic -----
    const { typeId, statusId, differentTransactionCostsAmount } = participationMutation;
    const {
        project,
        participantMutationStatuses,
        participantBelongsToMembershipGroup,
        participantChoiceMembership,
        hasLoanFirstDeposit,
        participationsDefinitive,
        amountDefinitive,
    } = props;

    const {
        projectDateInterestBearingKwh,
        currentBookWorth,
        showQuestionAboutMembership,
        useTransactionCostsWithMembership,
        projectTransactionCostsCodeRef,
    } = project;

    const projectTypeCodeRef = project ? project.typeCodeRef : null;

    const participantMutationTypes = props.participantMutationTypes.filter(
        participantMutationType => participantMutationType.projectTypeCodeRef === projectTypeCodeRef
    );

    const type = participantMutationTypes.find(participantMutationType => participantMutationType.id == typeId);
    const mutationTypeCodeRef = type ? type.codeRef : null;

    const status = participantMutationStatuses.find(
        participantMutationStatus => participantMutationStatus.id == statusId
    );
    const statusCodeRef = status ? status.codeRef : null;

    const participantMutationTypesOptions = participantMutationTypes.filter(participantMutationType => {
        if (projectTypeCodeRef === 'loan') {
            if (hasLoanFirstDeposit === null) {
                return participantMutationType.codeRef === 'first_deposit';
            } else if (hasLoanFirstDeposit === 'final') {
                return (
                    participantMutationType.codeRef === 'deposit' || participantMutationType.codeRef === 'withDrawal'
                );
            }
        } else {
            return (
                participantMutationType.codeRef === 'first_deposit' || participantMutationType.codeRef === 'withDrawal'
            );
        }
        return false;
    });

    const { amountInterest, amountOption, amountGranted, amountFinal } = participationMutation;

    function calculateQuantity() {
        if (projectTypeCodeRef !== 'loan') {
            if (statusCodeRef === 'interest') return participationMutation.quantityInterest;
            if (statusCodeRef === 'option') return participationMutation.quantityOption;
            if (statusCodeRef === 'granted') return participationMutation.quantityGranted;
            if (statusCodeRef === 'final') return participationMutation.quantityFinal;
        }
        return 0;
    }

    function calculateAmount() {
        if (projectTypeCodeRef === 'loan') {
            if (statusCodeRef === 'interest') return amountInterest;
            if (statusCodeRef === 'option') return amountOption;
            if (statusCodeRef === 'granted') return amountGranted;
            if (statusCodeRef === 'final') return amountFinal;
            return 0;
        } else {
            return calculateQuantity() * currentBookWorth;
        }
    }

    function calculateTransactionCostsAmount() {
        //Vragen over lid worden aan en Transactie kosten ook bij lidmaatschap Uit (keuze 1)
        if (showQuestionAboutMembership && !useTransactionCostsWithMembership) {
            //Indien al lid of indien keuze 1 (wil lid worden) dan geen transactiekosten,
            if (participantBelongsToMembershipGroup || participantChoiceMembership === 1) {
                return 0;
            }
        }
        return calculateTransactionCosts(project, calculateAmount(), calculateQuantity());
    }

    return (
        <>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Type'}
                                id="typeId"
                                name={'typeId'}
                                options={participantMutationTypesOptions}
                                value={typeId}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.typeId}
                            />
                            <InputSelect
                                label={'Status'}
                                id="statusId"
                                name={'statusId'}
                                options={participantMutationStatuses}
                                value={statusId}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.statusId}
                            />
                        </div>

                        <div className="row">
                            {projectTransactionCostsCodeRef === 'none' ||
                            (mutationTypeCodeRef !== 'first_deposit' &&
                                mutationTypeCodeRef !== 'deposit' &&
                                mutationTypeCodeRef !== 'withDrawal') ||
                            statusId == '' ? null : (
                                <>
                                    <ViewText
                                        label={'Transactiekosten (berekend)'}
                                        value={MoneyPresenter(calculateTransactionCostsAmount())}
                                        className={'form-group col-sm-6 '}
                                    />
                                    <InputText
                                        label={'Transactiekosten (afwijkend)'}
                                        id={'differentTransactionCostsAmount'}
                                        name={'differentTransactionCostsAmount'}
                                        labelClassName={
                                            calculateTransactionCostsAmount() != differentTransactionCostsAmount
                                                ? 'text-danger'
                                                : ''
                                        }
                                        value={differentTransactionCostsAmount}
                                        allowZero={true}
                                        onChangeAction={handleInputChange}
                                        required={'required'}
                                    />
                                </>
                            )}
                        </div>

                        {mutationTypeCodeRef === 'first_deposit' || mutationTypeCodeRef === 'deposit' ? (
                            <MutationNewDeposit
                                statusCodeRef={statusCodeRef}
                                {...participationMutation}
                                errors={errors}
                                errorMessage={errorMessage}
                                handleInputChange={handleInputChange}
                                handleInputChangeDate={handleInputChangeDate}
                                projectTypeCodeRef={projectTypeCodeRef}
                                // projectDateInterestBearingKwh={projectDateInterestBearingKwh}
                                disableBeforeEntryDate={disableBeforeEntryDate}
                            />
                        ) : null}

                        {mutationTypeCodeRef === 'withDrawal' ? (
                            <MutationNewWithDrawal
                                statusCodeRef={statusCodeRef}
                                {...participationMutation}
                                errors={errors}
                                errorMessage={errorMessage}
                                handleInputChange={handleInputChange}
                                handleInputChangeDate={handleInputChangeDate}
                                projectTypeCodeRef={projectTypeCodeRef}
                                // projectDateInterestBearingKwh={projectDateInterestBearingKwh}
                                participationsDefinitive={participationsDefinitive}
                                amountDefinitive={amountDefinitive}
                                disableBeforeEntryDate={disableBeforeEntryDate}
                            />
                        ) : null}

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>

            {successNewMessage && (
                <Modal
                    closeModal={props.toggleShowNew}
                    buttonCancelText={'Ok'}
                    showConfirmAction={false}
                    title={'Succes'}
                >
                    {successNewMessage.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </Modal>
            )}

            {showErrorModal && (
                <ErrorModal closeModal={closeErrorModal} title={'Fout bij opslaan'} errorMessage={modalErrorMessage} />
            )}
        </>
    );
}

const mapStateToProps = state => ({
    participantMutationTypes: state.systemData.participantMutationTypes,
    participantMutationStatuses: state.systemData.participantMutationStatuses,
    id: state.participantProjectDetails.id,
    hasLoanFirstDeposit: state.participantProjectDetails?.hasLoanFirstDeposit,
    participationsDefinitive: state.participantProjectDetails?.participationsDefinitive,
    amountDefinitive: state.participantProjectDetails?.amountDefinitive,
    project: state.participantProjectDetails.project,
    participantBelongsToMembershipGroup: state.participantProjectDetails.participantBelongsToMembershipGroup,
    participantChoiceMembership: state.participantProjectDetails.participantChoiceMembership,
});

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => dispatch(fetchParticipantProjectDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MutationFormNew);
