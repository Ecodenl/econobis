import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const OpportunityEvaluationFormView = props => {
    const { opportunity } = props;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Is de evaluatie uitgevoerd?'}
                    value={
                        opportunity && opportunity.evaluationRealised ? opportunity.evaluationRealised.name : 'Onbekend'
                    }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Bent u tevreden over de uitvoering?'}
                    value={
                        opportunity && opportunity.evaluationStatisfied
                            ? opportunity.evaluationStatisfied.name
                            : 'Onbekend'
                    }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Zou u het bedrijf aanbevelen?'}
                    value={
                        opportunity && opportunity.evaluationRecommendOrganisation
                            ? opportunity.evaluationRecommendOrganisation.name
                            : 'Onbekend'
                    }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="note" className="col-sm-12">
                        Heeft u verder opmerkingen of aanbevelingen?
                    </label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {opportunity && opportunity.evaluationNote}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
    };
};

export default connect(mapStateToProps)(OpportunityEvaluationFormView);
