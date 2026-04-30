import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import FinancialOverviewDetailsFormGeneral from './general/FinancialOverviewDetailsFormGeneral';
import * as PropTypes from 'prop-types';
import FinancialOverviewContactApp from './contact/FinancialOverviewContactApp';
import FinancialOverviewProjectApp from './project/FinancialOverviewProjectApp';
import FinancialOverviewPostApp from './post/FinancialOverviewPostApp';

class FinancialOverviewDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { financialOverview, hasError, isLoading } = this.props;
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
                <FinancialOverviewDetailsFormGeneral
                    financialOverview={financialOverview}
                    callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                />
                <FinancialOverviewProjectApp
                    financialOverview={financialOverview}
                    callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                />
                <FinancialOverviewContactApp financialOverview={financialOverview} />
                <FinancialOverviewPostApp financialOverview={financialOverview} />
            </div>
        );
    }
}

FinancialOverviewDetailsForm.propTypes = {
    financialOverview: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
};

export default FinancialOverviewDetailsForm;
