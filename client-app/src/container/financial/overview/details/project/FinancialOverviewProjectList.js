import React from 'react';

import FinancialOverviewProjectItem from './FinancialOverviewProjectItem';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

function FinancialOverviewProjectList({
    financialOverview,
    financialOverviewProjects,
    meta,
    isLoading,
    setShowNewFalse,
    refreshFinancialOverviewProjects,
}) {
    let inProgressStartText = null;
    let inProgressEndText = null;
    if (financialOverview.totalFinancialOverviewProjectsInProgress > 0) {
        inProgressStartText =
            'Totaal projecten die nu toegevoegd worden: ' + financialOverview.totalFinancialOverviewProjectsInProgress;
        inProgressEndText =
            'Gebruik blauwe refresh/vernieuwen knop of F5 (Command + R op Mac) om projecten overzicht te verversen.';
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

            {financialOverview.totalFinancialOverviewProjectsInProgress > 0 ? (
                <div className="col-md-12">
                    <div className="alert alert-warning">
                        {inProgressStartText}
                        <br />
                        {inProgressEndText}
                    </div>
                </div>
            ) : null}

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
                                setShowNewFalse={setShowNewFalse}
                                refreshFinancialOverviewProjects={refreshFinancialOverviewProjects}
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
