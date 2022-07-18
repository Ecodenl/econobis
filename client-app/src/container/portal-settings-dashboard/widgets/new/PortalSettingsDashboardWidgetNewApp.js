import React from 'react';

import PortalSettingsDashboardWidgetNewForm from './PortalSettingsDashboardWidgetNewForm';
import PortalSettingsDashboardWidgetNewToolbar from './PortalSettingsDashboardWidgetNewToolbar';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const PortalSettingsDashboardWidgetNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <PortalSettingsDashboardWidgetNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <PortalSettingsDashboardWidgetNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default PortalSettingsDashboardWidgetNewApp;
