import React, { useEffect, useState } from 'react';

import PortalFreeFieldsPagesNewForm from './PortalFreeFieldsPagesNewForm';
import PortalFreeFieldsPagesNewToolbar from './PortalFreeFieldsPagesNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import axios from 'axios';
import PortalSettingsAPI from '../../../api/portal-settings/PortalSettingsAPI';

function PortalFreeFieldsPagesNewApp() {
    const [portalUrl, setPortalUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPortalSetttings();
    }, []);

    function fetchPortalSetttings() {
        setIsLoading(true);

        // todo WM: check / anders
        //
        const portalSettingsId = 1;

        axios
            .all([PortalSettingsAPI.fetchPortalSettingsDetails(portalSettingsId)])
            .then(
                axios.spread(payloadPortalSettings => {
                    setPortalUrl(payloadPortalSettings.data.data.portalUrl);
                    setIsLoading(false);
                })
            )
            .catch(() => {
                alert('Er is iets misgegaan met ophalen van het vrije veld.');
                setIsLoading(false);
            });
    }

    return isLoading ? (
        <div>Gegevens aan het laden.</div>
    ) : (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <PortalFreeFieldsPagesNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <PortalFreeFieldsPagesNewForm portalUrl={portalUrl} />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
}

export default PortalFreeFieldsPagesNewApp;
