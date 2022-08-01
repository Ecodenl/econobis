import React, { Component } from 'react';

import PortalSettingsDashboardFormGeneral from './general/PortalSettingsDashboardFormGeneral';
import * as PropTypes from 'prop-types';
import PortalSettingsLayoutDetailsForm from '../portal-settings-layout/details/PortalSettingsLayoutForm';
import PortalSettingsDashboardWidgetApp from './widgets/PortalSettingsDashboardWidgetApp';

class PortalSettingsDashboardForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { defaultPortalSettingsLayout, dashboardSettings, hasError, isLoading, updateState } = this.props;
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
                <PortalSettingsDashboardFormGeneral
                    defaultPortalSettingsLayout={defaultPortalSettingsLayout}
                    dashboardSettings={dashboardSettings}
                    updateState={updateState}
                />
                <PortalSettingsDashboardWidgetApp dashboardSettings={dashboardSettings} updateState={updateState} />
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
