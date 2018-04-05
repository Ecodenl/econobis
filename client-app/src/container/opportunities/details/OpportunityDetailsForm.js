import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import OpportunityFormGeneral from './form/OpportunityFormGeneral';
import OpportunityEvaluationFormGeneral from './evaluation/OpportunityEvaluationFormGeneral';
import OpportunityDetailsConclusionForm from './conclusion/OpportunityDetailsConclusionForm';
import OpportunityDetailsQuotationRequests from './quotation-request/OpportunityDetailsQuotationRequests';

class OpportunityDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.opportunity) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <OpportunityFormGeneral />
                    <OpportunityDetailsQuotationRequests />
                    <OpportunityEvaluationFormGeneral />
                    <OpportunityDetailsConclusionForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunityDetails,
    }
};

export default connect(mapStateToProps)(OpportunityDetailsForm);
