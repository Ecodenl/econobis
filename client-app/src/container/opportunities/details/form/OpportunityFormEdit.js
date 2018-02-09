import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import InputTinyMCE from '../../../../components/form/InputTinyMCE';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

import ContactsAPI from '../../../../api/contact/ContactsAPI';
import IntakesAPI from '../../../../api/intake/IntakesAPI';
import OpportunityDetailsAPI from '../../../../api/opportunity/OpportunityDetailsAPI';

import { fetchOpportunity } from '../../../../actions/opportunity/OpportunityDetailsActions';
import InputReactSelect from "../../../../components/form/InputReactSelect";

class OpportunityFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, campaign, contact, desiredDate, measure, number, quotationText, reaction, status, ownedBy, intake} = props.opportunity;

        this.state = {
            opportunity: {
                id,
                campaignId: campaign ? campaign.id : '',
                measureName: measure ? measure.name : '',
                contactId: contact ? contact.id : '',
                desiredDate: desiredDate ? desiredDate : '',
                measureId: measure ? measure.id : '',
                number: number,
                quotationText: quotationText,
                reactionId: reaction ? reaction.id : '',
                statusId: status ? status.id : '',
                ownedById: ownedBy ? ownedBy.id : '',
                intakeId: intake ? intake.id : '',
            },
            contacts: [],
            intakes: [],
            errors: {
                contact: false,
                status: false,
            },
        }

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    };

    componentWillMount() {
        ContactsAPI.getPerson().then(payload => {
            this.setState({
                contacts: payload
            });
        });

        IntakesAPI.peekIntakes().then(payload => {
            this.setState({
                intakes: payload
            });
        });
    }

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

    handleEditorChange = (e) => {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                quotationText: e.target.getContent()
            },
        });
    };

    handleChangeDesiredDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                desiredDate: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {opportunity} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty('' + opportunity.contactId)){
            errors.contact = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + opportunity.statusId)){
            errors.status = true;
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
        const {campaignId, contactId, desiredDate, measureName, number, quotationText, reactionId, statusId, ownedById, intakeId} = this.state.opportunity;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Type kans"}
                        size={"col-sm-6"}
                        name={"measureId"}
                        value={measureName}
                        readOnly={true}
                    />
                    <InputText
                        label={"Kans nummer"}
                        name={"number"}
                        value={number}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputReactSelect
                        label={"Contact"}
                        name={"contactId"}
                        value={contactId}
                        options={this.state.contacts}
                        onChangeAction={this.handleReactSelectChange}
                        optionName={'fullName'}
                        required={"required"}
                        error={this.state.errors.contact}
                        multi={false}
                    />
                    <InputSelect
                        label={"Reactie"}
                        size={"col-sm-6"}
                        name={"reactionId"}
                        options={this.props.reactions}
                        value={reactionId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputReactSelect
                        label={"Intake"}
                        name={"intakeId"}
                        value={intakeId}
                        options={this.props.intakes}
                        onChangeAction={this.props.handleReactSelectChange}
                        multi={false}
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.status}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.status}
                    />
                </div>

                <div className="row">
                    <InputReactSelect
                        label={"Campagne"}
                        name={"campaignId"}
                        value={campaignId}
                        options={this.props.campaigns}
                        onChangeAction={this.props.handleReactSelectChange}
                        multi={false}
                    />
                </div>
                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <InputTinyMCE
                                label={"Offerte tekst"}
                                value={quotationText}
                                onChangeAction={this.handleEditorChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <InputDate
                        label={"Gewenste realisatie"}
                        size={"col-sm-6"}
                        name={"desiredDate"}
                        value={desiredDate}
                        onChangeAction={this.handleChangeDesiredDate}
                    />
                    <InputSelect
                        label={"Verantwoordelijke"}
                        size={"col-sm-6"}
                        name={"ownedById"}
                        options={this.props.users}
                        value={ownedById}
                        onChangeAction={this.handleInputChange}
                        optionName={'fullName'}
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
        reactions: state.systemData.opportunityReactions,
        measures: state.systemData.measures,
        campaigns: state.systemData.campaigns,
        users: state.systemData.users,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityFormEdit);
