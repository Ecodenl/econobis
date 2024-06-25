import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

moment.locale('nl');

import QuotationRequestDetailsAPI from '../../../api/quotation-request/QuotationRequestDetailsAPI';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';
import InputTextArea from '../../../components/form/InputTextArea';
import validator from 'validator';
import InputTime from '../../../components/form/InputTime';
import Modal from '../../../components/modal/Modal';

class QuotationRequestNewFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunityActionCodeRef: props.opportunityAction.codeRef,
            visitDefaultStatusId: null,
            visitMadeStatusId: null,
            visitDoneStatusId: null,
            visitCanceledStatusId: null,
            opportunity: {
                fullName: '',
                fullAddress: '',
                measureName: '',
                organisationsOrCoaches: [],
                projectManagers: [],
                externalParties: [],
            },
            quotationRequest: {
                opportunityId: '',
                organisationOrCoachId: '',
                projectManagerId: '',
                externalPartyId: '',
                statusId: '',
                opportunityActionId: props.opportunityAction.id,
                dateRecorded: '',
                timeRecorded: '',
                dateReleased: '',
                timeReleased: '',
                datePlannedAttempt1: '',
                datePlanned: '',
                timePlanned: '',
                dateApprovedClient: '',
                dateApprovedProjectManager: '',
                dateApprovedExternal: '',
                quotationText: '',
                quotationAmount: '',
                costAdjustment: '',
                awardAmount: '',
            },
            quotationRequestStatuses: [],
            errors: {
                organisationOrCoach: false,
                projectManager: false,
                externalParty: false,
                status: false,
            },
            errorMessage: '',
            showHoomdossierWarningModal: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillMount() {
        QuotationRequestDetailsAPI.fetchNewQuotationRequest(
            this.props.opportunityId,
            this.props.opportunityAction.id
        ).then(payload => {
            // this.state.opportunityActionCodeRef                'visit'
            // this.state.visitDefaultStatusId                     7
            // this.state.visitMadeStatusId                        8
            // this.state.visitDoneStatusId                        9
            // this.state.visitCanceledStatusId                    14

            this.setState({
                visitDefaultStatusId:
                    this.state.opportunityActionCodeRef === 'visit'
                        ? payload.relatedQuotationRequestsStatuses.find(status => {
                              return status.codeRef == 'default';
                          }).id
                        : null,
                visitMadeStatusId:
                    this.state.opportunityActionCodeRef === 'visit'
                        ? payload.relatedQuotationRequestsStatuses.find(status => {
                              return status.codeRef == 'made';
                          }).id
                        : null,
                visitDoneStatusId:
                    this.state.opportunityActionCodeRef === 'visit'
                        ? payload.relatedQuotationRequestsStatuses.find(status => {
                              return status.codeRef == 'done';
                          }).id
                        : null,
                visitCanceledStatusId:
                    this.state.opportunityActionCodeRef === 'visit'
                        ? payload.relatedQuotationRequestsStatuses.find(status => {
                              return status.codeRef == 'cancelled';
                          }).id
                        : null,
                opportunity: {
                    fullName: payload.intake.contact.fullName,
                    fullAddress: payload.intake.fullAddress,
                    organisationsOrCoaches:
                        payload.intake && payload.intake.campaign ? payload.intake.campaign.organisationsOrCoaches : '',
                    projectManagers:
                        payload.intake && payload.intake.campaign ? payload.intake.campaign.projectManagers : '',
                    externalParties:
                        payload.intake && payload.intake.campaign ? payload.intake.campaign.externalParties : '',
                    measureNames: payload.measures && payload.measures.map(measure => measure.name).join(', '),
                    measureCategoryName: payload.measureCategory.name,
                },
                quotationRequest: {
                    opportunityId: payload.id,
                    organisationOrCoachId: '',
                    projectManagerId: '',
                    externalPartyId: '',
                    statusId: payload.defaultStatusId, // default status id!
                    opportunityActionId: this.props.opportunityAction.id,
                    dateRecorded: '',
                    timeRecorded: '08:00',
                    dateReleased: '',
                    timeReleased: '08:00',
                    datePlannedAttempt1: '',
                    datePlanned: '',
                    timePlanned: '08:00',
                    dateApprovedClient: '',
                    dateApprovedProjectManager: '',
                    dateApprovedExternal: '',
                    dateUnderReview: '',
                    dateExecuted: '',
                    quotationText: payload.quotationText ? payload.quotationText : '',
                    quotationAmount: '',
                    costAdjustment: '',
                    awardAmount: '',
                },
                quotationRequestStatuses: payload.relatedQuotationRequestsStatuses
                    ? payload.relatedQuotationRequestsStatuses
                    : [],
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (
            name === 'statusId' &&
            this.state.opportunityActionCodeRef === 'visit' &&
            value == this.state.visitDefaultStatusId
        ) {
            this.setState({
                ...this.state,
                quotationRequest: {
                    ...this.state.quotationRequest,
                    [name]: value,
                    datePlanned: '',
                    timePlanned: '08:00',
                    dateRecorded: '',
                    timeRecorded: '08:00',
                },
            });
        } else if (
            name == 'statusId' &&
            this.state.opportunityActionCodeRef === 'visit' &&
            value == this.state.visitDoneStatusId
        ) {
            this.setState({
                ...this.state,
                quotationRequest: {
                    ...this.state.quotationRequest,
                    [name]: value,
                    dateRecorded: this.state.quotationRequest.datePlanned,
                    timeRecorded: this.state.quotationRequest.timePlanned,
                },
            });
        } else {
            this.setState({
                ...this.state,
                quotationRequest: {
                    ...this.state.quotationRequest,
                    [name]: value,
                },
            });
        }
    };

    handleInputChangeDate(value, name) {
        if (
            name == 'datePlanned' &&
            this.state.opportunityActionCodeRef === 'visit' &&
            this.state.quotationRequest.statusId != this.state.visitCanceledStatusId
        ) {
            this.setState({
                ...this.state,
                quotationRequest: {
                    ...this.state.quotationRequest,
                    [name]: value,
                    statusId: this.state.visitMadeStatusId,
                },
            });
        } else {
            this.setState({
                ...this.state,
                quotationRequest: {
                    ...this.state.quotationRequest,
                    [name]: value,
                },
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const { quotationRequest } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(quotationRequest.statusId + '')) {
            errors.status = true;
            hasErrors = true;
        }

        if (isNaN(quotationRequest.quotationAmount)) {
            quotationRequest.quotationAmount = quotationRequest.quotationAmount.replace(/,/g, '.');
        } else {
            quotationRequest.quotationAmount = quotationRequest.quotationAmount + '';
        }
        if (isNaN(quotationRequest.costAdjustment)) {
            quotationRequest.costAdjustment = quotationRequest.costAdjustment.replace(/,/g, '.');
        } else {
            quotationRequest.costAdjustment = quotationRequest.costAdjustment + '';
        }
        if (isNaN(quotationRequest.awardAmount)) {
            quotationRequest.awardAmount = quotationRequest.awardAmount.replace(/,/g, '.');
        } else {
            quotationRequest.awardAmount = quotationRequest.awardAmount + '';
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            QuotationRequestDetailsAPI.newQuotationRequest(quotationRequest)
                .then(payload => {
                    hashHistory.push(`/offerteverzoek/${payload.data.id}`);
                })
                .catch(error => {
                    if (error.response && error.response.status === 422) {
                        if (error.response.data && error.response.data.errors) {
                            if (error.response.data.errors.econobis && error.response.data.errors.econobis.length) {
                                this.setState({
                                    ...this.state,
                                    errorMesssage: 'Niet alle benodigde gegevens zijn ingevuld',
                                });
                            }
                        } else if (error.response.data && error.response.data.message) {
                            let messageErrors = [];
                            for (const [key, value] of Object.entries(JSON.parse(error.response.data.message))) {
                                messageErrors.push(`${value}`);
                            }
                            this.setState({
                                ...this.state,
                                errorMesssage: messageErrors,
                                showHoomdossierWarningModal: true,
                            });
                        }
                    } else {
                        this.setState({
                            ...this.state,
                            errorMesssage:
                                'Er is iets misgegaan bij het aanmaken van het hoomdossier (' +
                                (error.response && error.response.status) +
                                ').',
                            showHoomdossierWarningModal: true,
                        });
                    }
                });
    };

    closeHoomdossierWarningModal = () => {
        this.setState({
            showHoomdossierWarningModal: false,
        });
        hashHistory.push(`/kans/${this.props.opportunityId}`);
    };

    render() {
        const {
            organisationOrCoachId,
            projectManagerId,
            externalPartyId,
            statusId,
            dateRecorded,
            timeRecorded,
            dateReleased,
            timeReleased,
            datePlannedAttempt1,
            datePlanned,
            timePlanned,
            dateApprovedClient,
            dateApprovedProjectManager,
            dateApprovedExternal,
            dateUnderReview,
            dateExecuted,
            quotationText,
            quotationAmount,
            costAdjustment,
            awardAmount,
        } = this.state.quotationRequest;
        const {
            fullName,
            fullAddress,
            organisationsOrCoaches,
            projectManagers,
            externalParties,
            measureNames,
            measureCategoryName,
        } = this.state.opportunity;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Organisatie/Coach'}
                        size={'col-sm-6'}
                        name="organisationOrCoachId"
                        value={organisationOrCoachId}
                        options={organisationsOrCoaches}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.organisation}
                    />
                    <InputText
                        label={'Verzoek voor bewoner'}
                        name={'fullName'}
                        value={fullName}
                        onChange={() => {}}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Projectleider'}
                        size={'col-sm-6'}
                        name="projectManagerId"
                        value={projectManagerId}
                        options={projectManagers}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.projectManagerId}
                    />
                    <InputText
                        label={'Adres'}
                        name={'address'}
                        value={fullAddress}
                        onChange={() => {}}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Externe partij'}
                        size={'col-sm-6'}
                        name="externalPartyId"
                        value={externalPartyId}
                        options={externalParties}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.externalPartyId}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Maatregel - categorie'}
                        name={'measureCategory'}
                        value={measureCategoryName}
                        onChange={() => {}}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Maatregel - specifiek'}
                        name={'measure'}
                        value={measureNames}
                        onChange={() => {}}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-6'}
                        name="statusId"
                        value={statusId}
                        options={this.state.quotationRequestStatuses}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.status}
                    />
                </div>

                <div className="row">
                    <InputTextArea
                        label={'Omschrijving'}
                        name={'quotationText'}
                        value={quotationText}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                {this.props.opportunityAction.codeRef === 'visit' ? (
                    <div className="row">
                        <InputDate
                            label={'Datum afspraakpoging 1'}
                            size={'col-sm-6'}
                            name="datePlannedAttempt1"
                            value={datePlannedAttempt1}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    </div>
                ) : null}

                <div className="row">
                    <InputDate
                        label="Datum afspraak"
                        size={'col-sm-6'}
                        name="datePlanned"
                        value={datePlanned}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    {datePlanned ? (
                        <InputTime
                            label={'Tijd afspraak'}
                            size={'col-sm-3'}
                            name="timePlanned"
                            value={timePlanned}
                            start={'06:00'}
                            end={'23:00'}
                            onChangeAction={this.handleInputChangeDate}
                            nullableSize={'col-sm-3'}
                            nullable={true}
                            nullableLabel={'Onbekend'}
                            nullableChecked={true}
                        />
                    ) : null}
                </div>

                <div className="row">
                    <InputDate
                        label="Afspraak gedaan op"
                        size={'col-sm-6'}
                        name="dateRecorded"
                        value={dateRecorded}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    {dateRecorded ? (
                        <InputTime
                            label={'Tijd opname'}
                            size={'col-sm-3'}
                            name="timeRecorded"
                            value={timeRecorded}
                            start={'06:00'}
                            end={'23:00'}
                            onChangeAction={this.handleInputChangeDate}
                            nullableSize={'col-sm-3'}
                            nullable={true}
                            nullableLabel={'Onbekend'}
                            nullableChecked={true}
                        />
                    ) : null}
                </div>

                {this.props.opportunityAction.codeRef === 'quotation-request' ||
                this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum uitgebracht"
                                size={'col-sm-6'}
                                name="dateReleased"
                                value={dateReleased}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            {dateReleased ? (
                                <InputTime
                                    label={'Tijd uitgebracht'}
                                    size={'col-sm-3'}
                                    name="timeReleased"
                                    value={timeReleased}
                                    start={'06:00'}
                                    end={'23:00'}
                                    onChangeAction={this.handleInputChangeDate}
                                    nullableSize={'col-sm-3'}
                                    nullable={true}
                                    nullableLabel={'Onbekend'}
                                    nullableChecked={true}
                                />
                            ) : null}
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum akkoord bewoner"
                                size={'col-sm-6'}
                                name="dateApprovedClient"
                                value={dateApprovedClient}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum akkoord projectleider"
                                size={'col-sm-6'}
                                name="dateApprovedProjectManager"
                                value={dateApprovedProjectManager}
                                onChangeAction={this.handleInputChangeDate}
                                readOnly={this.props.opportunityAction.codeRef === 'subsidy-request'}
                            />
                        </div>
                    </>
                ) : null}
                {this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum akkoord toekenning"
                                size={'col-sm-6'}
                                name="dateApprovedExternal"
                                value={dateApprovedExternal}
                                onChangeAction={this.handleInputChangeDate}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum toekenning in behandeling"
                                size={'col-sm-6'}
                                name="dateUnderReview"
                                value={dateUnderReview}
                                onChangeAction={this.handleInputChangeDate}
                                readOnly={true}
                            />
                        </div>
                    </>
                ) : null}
                {this.props.opportunityAction.codeRef === 'quotation-request' ||
                this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum uitgevoerd"
                                size={'col-sm-6'}
                                name="dateExecuted"
                                value={dateExecuted}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                type={'number'}
                                label={
                                    this.props.opportunityAction.codeRef === 'subsidy-request'
                                        ? 'Budgetaanvraagbedrag'
                                        : 'Offertebedrag'
                                }
                                size={'col-sm-6'}
                                name="quotationAmount"
                                value={quotationAmount}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                    </>
                ) : null}

                {this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Kosten aanpassing'}
                                size={'col-sm-6'}
                                name="costAdjustment"
                                value={costAdjustment}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Bedrag toekenning'}
                                size={'col-sm-6'}
                                name="awardAmount"
                                value={awardAmount}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                    </>
                ) : null}

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
                {this.state.showHoomdossierWarningModal && (
                    <Modal
                        buttonClassName={'btn-danger'}
                        closeModal={this.closeHoomdossierWarningModal}
                        buttonCancelText={'Sluiten'}
                        showConfirmAction={false}
                        title="Hoomdossier aanmaken"
                    >
                        <p>Kansactie is wel aangemaakt, maar er zijn meldingen vanuit Hoomdossier:</p>
                        {this.state.errorMesssage.length ? (
                            <ul>
                                {this.state.errorMesssage.map(item => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        ) : null}
                    </Modal>
                )}
            </form>
        );
    }
}

export default QuotationRequestNewFormGeneral;
