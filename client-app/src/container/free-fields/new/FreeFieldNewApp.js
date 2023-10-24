import React from 'react';

import FreeFieldNewForm from './FreeFieldNewForm';
import FreeFieldNewToolbar from './FreeFieldNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const FreeFieldNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <FreeFieldNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <FreeFieldNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default FreeFieldNewApp;
