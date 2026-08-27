import React, { Component } from 'react';

import FinancialOverviewDetailsFormGeneral from './general/FinancialOverviewDetailsFormGeneral';
import * as PropTypes from 'prop-types';
import FinancialOverviewContactApp from './contact/FinancialOverviewContactApp';
import FinancialOverviewProjectApp from './project/FinancialOverviewProjectApp';
import FinancialOverviewPostApp from './post/FinancialOverviewPostApp';

class FinancialOverviewDetailsForm extends Component {
    render() {
        const { financialOverview } = this.props;

        return (
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
    callFetchFinancialOverviewDetails: PropTypes.func,
};

export default FinancialOverviewDetailsForm;
