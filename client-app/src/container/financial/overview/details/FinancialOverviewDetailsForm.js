import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import FinancialOverviewDetailsFormGeneral from './general/FinancialOverviewDetailsFormGeneral';
import * as PropTypes from 'prop-types';
import ProjectApp from './project/ProjectApp';
import FinancialOverviewContactApp from './contact/FinancialOverviewContactApp';

class FinancialOverviewDetailsForm extends Component {
    constructor(props) {
        super(props);

        //todo WM: opschonen log
        // console.log('FinancialOverviewDetailsForm - props');
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
                <ProjectApp
                    financialOverview={financialOverview}
                    callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                />
                <FinancialOverviewContactApp
                    financialOverview={financialOverview}
                    // callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                />
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
