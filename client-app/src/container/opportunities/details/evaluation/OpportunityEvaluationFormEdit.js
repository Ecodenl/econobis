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
import InputToggle from "../../../../components/form/InputToggle";

class OpportunityEvaluationFormEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunityEvaluation: {
                id: props.opportunityEvaluation ? props.opportunityEvaluation.id : null,
                opportunityId: props.opportunityId,
                isRealised: props.opportunityEvaluation ? props.opportunityEvaluation.isRealised : false,
                isStatisfied: props.opportunityEvaluation ? props.opportunityEvaluation.isStatisfied : false,
                wouldRecommendOrganisation: props.opportunityEvaluation ? props.opportunityEvaluation.wouldRecommendOrganisation : false,
                note: props.opportunityEvaluation ? props.opportunityEvaluation.note : '',
            },
        }
    };


    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunityEvaluation: {
                ...this.state.opportunityEvaluation,
                [name]: value
            },
        });
    };
    handleSubmit = event => {
        event.preventDefault();

        const {opportunityEvaluation} = this.state;

        if(opportunityEvaluation.id === null){
            OpportunityDetailsAPI.storeOpportunityEvaluation(opportunityEvaluation).then(payload => {
                this.props.fetchOpportunity(opportunityEvaluation.opportunityId);
                this.props.switchToView();
            });
        }
        else{
            OpportunityDetailsAPI.updateOpportunityEvaluation(opportunityEvaluation).then(payload => {
                this.props.fetchOpportunity(opportunityEvaluation.opportunityId);
                this.props.switchToView();
            });
        }
    };

    render() {
        const {isRealised, isStatisfied, wouldRecommendOrganisation, note}= this.state.opportunityEvaluation;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputToggle
                        label={"Is de maatregel uitgevoerd?"}
                        name={"isRealised"}
                        value={isRealised}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Bent u tevreden over de uitvoering?"}
                        name={"isStatisfied"}
                        value={isStatisfied}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Zou u het bedrijf aanbevelen?"}
                        name={"wouldRecommendOrganisation"}
                        value={wouldRecommendOrganisation}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="note" className="col-sm-12">Heeft u verder opmerkingen of aanbevelingen?</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea name='note' value={note} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
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
        opportunityEvaluation: state.opportunityDetails.opportunityEvaluation,
        opportunityId: state.opportunityDetails.id,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityEvaluationFormEdit);
