import React from 'react';

import InvoicePostItem from './InvoicePostItem';
import ButtonIcon from '../../../../components/button/ButtonIcon';
import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';

function InvoicePostList({ invoicePosts, meta, isLoading, refreshInvoicePosts }) {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="btn-group btn-group-flex" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshInvoicePosts} />
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
                        ) : invoicePosts.length > 0 ? (
                            invoicePosts.map(invoicePost => {
                                return <InvoicePostItem key={invoicePost.id} invoicePost={invoicePost} />;
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

export default InvoicePostList;
