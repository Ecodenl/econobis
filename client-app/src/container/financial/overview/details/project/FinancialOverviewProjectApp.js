import React, { useEffect, useState } from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import FinancialOverviewProjectNew from './FinancialOverviewProjectNew';
import FinancialOverviewProjectList from './FinancialOverviewProjectList';

function FinancialOverviewProjectApp({ financialOverview }) {
    const [showNew, setShowNew] = useState(false);

    function toggleShowNew() {
        setShowNew(!showNew);
    }
    function setShowNewFalse() {
        setShowNew(false);
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Projecten</span>
                {financialOverview && !financialOverview.definitive && (
                    <a role="button" className="pull-right" onClick={toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
                )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <FinancialOverviewProjectNew
                            financialOverview={financialOverview}
                            toggleShowNew={toggleShowNew}
                        />
                    )}
                </div>
                <div className="col-md-12">
                    <FinancialOverviewProjectList
                        financialOverview={financialOverview}
                        setShowNewFalse={setShowNewFalse}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default FinancialOverviewProjectApp;
