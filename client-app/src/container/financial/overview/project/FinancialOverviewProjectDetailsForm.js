import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import * as PropTypes from 'prop-types';
import FinancialOverviewProjectDetailsFormGeneral from './general/FinancialOverviewProjectDetailsFormGeneral';
import ParticipantApp from './participant/ParticipantApp';

class FinancialOverviewProjectDetailsForm extends Component {
    constructor(props) {
        super(props);
        // todo WM: opschonen log regels
        console.log('FinancialOverviewProjectDetailsForm');
        console.log(props);
    }
    render() {
        let { financialOverviewProject, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van waardestaat project.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(financialOverviewProject)) {
            loadingText = 'Geen waardestaat project gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <FinancialOverviewProjectDetailsFormGeneral
                    financialOverviewProject={financialOverviewProject}
                    updateState={updateState}
                />
                <ParticipantApp financialOverviewProject={financialOverviewProject} />
            </div>
        );
    }
}

FinancialOverviewProjectDetailsForm.propTypes = {
    financialOverviewProject: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any,
};

export default FinancialOverviewProjectDetailsForm;
