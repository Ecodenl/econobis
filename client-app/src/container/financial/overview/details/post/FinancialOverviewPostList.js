import React from 'react';

import FinancialOverviewPostItem from './FinancialOverviewPostItem';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import DataTable from '../../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../../components/dataTable/DataTableBody';

function FinancialOverviewPostList({ financialOverviewPosts, meta, isLoading, refreshFinancialOverviewPosts }) {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="btn-group btn-group-flex" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshFinancialOverviewPosts} />
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

            <div className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <th width={'10%'}>Id</th>
                            <th width={'60%'}>Naam</th>
                            <th width={'20%'}>Datum</th>
                            <th width={'10%'} />
                        </tr>
                    </DataTableHead>

                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4}>Bezig met gegevens laden</td>
                            </tr>
                        ) : financialOverviewPosts.length > 0 ? (
                            financialOverviewPosts.map(financialOverviewPost => {
                                return (
                                    <FinancialOverviewPostItem
                                        key={financialOverviewPost.id}
                                        financialOverviewPost={financialOverviewPost}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4}>Geen resultaten!</td>
                            </tr>
                        )}
                    </DataTableBody>
                </DataTable>
            </div>
        </div>
    );
}

export default FinancialOverviewPostList;
