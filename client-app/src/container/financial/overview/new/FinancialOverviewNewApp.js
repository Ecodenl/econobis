import React from 'react';

import FinancialOverviewNewForm from './FinancialOverviewNewForm';
import FinancialOverviewNewToolbar from './FinancialOverviewNewToolbar';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const FinancialOverviewNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <FinancialOverviewNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <FinancialOverviewNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default FinancialOverviewNewApp;
