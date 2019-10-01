import React from 'react';
import { isEmpty } from 'lodash';

import PortalSettingsFormGeneral from './general/PortalSettingsFormGeneral';

const PortalSettingsForm = ({ portalSettings, hasError, isLoading, updateState, emailTemplates }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van portal instellingen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(portalSettings)) {
        loadingText = 'Geen portal instellingen gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <PortalSettingsFormGeneral portalSettings={portalSettings} updateState={updateState} />
        </div>
    );
};

export default PortalSettingsForm;
