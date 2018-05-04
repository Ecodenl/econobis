import React from 'react';

import AdministrationNewForm from './AdministrationNewForm';
import AdministrationNewToolbar from './AdministrationNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const AdministrationNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className="panel-small">
                                    <AdministrationNewToolbar />
                                </PanelBody>
                            </Panel>
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <AdministrationNewForm />
                        </div>
            </div>
            <div className="col-md-3" />
        </div>
    )
};

export default AdministrationNewApp;