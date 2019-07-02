import React from 'react';

import LedgerNewForm from './LedgerNewForm';
import LedgerNewToolbar from './LedgerNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const LedgerNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <LedgerNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <LedgerNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default LedgerNewApp;
