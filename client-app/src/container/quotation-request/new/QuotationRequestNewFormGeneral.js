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
            },
            quotationRequest: {
                opportunityId: '',
                organisationOrCoachId: '',
                statusId: '5', //offerte aangevraagd, also alter componentwillmount when changing default!
                opportunityActionId: props.opportunityAction.id,
                dateRecorded: '',
                timeRecorded: '',
                dateReleased: '',
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
                    measureNames: payload.measures && payload.measures.map(measure => measure.name).join(', '),
                    measureCategoryName: payload.measureCategory.name,
                },
                quotationRequest: {
                    opportunityId: payload.id,
                    organisationOrCoachId: '',
                    statusId: '5',
                    opportunityActionId: this.props.opportunityAction.id,
                    dateRecorded: '',
                    timeRecorded: '',
                    dateReleased: '',
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

        if (validator.isEmpty(quotationRequest.statusId)) {
            errors.status = true;
            hasErrors = true;
        }

        if (validator.isEmpty(quotationRequest.organisationOrCoachId)) {
            errors.organisationOrCoach = true;
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
            statusId,
            dateRecorded,
            timeRecorded,
            dateReleased,
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
            measureNames,
            measureCategoryName,
        } = this.state.opportunity;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Organisatie / Coach'}
                        size={'col-sm-6'}
                        name="organisationOrCoachId"
                        value={organisationOrCoachId}
                        options={organisationsOrCoaches}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.organisation}
                    />
                    <InputText
                        label={'Verzoek voor'}
                        name={'fullName'}
                        value={fullName}
                        onChange={() => {}}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Adres voor'}
                        name={'address'}
                        value={fullAddress}
                        onChange={() => {}}
                        readOnly={true}
                    />
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
                    {this.props.opportunityAction.codeRef === 'quotation-request' ? (
                        <InputDate
                            label="Datum opname"
                            size={'col-sm-6'}
                            name="datec"
                            value={dateRecorded}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    ) : null}
                </div>

                <div className="row">
                    <InputTime
                        label={'Tijd afspraak'}
                        size={'col-sm-6'}
                        name="timePlanned"
                        value={timePlanned}
                        start={'06:00'}
                        end={'23:00'}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    {this.props.opportunityAction.codeRef === 'quotation-request' ? (
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

                <div className="row">
                    <InputDate
                        label="Datum uitgebracht"
                        size={'col-sm-6'}
                        name="dateReleased"
                        value={dateReleased}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label="Datum akkoord extern"
                        size={'col-sm-6'}
                        name="dateApprovedExternal"
                        value={dateApprovedExternal}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>
                {this.props.opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
                        <div className="row">
                            <InputDate
                                label="Datum akkoord projectleider"
                                size={'col-sm-6'}
                                name="dateApprovedProjectManager"
                                value={dateApprovedProjectManager}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputDate
                                label="Datum akkoord bewoner"
                                size={'col-sm-6'}
                                name="dateApprovedClient"
                                value={dateApprovedClient}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                    </>
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
