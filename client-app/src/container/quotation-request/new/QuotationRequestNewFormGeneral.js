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
            this.setState({
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

        this.setState({
            ...this.state,
            quotationRequest: {
                ...this.state.quotationRequest,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            quotationRequest: {
                ...this.state.quotationRequest,
                [name]: value,
            },
        });
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
                    <InputTime
                        label={'Tijd afspraak'}
                        size={'col-sm-6'}
                        name="timePlanned"
                        value={timePlanned}
                        start={'06:00'}
                        end={'23:00'}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>
                {this.props.opportunityAction.codeRef === 'quotation-request' ||
                this.props.opportunityAction.codeRef === 'visit' ? (
                    <div className="row">
                        <InputDate
                            label="Datum opname"
                            size={'col-sm-6'}
                            name="datec"
                            value={dateRecorded}
                            onChangeAction={this.handleInputChangeDate}
                        />
                        <InputTime
                            label={'Tijd opname'}
                            size={'col-sm-6'}
                            name="timeRecorded"
                            value={timeRecorded}
                            start={'06:00'}
                            end={'23:00'}
                            onChangeAction={this.handleInputChangeDate}
                        />
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
                        <InputTime
                            label={'Tijd uitgebracht'}
                            size={'col-sm-6'}
                            name="timeReleased"
                            value={timeReleased}
                            start={'06:00'}
                            end={'23:00'}
                            onChangeAction={this.handleInputChangeDate}
                        />
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
