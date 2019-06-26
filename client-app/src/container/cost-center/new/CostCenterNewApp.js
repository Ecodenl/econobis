import React from 'react';

import CostCenterNewForm from './CostCenterNewForm';
import CostCenterNewToolbar from './CostCenterNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const CostCenterNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <CostCenterNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <CostCenterNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default CostCenterNewApp;
