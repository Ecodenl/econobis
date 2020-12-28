import React, { useEffect, useState } from 'react';
import axios from 'axios';

import FinancialOverviewProjectItem from './FinancialOverviewProjectItem';
import FinancialOverviewProjectAPI from '../../../../../api/financial/overview/FinancialOverviewProjectAPI';
import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

function FinancialOverviewProjectList({ financialOverview, setShowNewFalse }) {
    const [financialOverviewProjects, setFinancialOverviewProjects] = useState([]);
    const [totalsInfo, setTotalsInfo] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchFinancialOverviewProjects();
        },
        [financialOverview.statusId, totalsInfo.totalFinancialOverviewProjectsConcept]
    );

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
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="btn-group btn-group-flex" role="group">
                        <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={refreshFinancialOverviewProjects} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="pull-right">Resultaten: {meta.total || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="col-md-12">*/}
            {/*    {messageText ? <div className="alert alert-danger">{messageText}</div> : null}*/}
            {/*</div>*/}
            <div className="row header">
                <div className="col-sm-2">Projectcode</div>
                <div className="col-sm-5">Project</div>
                <div className="col-sm-2">Type project</div>
                <div className="col-sm-2">Status</div>
            </div>

            <div>
                {isLoading ? (
                    <div>Bezig met gegevens laden</div>
                ) : financialOverviewProjects.length > 0 ? (
                    financialOverviewProjects.map(financialOverviewProject => {
                        return (
                            <FinancialOverviewProjectItem
                                key={financialOverviewProject.id}
                                financialOverview={financialOverview}
                                financialOverviewProject={financialOverviewProject}
                                fetchFinancialOverviewProjects={fetchFinancialOverviewProjects}
                                setShowNewFalse={setShowNewFalse}
                            />
                        );
                    })
                ) : (
                    <div>Geen resultaten!</div>
                )}
            </div>
        </div>
    );
}

export default FinancialOverviewProjectList;
