import React from 'react';
import {connect} from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const OpportunityEvaluationFormView = props => {
    const { opportunityEvaluation } = props;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Is de maatregel uitgevoerd?"}
                    value={(opportunityEvaluation && opportunityEvaluation.isRealised) ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Bent u tevreden over de uitvoering?"}
                    value={(opportunityEvaluation && opportunityEvaluation.isStatisfied) ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Zou u het bedrijf aanbevelen?"}
                    value={(opportunityEvaluation && opportunityEvaluation.wouldRecommendOrganisation) ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="note" className="col-sm-12">Heeft u verder opmerkingen of aanbevelingen?</label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {(opportunityEvaluation && opportunityEvaluation.note)}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunityEvaluation: state.opportunityDetails.opportunityEvaluation,
    }
};

export default connect(mapStateToProps)(OpportunityEvaluationFormView);