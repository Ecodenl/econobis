import React, { Component } from 'react';

import PortalSettingsDashboardFormGeneral from './general/PortalSettingsDashboardFormGeneral';
import * as PropTypes from 'prop-types';
import PortalSettingsLayoutDetailsForm from '../portal-settings-layout/details/PortalSettingsLayoutForm';

class PortalSettingsDashboardForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { dashboardSettings, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van portal dashboard instellingen.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <PortalSettingsDashboardFormGeneral dashboardSettings={dashboardSettings} updateState={updateState} />
                {/*<PortalSettingsDashboardFormWidgets />*/}
            </div>
        );
    }
}

PortalSettingsLayoutDetailsForm.propTypes = {
    dashboardSettings: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any,
};
export default PortalSettingsDashboardForm;
