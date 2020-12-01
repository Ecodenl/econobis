import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import FinancialOverviewDetailsFormGeneral from './general/FinancialOverviewDetailsFormGeneral';
import * as PropTypes from 'prop-types';

class FinancialOverviewDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { financialOverview, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van financieel jaaroverzicht.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(financialOverview)) {
            loadingText = 'Geen financieel jaaroverzicht gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <FinancialOverviewDetailsFormGeneral financialOverview={financialOverview} updateState={updateState} />
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
