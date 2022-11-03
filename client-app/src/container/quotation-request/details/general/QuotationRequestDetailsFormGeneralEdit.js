import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
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

class QuotationRequestDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            organisationOrCoach,
            status,
            opportunityAction,
            datePlannedToSendWfEmailStatus,
            dateRecorded,
            dateReleased,
            datePlanned,
            dateApprovedExternal,
            dateApprovedProjectManager,
            dateApprovedClient,
            quotationText,
            opportunity,
        } = props.quotationRequestDetails;

        this.state = {
            opportunity: {
                fullName: opportunity.intake ? opportunity.intake.contact.fullName : '',
                fullAddress: opportunity.intake ? opportunity.intake.fullAddress : '',
                measureNames: opportunity.measures && opportunity.measures.map(measure => measure.name).join(', '),
                measureCategoryName: opportunity.measureCategory.name,
                organisationsOrCoaches:
                    opportunity.intake && opportunity.intake.campaign
                        ? opportunity.intake.campaign.organisationsOrCoaches
                        : '',
            },
            quotationRequest: {
                id,
                opportunityId: opportunity.id,
                organisationOrCoachId: organisationOrCoach.id,
                statusId: status.id,
                opportunityActionId: opportunityAction.id,
                statusUsesWf: status ? status.usesWf : false,
                datePlannedToSendWfEmailStatus: datePlannedToSendWfEmailStatus
                    ? moment(datePlannedToSendWfEmailStatus).format('L')
                    : '',
                dateRecorded: dateRecorded ? dateRecorded : '',
                dateReleased: dateReleased ? dateReleased : '',
                datePlanned: datePlanned ? datePlanned : '',
                dateApprovedExternal: dateApprovedExternal ? dateApprovedExternal : '',
                dateApprovedProjectManager: dateApprovedProjectManager ? dateApprovedProjectManager : '',
                dateApprovedClient: dateApprovedClient ? dateApprovedClient : '',
                quotationText: quotationText ? quotationText : '',
            },
            errors: {
                organisationOrCoach: false,
                status: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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

        if (validator.isEmpty(quotationRequest.organisationOrCoachId + '')) {
            errors.organisationOrCoach = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            QuotationRequestDetailsAPI.updateQuotationRequest(quotationRequest).then(payload => {
                this.props.fetchQuotationRequestDetails(quotationRequest.id);
                this.props.switchToView();
            });
    };

    render() {
        const {
            organisationOrCoachId,
            statusId,
            statusUsesWf,
            datePlannedToSendWfEmailStatus,
            dateRecorded,
            dateReleased,
            datePlanned,
            dateApprovedExternal,
            dateApprovedProjectManager,
            dateApprovedClient,
            quotationText,
        } = this.state.quotationRequest;
        const {
            fullName,
            fullAddress,
            organisationsOrCoaches,
            measureNames,
            measureCategoryName,
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
                        required={'required'}
                        error={this.state.errors.organisationOrCoach}
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
                        options={this.props.quotationRequestStatus}
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
                    <InputDate
                        label="Datum afspraak"
                        size={'col-sm-6'}
                        name="datePlanned"
                        value={datePlanned}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label="Datum opname"
                        size={'col-sm-6'}
                        name="dateRecorded"
                        value={dateRecorded}
                        onChangeAction={this.handleInputChangeDate}
                    />
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
                {opportunityAction.codeRef === 'subsidy-request' ? (
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

const mapStateToProps = state => {
    return {
        quotationRequestStatus: state.systemData.quotationRequestStatus,
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchQuotationRequestDetails: id => {
        dispatch(fetchQuotationRequestDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequestDetailsFormGeneralEdit);
