import React, { useEffect, useState } from 'react';

import ProjectList from './ProjectList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import ProjectNew from './ProjectNew';
import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';

function ProjectApp({ financialOverview, callFetchFinancialOverviewDetails }) {
    // const [financialOverviewProjects, setFinancialOverviewProjects] = useState([]);
    // const [financialOverviewTest, setFinancialOverviewTest] = useState([]);
    // const [isLoading, setLoading] = useState(true);

    const [showNew, setShowNew] = useState(false);

    // If financial overview has changes, reload data here
    // useEffect(
    //     function() {
    //         // console.log('hello useEffect projectApp');
    //         callFetchFinancialOverviewProjects();
    //     },
    //     [financialOverview.statusId]
    // );

    function toggleShowNew() {
        setShowNew(!showNew);
    }
    function setShowNewFalse() {
        setShowNew(false);
    }

    // function callFetchFinancialOverviewProjects() {
    //     setLoading(true);
    //     //todo WM: opschonen log
    //     // console.log('callFetchFinancialOverviewTest');
    //     //todo fetchFinancialOverviewProjects hier ipv fetchFinancialOverviewDetails ?
    //     FinancialOverviewDetailsAPI.fetchFinancialOverviewDetails(financialOverview.id)
    //         .then(payload => {
    //             setFinancialOverviewTest(payload.data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             setLoading(false);
    //             alert('Er is iets misgegaan met ophalen van de gegevens.');
    //         });
    // }

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
                        <ProjectNew
                            financialOverview={financialOverview}
                            toggleShowNew={toggleShowNew}
                            callFetchFinancialOverviewDetails={callFetchFinancialOverviewDetails}
                        />
                    )}
                </div>
                <div className="col-md-12">
                    <ProjectList
                        financialOverview={financialOverview}
                        callFetchFinancialOverviewDetails={callFetchFinancialOverviewDetails}
                        setShowNewFalse={setShowNewFalse}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ProjectApp;
