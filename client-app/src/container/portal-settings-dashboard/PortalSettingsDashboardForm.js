import React from 'react';
import { isEmpty } from 'lodash';

import PortalSettingsFormGeneral from './general/PortalSettingsDashboardFormGeneral';

const PortalSettingsDashboardForm = ({ dashboardSettings, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van dashboard instellingen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <PortalSettingsFormGeneral dashboardSettings={dashboardSettings} updateState={updateState} />
        </div>
    );
};

export default PortalSettingsDashboardForm;
