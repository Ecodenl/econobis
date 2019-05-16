import React from 'react';

import VatCodeNewForm from './VatCodeNewForm';
import VatCodeNewToolbar from './VatCodeNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const VatCodeNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <VatCodeNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <VatCodeNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default VatCodeNewApp;
