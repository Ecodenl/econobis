import React from 'react';

import FinancialOverviewProjectItem from './FinancialOverviewProjectItem';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import DataTable from '../../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../../components/dataTable/DataTableBody';

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

            <div className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <th width={'25%'}>Projectcode</th>
                            <th width={'40%'}>Project</th>
                            <th width={'15%'}>Type project</th>
                            <th width={'15%'}>Status</th>
                            <th width={'5%'} />
                        </tr>
                    </DataTableHead>

                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5}>Bezig met gegevens laden</td>
                            </tr>
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
                            <tr>
                                <td colSpan={5}>Geen resultaten!</td>
                            </tr>
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        </div>
    );
}

export default FinancialOverviewProjectList;
