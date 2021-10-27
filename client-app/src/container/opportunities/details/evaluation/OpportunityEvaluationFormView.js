import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const OpportunityEvaluationFormView = props => {
    const { opportunityEvaluation } = props;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Is de evaluatie uitgevoerd?'}
                    value={
                        opportunityEvaluation && opportunityEvaluation.realisedStatus
                            ? opportunityEvaluation.realisedStatus.name
                            : 'Nog geen evaluatie'
                    }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Bent u tevreden over de uitvoering?'}
                    value={
                        opportunityEvaluation && opportunityEvaluation.statisfiedStatus
                            ? opportunityEvaluation.statisfiedStatus.name
                            : 'Nog geen evaluatie'
                    }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Zou u het bedrijf aanbevelen?'}
                    value={
                        opportunityEvaluation && opportunityEvaluation.recommendOrganisationStatus
                            ? opportunityEvaluation.recommendOrganisationStatus.name
                            : 'Nog geen evaluatie'
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
                    {opportunityEvaluation && opportunityEvaluation.note}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        opportunityEvaluation: state.opportunityDetails.opportunityEvaluation,
    };
};

export default connect(mapStateToProps)(OpportunityEvaluationFormView);
