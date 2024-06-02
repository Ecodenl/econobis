import React, { useEffect, useState } from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import FinancialOverviewProjectNew from './FinancialOverviewProjectNew';
import FinancialOverviewProjectList from './FinancialOverviewProjectList';
import axios from 'axios';
import FinancialOverviewProjectAPI from '../../../../../api/financial/overview/FinancialOverviewProjectAPI';
import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

function FinancialOverviewProjectApp({ financialOverview, callFetchFinancialOverviewDetails }) {
    const [showNew, setShowNew] = useState(false);
    const [financialOverviewProjects, setFinancialOverviewProjects] = useState([]);
    const [meta, setMetaData] = useState({ total: 0 });
    const [totalsInfo, setTotalsInfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchFinancialOverviewProjects();
            callFetchFinancialOverviewDetails();
        },
        [
            financialOverview.statusId,
            financialOverview.totalFinancialOverviewProjectsInProgress,
            financialOverview.totalFinancialOverviewProjectsConcept,
            financialOverview.totalFinancialOverviewProjectsDefinitive,
        ]
    );

    function toggleShowNew() {
        setShowNew(!showNew);
    }
    function setShowNewFalse() {
        setShowNew(false);
    }

    function fetchFinancialOverviewProjects() {
        setLoading(true);
        setFinancialOverviewProjects([]);

        axios
            .all([
                FinancialOverviewProjectAPI.fetchFinancialOverviewProjects(financialOverview.id),
                FinancialOverviewDetailsAPI.fetchTotalsInfoFinancialOverview(financialOverview),
            ])
            .then(
                axios.spread((payloadFinancialOverviewProjects, payloadTotalsInfoFinancialOverview) => {
                    setFinancialOverviewProjects(payloadFinancialOverviewProjects.data.data);
                    setMetaData(payloadFinancialOverviewProjects.data.meta);
                    setTotalsInfo(payloadTotalsInfoFinancialOverview.data);
                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function refreshFinancialOverviewProjects() {
        fetchFinancialOverviewProjects();
        callFetchFinancialOverviewDetails();
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Projecten</span>
                {financialOverview && !financialOverview.definitive && (
                    <>
                        <a role="button" className="pull-right" onClick={toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                        <br />
                        <small style={{ color: 'red', fontWeight: 'normal' }}>
                            Je kan per administratie per jaar slechts 1 keer waardestaten aanmaken. Verwijder alleen
                            projecten waarvan je geen waardestaat wilt verzenden. Als een waardestaat eenmaal definitief
                            is kan je geen projecten meer toevoegen voor betreffende administratie en jaar.
                        </small>
                    </>
                )}
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <FinancialOverviewProjectNew
                            financialOverview={financialOverview}
                            toggleShowNew={toggleShowNew}
                            refreshFinancialOverviewProjects={refreshFinancialOverviewProjects}
                        />
                    )}
                </div>
                <div className="col-md-12">
                    <FinancialOverviewProjectList
                        financialOverview={financialOverview}
                        financialOverviewProjects={financialOverviewProjects}
                        meta={meta}
                        isLoading={isLoading}
                        setShowNewFalse={setShowNewFalse}
                        refreshFinancialOverviewProjects={refreshFinancialOverviewProjects}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default FinancialOverviewProjectApp;
