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
            datePlanned,
            dateApprovedExternal,
            dateUnderReview,
            dateApprovedProjectManager,
            dateApprovedClient,
            quotationText,
            opportunity,
            relatedQuotationRequestsStatuses,
            externalpartyNote,
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
                fullName: opportunity.intake ? opportunity.intake.contact.fullName : '',
                fullAddress: opportunity.intake ? opportunity.intake.fullAddress : '',
                measureNames: opportunity.measures && opportunity.measures.map(measure => measure.name).join(', '),
                measureCategoryName: opportunity.measureCategory.name,
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
                datePlanned: datePlanned ? datePlanned : '',
                timePlanned: datePlanned ? moment(datePlanned).format('HH:mm') : '08:00',
                dateApprovedExternal: dateApprovedExternal ? dateApprovedExternal : '',
                dateUnderReview: dateUnderReview ? dateUnderReview : '',
                dateApprovedProjectManager: dateApprovedProjectManager ? dateApprovedProjectManager : '',
                dateApprovedClient: dateApprovedClient ? dateApprovedClient : '',
                quotationText: quotationText ? quotationText : '',
                externalpartyNote: externalpartyNote ? externalpartyNote : '',
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
            datePlanned,
            timePlanned,
            dateApprovedExternal,
            dateUnderReview,
            dateApprovedProjectManager,
            dateApprovedClient,
            quotationText,
            externalpartyNote,
            relatedQuotationRequestsStatuses,
        } = this.state.quotationRequest;
        const { fullName, fullAddress, measureNames, measureCategoryName } = this.state.opportunity;
        const { opportunityAction } = this.props.quotationRequestDetails;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                {opportunityAction.codeRef === 'quotation-request' ? (
                    <>
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
                                label={'Externe partij'}
                                size={'col-sm-6'}
                                name="externalPartyId"
                                value={externalPartyId}
                                options={externalParties}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.externalParty}
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
                {opportunityAction.codeRef === 'visit' ? (
                    <>
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
                        </div>
                    </>
                ) : null}
                {opportunityAction.codeRef === 'subsidy-request' ? (
                    <>
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
                                error={this.state.errors.externalParty}
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
                            size={'col-sm-6'}
                            name="timePlanned"
                            value={timePlanned}
                            start={'06:00'}
                            end={'23:00'}
                            onChangeAction={this.handleInputChangeDate}
                            readOnly={this.props.quotationRequestDetails.usesPlanning}
                        />
                    ) : null}
                </div>

                {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'visit' ? (
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

                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
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

                {opportunityAction.codeRef === 'subsidy-request' ? (
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
                {opportunityAction.codeRef === 'subsidy-request' ? (
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
                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
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
                {opportunityAction.codeRef === 'quotation-request' ||
                opportunityAction.codeRef === 'subsidy-request' ? (
                    <div className="row">
                        <InputDate
                            label="Datum in behandeling"
                            size={'col-sm-6'}
                            name="dateUnderReview"
                            value={dateUnderReview}
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

                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="externalpartyNote" className="col-sm-12">
                            Opmerkingen externe partij
                        </label>
                    </div>
                    <div className="col-sm-9" id="externalpartyNote">
                        {externalpartyNote}
                    </div>
                </div>

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
