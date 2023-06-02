import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                datePlanned: '',
                timePlanned: '',
                dateApprovedClient: '',
                dateApprovedProjectManager: '',
                dateApprovedExternal: '',
                quotationText: '',
            },
            quotationRequestStatuses: [],
            errors: {
                organisationOrCoach: false,
                projectManager: false,
                externalParty: false,
                status: false,
            },
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
                    timeRecorded: '',
                    dateReleased: '',
                    timeReleased: '',
                    datePlanned: '',
                    timePlanned: '',
                    dateApprovedClient: '',
                    dateApprovedProjectManager: '',
                    dateApprovedExternal: '',
                    quotationText: payload.quotationText ? payload.quotationText : '',
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

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            QuotationRequestDetailsAPI.newQuotationRequest(quotationRequest).then(payload => {
                hashHistory.push(`/offerteverzoek/${payload.data.id}`);
            });
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
            datePlanned,
            timePlanned,
            dateApprovedClient,
            dateApprovedProjectManager,
            dateApprovedExternal,
            quotationText,
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
                {this.props.opportunityAction.codeRef === 'quotation-request' ? (
                    <>
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
                                label={'Externe partij'}
                                size={'col-sm-6'}
                                name="externalPartyId"
                                value={externalPartyId}
                                options={externalParties}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.externalPartyId}
                            />
                            <InputText
                                label={'Adres'}
                                name={'address'}
                                value={fullAddress}
                                onChange={() => {}}
                                readOnly={true}
                            />
                        </div>
                    </>
                ) : null}

                {this.props.opportunityAction.codeRef === 'visit' ? (
                    <>
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
                    </>
                ) : null}

                {this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
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
                                label={'Verzoek voor bewoner'}
                                name={'fullName'}
                                value={fullName}
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
                            <InputText
                                label={'Adres'}
                                name={'address'}
                                value={fullAddress}
                                onChange={() => {}}
                                readOnly={true}
                            />
                        </div>
                    </>
                ) : null}

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
                        />
                    ) : null}
                </div>
                {this.props.opportunityAction.codeRef === 'quotation-request' ||
                this.props.opportunityAction.codeRef === 'visit' ? (
                    <div className="row">
                        <InputDate
                            label="Datum opname"
                            size={'col-sm-6'}
                            name="dateRecorded"
                            value={dateRecorded}
                            onChangeAction={this.handleInputChangeDate}
                        />
                        {dateRecorded ? (
                            <InputTime
                                label={'Tijd opname'}
                                size={'col-sm-6'}
                                name="timeRecorded"
                                value={timeRecorded}
                                start={'06:00'}
                                end={'23:00'}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        ) : null}
                    </div>
                ) : null}

                {this.props.opportunityAction.codeRef === 'quotation-request' ||
                this.props.opportunityAction.codeRef === 'subsidy-request' ? (
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
                                size={'col-sm-6'}
                                name="timeReleased"
                                value={timeReleased}
                                start={'06:00'}
                                end={'23:00'}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        ) : null}
                    </div>
                ) : null}

                {this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <InputDate
                            label="Datum akkoord bewoner"
                            size={'col-sm-6'}
                            name="dateApprovedClient"
                            value={dateApprovedClient}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    </div>
                ) : null}
                {this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <InputDate
                            label="Datum akkoord projectleider"
                            size={'col-sm-6'}
                            name="dateApprovedProjectManager"
                            value={dateApprovedProjectManager}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    </div>
                ) : null}
                {this.props.opportunityAction.codeRef === 'quotation-request' ||
                this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <InputDate
                            label="Datum akkoord extern"
                            size={'col-sm-6'}
                            name="dateApprovedExternal"
                            value={dateApprovedExternal}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    </div>
                ) : null}

                <div className="row">
                    <InputTextArea
                        label={'Omschrijving'}
                        name={'quotationText'}
                        value={quotationText}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

export default QuotationRequestNewFormGeneral;
