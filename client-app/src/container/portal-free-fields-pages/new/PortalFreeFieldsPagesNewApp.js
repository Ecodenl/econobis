import React from 'react';

import PortalFreeFieldsPagesNewForm from './PortalFreeFieldsPagesNewForm';
import PortalFreeFieldsPagesNewToolbar from './PortalFreeFieldsPagesNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const PortalFreeFieldsPagesNewApp = () => {
    return (
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
                    <PortalFreeFieldsPagesNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default PortalFreeFieldsPagesNewApp;
