import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import OpportunityFormGeneral from './form/OpportunityFormGeneral';
import OpportunityEvaluationFormGeneral from './evaluation/OpportunityEvaluationFormGeneral';
import OpportunityDetailsConclusionForm from './conclusion/OpportunityDetailsConclusionForm';
import OpportunityDetailsQuotationRequests from './quotation-request/OpportunityDetailsQuotationRequests';

class OpportunityDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van kans.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.opportunity)) {
            loadingText = 'Geen kans gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <OpportunityFormGeneral />
                <OpportunityDetailsQuotationRequests />
                <OpportunityEvaluationFormGeneral />
                <OpportunityDetailsConclusionForm />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(OpportunityDetailsForm);
