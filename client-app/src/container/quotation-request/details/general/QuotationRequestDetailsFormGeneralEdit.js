import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import QuotationRequestDetailsAPI from '../../../../api/quotation-request/QuotationRequestDetailsAPI';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import InputTextArea from '../../../../components/form/InputTextArea';
import validator from 'validator';
import { fetchQuotationRequestDetails } from '../../../../actions/quotation-request/QuotationRequestDetailsActions';
import InputTime from '../../../../components/form/InputTime';
import ViewText from '../../../../components/form/ViewText';

class QuotationRequestDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            organisationOrCoach,
            organisationsOrCoachesToSelect,
            projectManager,
            projectManagersToSelect,
            externalParty,
            externalPartiesToSelect,
            status,
            opportunityAction,
            datePlannedToSendWfEmailStatus,
            dateRecorded,
            dateReleased,
            datePlannedAttempt1,
            datePlannedAttempt2,
            datePlannedAttempt3,
            datePlanned,
            dateApprovedExternal,
            dateUnderReview,
            dateApprovedProjectManager,
            dateApprovedClient,
            dateExecuted,
            dateUnderReviewDetermination,
            dateApprovedDetermination,
            quotationText,
            quotationAmount,
            costAdjustment,
            awardAmount,
            amountDetermination,
            opportunity,
            relatedQuotationRequestsStatuses,
            coachOrOrganisationNote,
            projectmanagerNote,
            externalpartyNote,
            clientNote,
        } = props.quotationRequestDetails;

        // this.state.opportunityActionCodeRef                'visit'
        // this.state.visitDefaultStatusId                     7
        // this.state.visitMadeStatusId                        8
        // this.state.visitDoneStatusId                        9
        // this.state.visitCanceledStatusId                    14

        this.state = {
            opportunityActionCodeRef: opportunityAction.codeRef,
            visitDefaultStatusId:
                opportunityAction.codeRef === 'visit'
                    ? relatedQuotationRequestsStatuses.find(status => {
                          return status.codeRef == 'default';
                      }).id
                    : null,
            visitMadeStatusId:
                opportunityAction.codeRef === 'visit'
                    ? relatedQuotationRequestsStatuses.find(status => {
                          return status.codeRef == 'made';
                      }).id
                    : null,
            visitDoneStatusId:
                opportunityAction.codeRef === 'visit'
                    ? relatedQuotationRequestsStatuses.find(status => {
                          return status.codeRef == 'done';
                      }).id
                    : null,
            visitCanceledStatusId:
                opportunityAction.codeRef === 'visit'
                    ? relatedQuotationRequestsStatuses.find(status => {
                          return status.codeRef == 'cancelled';
                      }).id
                    : null,
            opportunity: {
                opportunityId: opportunity.id ? opportunity.id : '',
                opportunityNumber: opportunity.number ? opportunity.number : '',
                fullName: opportunity.intake ? opportunity.intake.contact.fullName : '',
                fullAddress: opportunity.intake ? opportunity.intake.fullAddress : '',
                measureNames: opportunity.measures && opportunity.measures.map(measure => measure.name).join(', '),
                measureCategoryName: opportunity.measureCategory.name,
                currentOpportunityStatus: opportunity.status.name,
                newOpportunityStatus: '',
            },
            quotationRequest: {
                id,
                opportunityId: opportunity.id,
                organisationOrCoachId: organisationOrCoach ? organisationOrCoach.id : '',
                organisationsOrCoaches: organisationsOrCoachesToSelect ? organisationsOrCoachesToSelect : '',
                projectManagerId: projectManager ? projectManager.id : '',
                projectManagers: projectManagersToSelect ? projectManagersToSelect : '',
                externalPartyId: externalParty ? externalParty.id : '',
                externalParties: externalPartiesToSelect ? externalPartiesToSelect : '',
                statusId: status.id,
                opportunityActionId: opportunityAction.id,
                statusUsesWf: status ? status.usesWf : false,
                datePlannedToSendWfEmailStatus: datePlannedToSendWfEmailStatus
                    ? moment(datePlannedToSendWfEmailStatus).format('L')
                    : '',
                dateRecorded: dateRecorded ? dateRecorded : '',
                timeRecorded: dateRecorded ? moment(dateRecorded).format('HH:mm') : '08:00',
                dateReleased: dateReleased ? dateReleased : '',
                timeReleased: dateReleased ? moment(dateReleased).format('HH:mm') : '08:00',
                datePlannedAttempt1: datePlannedAttempt1 ? datePlannedAttempt1 : '',
                datePlannedAttempt2: datePlannedAttempt2 ? datePlannedAttempt2 : '',
                datePlannedAttempt3: datePlannedAttempt3 ? datePlannedAttempt3 : '',
                datePlanned: datePlanned ? datePlanned : '',
                timePlanned: datePlanned ? moment(datePlanned).format('HH:mm') : '08:00',
                dateApprovedExternal: dateApprovedExternal ? dateApprovedExternal : '',
                dateUnderReview: dateUnderReview ? dateUnderReview : '',
                dateApprovedProjectManager: dateApprovedProjectManager ? dateApprovedProjectManager : '',
                dateApprovedClient: dateApprovedClient ? dateApprovedClient : '',
                dateExecuted: dateExecuted ? dateExecuted : '',
                dateUnderReviewDetermination: dateUnderReviewDetermination ? dateUnderReviewDetermination : '',
                dateApprovedDetermination: dateApprovedDetermination ? dateApprovedDetermination : '',
                quotationText: quotationText ? quotationText : '',
                quotationAmount: quotationAmount ? quotationAmount : 0,
                costAdjustment: costAdjustment ? costAdjustment : 0,
                awardAmount: awardAmount ? awardAmount : 0,
                amountDetermination: amountDetermination ? amountDetermination : 0,
                coachOrOrganisationNote: coachOrOrganisationNote ? coachOrOrganisationNote : '',
                projectmanagerNote: projectmanagerNote ? projectmanagerNote : '',
                externalpartyNote: externalpartyNote ? externalpartyNote : '',
                clientNote: clientNote ? clientNote : '',
                relatedQuotationRequestsStatuses: relatedQuotationRequestsStatuses
                    ? relatedQuotationRequestsStatuses
                    : [],
            },
            errors: {
                organisationOrCoach: false,
                projectManager: false,
                externalParty: false,
                status: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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
            this.setState(
                {
                    ...this.state,
                    quotationRequest: {
                        ...this.state.quotationRequest,
                        [name]: value,
                        datePlanned: '',
                        timePlanned: '08:00',
                        dateRecorded: '',
                        timeRecorded: '08:00',
                    },
                },
                function() {
                    this.getShowUpdateOpportunityStatus();
                }
            );
        } else if (
            name === 'statusId' &&
            this.state.opportunityActionCodeRef === 'visit' &&
            value == this.state.visitDoneStatusId
        ) {
            this.setState(
                {
                    ...this.state,
                    quotationRequest: {
                        ...this.state.quotationRequest,
                        [name]: value,
                        dateRecorded: this.state.quotationRequest.datePlanned,
                        timeRecorded: this.state.quotationRequest.timePlanned,
                    },
                },
                function() {
                    this.getShowUpdateOpportunityStatus();
                }
            );
        } else if (name === 'statusId') {
            this.setState(
                {
                    ...this.state,
                    quotationRequest: {
                        ...this.state.quotationRequest,
                        [name]: value,
                    },
                },
                function() {
                    this.getShowUpdateOpportunityStatus();
                }
            );
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

    getShowUpdateOpportunityStatus() {
        let newOpportunityStatus = '';
        QuotationRequestDetailsAPI.showUpdateOpportunityStatus(this.state.quotationRequest)
            .then(payload => {
                newOpportunityStatus = payload;
                this.setStateAfterQRStatusChange(newOpportunityStatus);
            })
            .catch(error => {
                newOpportunityStatus = 'Fout bij bepalen nieuwe status';
                this.setStateAfterQRStatusChange(newOpportunityStatus);
            });
    }
    setStateAfterQRStatusChange(newOpportunityStatus) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                newOpportunityStatus,
            },
        });
    }

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
            QuotationRequestDetailsAPI.updateQuotationRequest(quotationRequest).then(payload => {
                this.props.fetchQuotationRequestDetails(quotationRequest.id);
                this.props.switchToView();
            });
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    render() {
        const {
            organisationOrCoachId,
            organisationsOrCoaches,
            projectManagerId,
            projectManagers,
            externalPartyId,
            externalParties,
            statusId,
            statusUsesWf,
            datePlannedToSendWfEmailStatus,
            dateRecorded,
            timeRecorded,
            dateReleased,
            timeReleased,
            datePlannedAttempt1,
            datePlannedAttempt2,
            datePlannedAttempt3,
            datePlanned,
            timePlanned,
            dateApprovedClient,
            dateApprovedProjectManager,
            dateApprovedExternal,
            dateUnderReview,
            dateExecuted,
            dateUnderReviewDetermination,
            dateApprovedDetermination,
            quotationText,
            quotationAmount,
            costAdjustment,
            awardAmount,
            amountDetermination,
            coachOrOrganisationNote,
            projectmanagerNote,
            externalpartyNote,
            clientNote,
            relatedQuotationRequestsStatuses,
        } = this.state.quotationRequest;
        const {
            opportunityId,
            opportunityNumber,
            fullName,
            fullAddress,
            measureNames,
            measureCategoryName,
            currentOpportunityStatus,
            newOpportunityStatus,
        } = this.state.opportunity;
        const { opportunityAction } = this.props.quotationRequestDetails;

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
                        error={this.state.errors.organisationOrCoach}
                        readOnly={this.props.quotationRequestDetails.usesPlanning}
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
                        error={this.state.errors.projectManager}
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
                        error={this.state.errors.externalParty}
                    />
                    <ViewText
                        label={'Kansnummer'}
                        id={'opportunityNumber'}
                        className={'col-sm-6 form-group'}
                        value={opportunityNumber}
                        link={opportunityId != '' ? 'kans/' + opportunityId : ''}
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
                        options={relatedQuotationRequestsStatuses}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.status}
                    />
                    {statusUsesWf ? (
                        <InputText
                            label={'Datum workflow email'}
                            name={'datePlannedToSendWfEmailStatus'}
                            value={datePlannedToSendWfEmailStatus}
                            onChange={() => {}}
                            readOnly={true}
                        />
                    ) : (
                        ''
                    )}
                </div>

                <div className="row">
                    <InputText
                        label={'Huidige kans status'}
                        name={'currentOpportunityStatus'}
                        value={currentOpportunityStatus}
                        onChange={() => {}}
                        readOnly={true}
                    />
                    <InputText
                        label={'Kans status naar'}
                        name={'newOpportunityStatus'}
                        value={newOpportunityStatus}
                        onChange={() => {}}
                        readOnly={true}
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

                {opportunityAction.codeRef === 'visit' || opportunityAction.codeRef === 'redirection' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum afspraakpoging 1"
                                size={'col-sm-6'}
                                name="datePlannedAttempt1"
                                value={datePlannedAttempt1}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum afspraakpoging 2"
                                size={'col-sm-6'}
                                name="datePlannedAttempt2"
                                value={datePlannedAttempt2}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum afspraakpoging 3"
                                size={'col-sm-6'}
                                name="datePlannedAttempt3"
                                value={datePlannedAttempt3}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                    </>
                ) : null}

                {opportunityAction.codeRef === 'visit' ||
                opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum afspraak"
                                size={'col-sm-6'}
                                name="datePlanned"
                                value={datePlanned}
                                onChangeAction={this.handleInputChangeDate}
                                readOnly={this.props.quotationRequestDetails.usesPlanning}
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
                                    readOnly={this.props.quotationRequestDetails.usesPlanning}
                                    nullableSize={'col-sm-3'}
                                    nullable={true}
                                    nullableLabel={'Onbekend'}
                                    nullableChecked={timePlanned == '00:00' ? true : false}
                                />
                            ) : null}
                        </div>
                        <div className="row">
                            <InputDate
                                label={'Afspraak gedaan op'}
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
                                    nullableChecked={timeRecorded == '00:00' ? true : false}
                                />
                            ) : null}
                        </div>
                    </>
                ) : null}

                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
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
                                    nullableChecked={timeReleased == '00:00' ? true : false}
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
                                readOnly={opportunityAction.codeRef === 'subsidy-request'}
                            />
                        </div>
                    </>
                ) : null}
                {opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum akkoord toekenning"
                                size={'col-sm-6'}
                                name="dateApprovedExternal"
                                value={dateApprovedExternal}
                                onChangeAction={this.handleInputChangeDate}
                                readOnly={opportunityAction.codeRef === 'subsidy-request'}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum toekenning in behandeling"
                                size={'col-sm-6'}
                                name="dateUnderReview"
                                value={dateUnderReview}
                                onChangeAction={this.handleInputChangeDate}
                                readOnly={opportunityAction.codeRef === 'subsidy-request'}
                            />
                        </div>
                    </>
                ) : null}
                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ||
                opportunityAction.codeRef === 'redirection' ? (
                    <div className="row">
                        <InputDate
                            label={
                                opportunityAction.codeRef === 'redirection' ? 'Datum afgehandeld' : 'Datum uitgevoerd'
                            }
                            size={'col-sm-6'}
                            name="dateExecuted"
                            value={dateExecuted}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    </div>
                ) : null}

                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <InputText
                            type={'number'}
                            label={
                                opportunityAction.codeRef === 'subsidy-request'
                                    ? 'Budgetaanvraagbedrag'
                                    : 'Offertebedrag'
                            }
                            size={'col-sm-6'}
                            name="quotationAmount"
                            value={quotationAmount}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                ) : null}

                {opportunityAction.codeRef === 'subsidy-request' ? (
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
                        <div className="row">
                            <ViewText
                                label={'Datum vaststelling in behandeling'}
                                id={'dateUnderReviewDetermination'}
                                className={'col-sm-6 form-group'}
                                value={dateUnderReviewDetermination && moment(dateUnderReviewDetermination).format('L')}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Datum akkoord vaststelling'}
                                id={'dateApprovedDetermination'}
                                className={'col-sm-6 form-group'}
                                value={dateApprovedDetermination && moment(dateApprovedDetermination).format('L')}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Bedrag vaststelling'}
                                id={'amountDetermination'}
                                className={'col-sm-6 form-group'}
                                value={amountDetermination ? amountDetermination : ''}
                            />
                        </div>
                    </>
                ) : null}

                {opportunityAction.codeRef === 'visit' ||
                opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        {opportunityAction.codeRef === 'subsidy-request' ? (
                            <InputTextArea
                                label={'Opmerkingen coach of organisatie'}
                                name="coachOrOrganisationNote"
                                value={coachOrOrganisationNote}
                                onChangeAction={this.handleInputChange}
                            />
                        ) : (
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="coachOrOrganisationNote" className="col-sm-12">
                                            Opmerkingen coach of organisatie
                                        </label>
                                    </div>
                                    <div className="col-sm-9">{coachOrOrganisationNote}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}

                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="projectmanagerNote" className="col-sm-12">
                                        Opmerkingen projectleider
                                    </label>
                                </div>
                                <div className="col-sm-9">{projectmanagerNote}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ||
                opportunityAction.codeRef === 'redirection' ? (
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="externalpartyNote" className="col-sm-12">
                                        Opmerkingen externe partij
                                    </label>
                                </div>
                                <div className="col-sm-9">{externalpartyNote}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="clientNote" className="col-sm-12">
                                        Opmerkingen bewoner
                                    </label>
                                </div>
                                <div className="col-sm-9">{clientNote}</div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchQuotationRequestDetails: id => {
        dispatch(fetchQuotationRequestDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequestDetailsFormGeneralEdit);
