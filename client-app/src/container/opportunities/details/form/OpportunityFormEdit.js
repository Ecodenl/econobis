import React, {Component} from 'react';
import {connect} from 'react-redux';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

import OpportunityDetailsAPI from '../../../../api/opportunity/OpportunityDetailsAPI';

import { fetchOpportunity } from '../../../../actions/opportunity/OpportunityDetailsActions';
import InputTextArea from "../../../../components/form/InputTextarea";

class OpportunityFormEdit extends Component {
    constructor(props) {
        super(props);

        const { id, desiredDate, evaluationAgreedDate, quotationText, status } = props.opportunity;

        this.state = {
            opportunity: {
                id,
                statusId: status ? status.id : '',
                quotationText: quotationText,
                evaluationAgreedDate: evaluationAgreedDate ? evaluationAgreedDate : '',
                desiredDate: desiredDate ? desiredDate : '',
            },
            errors: {
                statusId: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: selectedOption
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {opportunity} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty('' + opportunity.statusId)){
            errors.statusId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        OpportunityDetailsAPI.updateOpportunity(opportunity.id, opportunity).then(payload => {
            this.props.fetchOpportunity(opportunity.id);
            this.props.switchToView();
        });
    };

    render() {
        const { statusId, quotationText, desiredDate, evaluationAgreedDate } = this.state.opportunity;
        const { intake, measure } = this.props.opportunity;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Contact"}
                        name={""}
                        value={intake && intake.contact.fullName}
                        readOnly={true}
                    />
                    <InputText
                        label={"Adres"}
                        name={""}
                        value={intake && intake.fullAddress}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Maatregel - categorie"}
                        name={"measureCategory"}
                        value={measure.measureCategory ? measure.measureCategory.name : ''}
                        readOnly={true}
                    />
                    <InputText
                        label={"Campagne"}
                        name={"campaign"}
                        value={intake.campaign ? intake.campaign.name : ''}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Maatregel - specifiek"}
                        name={"measure"}
                        value={measure ? measure.name : ''}
                        readOnly={true}
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.status}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.statusId}
                    />
                </div>

                <div className="row">
                    <InputTextArea label={"Toelichting op maatregel"} name={"quotationText"} value={quotationText} onChangeAction={this.handleInputChange} />
                </div>

                <div className="row">
                    <InputDate
                        label="Datum realisatie gepland"
                        name="desiredDate"
                        value={desiredDate}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label="Datum evaluatie akkoord"
                        name="evaluationAgreedDate"
                        value={evaluationAgreedDate}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOpportunity: (id) => {
        dispatch(fetchOpportunity(id));
    },
});

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunityDetails,
        status: state.systemData.opportunityStatus,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityFormEdit);
