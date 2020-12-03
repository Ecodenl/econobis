import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import FinancialOverviewDetailsFormGeneral from './general/FinancialOverviewDetailsFormGeneral';
import * as PropTypes from 'prop-types';
import ProjectApp from './project/ProjectApp';

class FinancialOverviewDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { financialOverview, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van waardestaat.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(financialOverview)) {
            loadingText = 'Geen waardestaat gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <FinancialOverviewDetailsFormGeneral financialOverview={financialOverview} updateState={updateState} />
                <ProjectApp financialOverview={financialOverview} />
            </div>
        );
    }
}

FinancialOverviewDetailsForm.propTypes = {
    financialOverview: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any,
};

export default FinancialOverviewDetailsForm;
