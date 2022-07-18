import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import PortalSettingsDashboardWidgetFormGeneral from './general/PortalSettingsDashboardWidgetFormGeneral';
import * as PropTypes from 'prop-types';

class PortalSettingsDashboardWidgetDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {
            portalSettingsDashboardWidget,
            dashboardSettings,
            contactGroups,
            hasError,
            isLoading,
            updateState,
        } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van dashboard widget.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(portalSettingsDashboardWidget)) {
            loadingText = 'Geen dashboard widget gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <PortalSettingsDashboardWidgetFormGeneral
                    portalSettingsDashboardWidget={portalSettingsDashboardWidget}
                    dashboardSettings={dashboardSettings}
                    contactGroups={contactGroups}
                    isLoading={isLoading}
                    updateState={updateState}
                />
            </div>
        );
    }
}

PortalSettingsDashboardWidgetDetailsForm.propTypes = {
    portalSettingsDashboardWidget: PropTypes.any,
    dashboardSettings: PropTypes.any,
    contactGroups: PropTypes.any,
    isLoading: PropTypes.any,
    hasError: PropTypes.any,
    updateState: PropTypes.any,
};

export default PortalSettingsDashboardWidgetDetailsForm;
