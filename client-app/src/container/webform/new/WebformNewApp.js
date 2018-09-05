import React from 'react';

import WebformNewForm from './WebformNewForm';
import WebformNewToolbar from './WebformNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const WebformNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className="panel-small">
                                    <WebformNewToolbar />
                                </PanelBody>
                            </Panel>
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <WebformNewForm />
                        </div>
            </div>
            <div className="col-md-3" />
        </div>
    )
};

export default WebformNewApp;