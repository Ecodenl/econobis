import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import moment from 'moment';

moment.locale('nl');

import QuotationRequestDetailsAPI from '../../../../api/quotation-request/QuotationRequestDetailsAPI';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import InputText from "../../../../components/form/InputText";
import InputDate from "../../../../components/form/InputDate";
import InputTextArea from "../../../../components/form/InputTextarea";
import validator from "validator";
import { fetchQuotationRequestDetails } from '../../../../actions/quotation-request/QuotationRequestDetailsActions';

class QuotationRequestDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, organisation, dateRecorded, status, dateReleased, dateValid, quotationText, opportunity} = props.quotationRequestDetails;
        this.state = {
            opportunity: {
                fullName: opportunity.intake ? opportunity.intake.contact.fullName : '',
                fullAddress: opportunity.intake ? opportunity.intake.fullAddress : '',
                measureNames: opportunity.measures && opportunity.measures.map((measure) => measure.name).join(', '),
                measureCategoryName: opportunity.measureCategory.name,
            },
            organisations: [],
            quotationRequest: {
                id,
                opportunityId: opportunity.id,
                organisationId: organisation.id,
                dateRecorded: dateRecorded ? dateRecorded : '',
                statusId: status.id,
                dateReleased: dateReleased ? dateReleased : '',
                dateValid: dateValid ? dateValid : '',
                quotationText: quotationText ? quotationText : '',
            },
            errors: {
                organisation: false,
                status: false
            }
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };


    componentWillMount(){
        OrganisationAPI.getOrganisationPeek().then((payload) => {
            this.setState({ organisations: payload });
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
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            quotationRequest: {
                ...this.state.quotationRequest,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {quotationRequest} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(quotationRequest.statusId + '')){
            errors.status = true;
            hasErrors = true;
        };

        if(validator.isEmpty(quotationRequest.organisationId + '')){
            errors.organisation = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        !hasErrors &&
        QuotationRequestDetailsAPI.updateQuotationRequest(quotationRequest).then((payload) => {
            this.props.fetchQuotationRequestDetails(quotationRequest.id);
            this.props.switchToView();
        });

    };

    render() {
        const {organisationId, dateRecorded, statusId, dateReleased, dateValid, quotationText} = this.state.quotationRequest;
        const {fullName, fullAddress, measureNames, measureCategoryName} = this.state.opportunity;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={"Organisatie"}
                        size={"col-sm-6"}
                        name="organisationId"
                        value={organisationId}
                        options={this.state.organisations}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.organisation}
                    />
                    <InputText
                        label={'Verzoek voor'}
                        name={"fullName"}
                        value={fullName}
                        onChange={ () => {} }
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Adres voor'}
                        name={"address"}
                        value={fullAddress}
                        onChange={ () => {} }
                        readOnly={true}
                    />
                    <InputText
                        label={'Maatregel - categorie'}
                        name={"measureCategory"}
                        value={measureCategoryName}
                        onChange={ () => {} }
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Maatregel - specifiek'}
                        name={"measure"}
                        value={measureNames}
                        onChange={ () => {} }
                        readOnly={true}
                    />
                    <InputDate
                        label="Datum opname"
                        size={"col-sm-6"}
                        name="dateRecorded"
                        value={dateRecorded}
                        onChangeAction={this.handleInputChangeDate}

                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Offerte status"}
                        size={"col-sm-6"}
                        name="statusId"
                        value={statusId}
                        options={this.props.quotationRequestStatus}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.status}
                    />
                    <InputDate
                        label="Offerte uitgebracht"
                        size={"col-sm-6"}
                        name="dateReleased"
                        value={dateReleased}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Offerte geldig tot"
                        size={"col-sm-6"}
                        name="dateValid"
                        value={dateValid}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputTextArea
                        label={"Offerte text"}
                        name={"quotationText"}
                        value={quotationText}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        quotationRequestStatus: state.systemData.quotationRequestStatus,
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchQuotationRequestDetails: (id) => {
        dispatch(fetchQuotationRequestDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequestDetailsFormGeneralEdit);
