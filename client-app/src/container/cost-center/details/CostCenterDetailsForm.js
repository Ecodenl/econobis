import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import CostCenterDetailsFormGeneral from './general/CostCenterDetailsFormGeneral';
import * as PropTypes from 'prop-types';

class CostCenterDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { costCenter, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van kostenplaats.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(costCenter)) {
            loadingText = 'Geen kostenplaats gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <CostCenterDetailsFormGeneral costCenter={costCenter} updateState={updateState} />
            </div>
        );
    }
}

CostCenterDetailsForm.propTypes = {
    costCenter: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any,
};

export default CostCenterDetailsForm;
