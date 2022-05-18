import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import PortalSettingsLayoutFormGeneral from './general/PortalSettingsLayoutFormGeneral';
import * as PropTypes from 'prop-types';

class PortalSettingsLayoutDetailsForm extends Component {
    constructor(props) {
        super(props);
        console.log('xxx');
        console.log(props.dashboardSettings);
    }
    render() {
        let { portalSettingsLayout, dashboardSettings, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van portal instellingen layout.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(portalSettingsLayout)) {
            loadingText = 'Geen portal instellingen layout gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <PortalSettingsLayoutFormGeneral
                    portalSettingsLayout={portalSettingsLayout}
                    dashboardSettings={dashboardSettings}
                    updateState={updateState}
                />
            </div>
        );
    }
}

PortalSettingsLayoutDetailsForm.propTypes = {
    portalSettingsLayout: PropTypes.any,
    dashboardSettings: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any,
};

export default PortalSettingsLayoutDetailsForm;
