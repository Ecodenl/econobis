import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import OpportunityDetailsAPI from '../../../../api/opportunity/OpportunityDetailsAPI';
import { fetchOpportunity } from '../../../../actions/opportunity/OpportunityDetailsActions';
import InputTextArea from '../../../../components/form/InputTextarea';
import moment from 'moment';

class OpportunityEvaluationFormEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunity: {
                evaluationIsRealised: props.opportunity ? props.opportunity.evaluationIsRealised : 1,
                evaluationIsStatisfied: props.opportunity ? props.opportunity.evaluationIsStatisfied : 1,
                evaluationWouldRecommendOrganisation: props.opportunity
                    ? props.opportunity.evaluationWouldRecommendOrganisation
                    : 1,
                evaluationNote: props.opportunity ? props.opportunity.evaluationNote : '',
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value,
            },
        });
    };
    handleSubmit = event => {
        event.preventDefault();

        const { opportunity } = this.state;
        OpportunityDetailsAPI.updateOpportunityEvaluation(this.props.opportunity.id, opportunity).then(payload => {
            this.props.fetchOpportunity(this.props.opportunity.id);
            this.props.switchToView();
        });
    };

    render() {
        const {
            evaluationIsRealised,
            evaluationIsStatisfied,
            evaluationWouldRecommendOrganisation,
            evaluationNote,
        } = this.state.opportunity;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Is de evaluatie uitgevoerd?'}
                        size={'col-sm-6'}
                        name={'evaluationIsRealised'}
                        value={evaluationIsRealised}
                        options={this.props.opportunityEvaluationStatuses}
                        emptyOption={false}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Bent u tevreden over de uitvoering?'}
                        size={'col-sm-6'}
                        name={'evaluationIsStatisfied'}
                        value={evaluationIsStatisfied}
                        options={this.props.opportunityEvaluationStatuses}
                        emptyOption={false}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Zou u het bedrijf aanbevelen?'}
                        size={'col-sm-6'}
                        name={'evaluationWouldRecommendOrganisation'}
                        value={evaluationWouldRecommendOrganisation}
                        options={this.props.opportunityEvaluationStatuses}
                        emptyOption={false}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputTextArea
                        label={'Heeft u verder opmerkingen of aanbevelingen?'}
                        name={'evaluationNote'}
                        value={evaluationNote}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchOpportunity: id => {
        dispatch(fetchOpportunity(id));
    },
});

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
        opportunityEvaluationStatuses: state.systemData.opportunityEvaluationStatuses,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityEvaluationFormEdit);
