import React, { Component } from 'react';
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

class MutationFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participationMutation: {
                participationId: this.props.id,
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
                dateEntry: this.props.projectDateEntry
                    ? moment(this.props.projectDateEntry).format('YYYY-MM-DD')
                    : moment().format('YYYY-MM-DD'),
                transactionCostsAmount: 0,
                differentTransactionCostsAmount: null,
            },
            errors: {},
            errorMessage: {},
            showErrorModal: false,
            modalErrorMessage: '',
        };
    }

    handleInputChange = event => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'differentTransactionCostsAmount') {
            if (value) {
                value = Number(value);
            } else {
                value = null;
            }
        }

        this.setState(
            {
                ...this.state,
                participationMutation: {
                    ...this.state.participationMutation,
                    [name]: value,
                },
            },
            () => this.linkedValueAdjustment(name)
        );
    };

    linkedValueAdjustment = name => {
        // If field statusId is changed then change dateGranted when applicable
        if (name === 'statusId') {
            const currentStatusId = Number(this.state.participationMutation.statusId);
            const checkStatusId = this.props.participantMutationStatuses.find(
                participantMutationStatuses => participantMutationStatuses.codeRef === 'final'
            ).id;
            const dateGranted = currentStatusId === checkStatusId ? null : moment().format('YYYY-MM-DD');

            this.setState({
                ...this.state,
                participation: {
                    ...this.state.participation,
                    dateGranted,
                },
            });
        }
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { participationMutation } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        const type = this.props.participantMutationTypes.find(
            participantMutationType => participantMutationType.id == participationMutation.typeId
        );
        const mutationTypeCodeRef = type ? type.codeRef : null;

        const status = this.props.participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.id == participationMutation.statusId
        );
        const participationsDefinitive = this.props.participationsDefinitive;
        const amountDefinitive = this.props.amountDefinitive;

        const statusCodeRef = status ? status.codeRef : null;
        const projectTypeCodeRef = this.props.project ? this.props.project.typeCodeRef : null;

        const validatedForm = MutationNewValidateForm(
            participationMutation,
            errors,
            errorMessage,
            hasErrors,
            statusCodeRef,
            mutationTypeCodeRef,
            projectTypeCodeRef,
            participationsDefinitive,
            amountDefinitive
        );

        this.setState({ ...this.state, errors: validatedForm.errors, errorMessage: validatedForm.errorMessage });

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
                    this.props.fetchParticipantProjectDetails(this.props.id);
                    if (payload.data) {
                        this.setState({
                            ...this.state,
                            successNewMessage: payload.data,
                        });
                    } else {
                        this.props.toggleShowNew();
                    }
                })
                .catch(error => {
                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }
                    this.setState({
                        showErrorModal: true,
                        modalErrorMessage: errorMessage,
                    });
                });
        }
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        const { typeId, statusId, differentTransactionCostsAmount } = this.state.participationMutation;

        const {
            project,
            participantMutationStatuses,
            participantBelongsToMembershipGroup,
            participantChoiceMembership,
            hasLoanFirstDeposit,
            participationsDefinitive,
            amountDefinitive,
        } = this.props;

        const {
            projectDateInterestBearingKwh,
            currentBookWorth,
            showQuestionAboutMembership,
            useTransactionCostsWithMembership,
            projectTransactionCostsCodeRef,
        } = project;

        const projectTypeCodeRef = project ? project.typeCodeRef : null;

        const participantMutationTypes = this.props.participantMutationTypes.filter(
            participantMutationType => participantMutationType.projectTypeCodeRef === projectTypeCodeRef
        );

        const type = participantMutationTypes.find(participantMutationType => participantMutationType.id == typeId);
        const mutationTypeCodeRef = type ? type.codeRef : null;

        const status = participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.id == statusId
        );
        const statusCodeRef = status ? status.codeRef : null;

        // const participantMutationTypesOptions = participantMutationTypes.filter(
        //     participantMutationType =>
        //         participantMutationType.codeRef === 'first_deposit' ||
        //         participantMutationType.codeRef === 'deposit' ||
        //         participantMutationType.codeRef === 'withDrawal'
        // );

        const participantMutationTypesOptions = participantMutationTypes.filter(participantMutationType => {
            if (projectTypeCodeRef === 'loan') {
                if (hasLoanFirstDeposit === false) {
                    return participantMutationType.codeRef === 'first_deposit';
                } else if (statusCodeRef && statusCodeRef === 'final') {
                    return (
                        participantMutationType.codeRef === 'deposit' ||
                        participantMutationType.codeRef === 'withDrawal'
                    );
                }
            } else {
                return (
                    participantMutationType.codeRef === 'first_deposit' ||
                    participantMutationType.codeRef === 'withDrawal'
                );
            }
        });

        const { amountInterest, amountOption, amountGranted, amountFinal } = this.state.participationMutation;

        function calculateAmount() {
            let amountMutation = 0;
            let quantityMutation = calculateQuantity();

            if (projectTypeCodeRef === 'loan') {
                if (statusCodeRef === 'interest') {
                    amountMutation = amountInterest;
                }
                if (statusCodeRef === 'option') {
                    amountMutation = amountOption;
                }

                if (statusCodeRef === 'granted') {
                    amountMutation = amountGranted;
                }

                if (statusCodeRef === 'final') {
                    amountMutation = amountFinal;
                }
            } else {
                amountMutation = quantityMutation * currentBookWorth;
            }

            return amountMutation;
        }

        const { quantityOption, quantityInterest, quantityGranted, quantityFinal } = this.state.participationMutation;

        function calculateQuantity() {
            let quantityMutation = 0;

            if (projectTypeCodeRef === 'loan') {
                return 0;
            } else {
                if (statusCodeRef === 'interest') {
                    quantityMutation = quantityInterest;
                }

                if (statusCodeRef === 'option') {
                    quantityMutation = quantityOption;
                }

                if (statusCodeRef === 'granted') {
                    quantityMutation = quantityGranted;
                }

                if (statusCodeRef === 'final') {
                    quantityMutation = quantityFinal;
                }
            }

            return quantityMutation;
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
            <React.Fragment>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel className={'panel-grey'}>
                        <PanelBody>
                            <div className="row">
                                <InputSelect
                                    label={'Type'}
                                    id="typeId"
                                    name={'typeId'}
                                    options={participantMutationTypesOptions}
                                    value={typeId}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.typeId}
                                />
                                <InputSelect
                                    label={'Status'}
                                    id="statusId"
                                    name={'statusId'}
                                    options={participantMutationStatuses}
                                    value={statusId}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.statusId}
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
                                            // type={'number'}
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
                                            onChangeAction={this.handleInputChange}
                                            required={'required'}
                                        />
                                    </>
                                )}
                            </div>

                            {mutationTypeCodeRef === 'first_deposit' || mutationTypeCodeRef === 'deposit' ? (
                                <MutationNewDeposit
                                    statusCodeRef={statusCodeRef}
                                    {...this.state.participationMutation}
                                    errors={this.state.errors}
                                    errorMessage={this.state.errorMessage}
                                    handleInputChange={this.handleInputChange}
                                    handleInputChangeDate={this.handleInputChangeDate}
                                    projectTypeCodeRef={projectTypeCodeRef}
                                    projectDateInterestBearingKwh={projectDateInterestBearingKwh}
                                />
                            ) : null}

                            {mutationTypeCodeRef === 'withDrawal' ? (
                                <MutationNewWithDrawal
                                    statusCodeRef={statusCodeRef}
                                    {...this.state.participationMutation}
                                    errors={this.state.errors}
                                    errorMessage={this.state.errorMessage}
                                    handleInputChange={this.handleInputChange}
                                    handleInputChangeDate={this.handleInputChangeDate}
                                    projectTypeCodeRef={projectTypeCodeRef}
                                    projectDateInterestBearingKwh={projectDateInterestBearingKwh}
                                    participationsDefinitive={participationsDefinitive}
                                    amountDefinitive={amountDefinitive}
                                />
                            ) : null}

                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Annuleren'}
                                    onClickAction={this.props.toggleShowNew}
                                />
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    onClickAction={this.handleSubmit}
                                    type={'submit'}
                                    value={'Submit'}
                                />
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
                {this.state.successNewMessage && (
                    <Modal
                        closeModal={this.props.toggleShowNew}
                        buttonCancelText={'Ok'}
                        showConfirmAction={false}
                        title={'Succes'}
                    >
                        {this.state.successNewMessage.map(function(messageLine, index) {
                            return <p key={index}>{messageLine}</p>;
                        })}
                    </Modal>
                )}
                {this.state.showErrorModal && (
                    <ErrorModal
                        closeModal={this.closeErrorModal}
                        title={'Fout bij opslaan'}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantMutationTypes: state.systemData.participantMutationTypes,
        participantMutationStatuses: state.systemData.participantMutationStatuses,
        id: state.participantProjectDetails.id,
        hasLoanFirstDeposit: state.participantProjectDetails?.hasLoanFirstDeposit,
        participationsDefinitive: state.participantProjectDetails?.participationsDefinitive,
        amountDefinitive: state.participantProjectDetails?.amountDefinitive,
        project: state.participantProjectDetails.project,
        participantBelongsToMembershipGroup: state.participantProjectDetails.participantBelongsToMembershipGroup,
        participantChoiceMembership: state.participantProjectDetails.participantChoiceMembership,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MutationFormNew);
