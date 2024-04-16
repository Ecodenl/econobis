import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import QuotationRequestsListHead from './QuotationRequestsListHead';
import QuotationRequestsListFilter from './QuotationRequestsListFilter';
import QuotationRequestsListItem from './QuotationRequestsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';

function QuotationRequestsList({
    quotationRequests,
    onSubmitFilter,
    refreshQuotationRequestsData,
    quotationRequestsPagination,
    handlePageClick,
}) {
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    const { data = [], meta = {} } = quotationRequests;

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van kansacties.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (data.length === 0) {
        loadingText = 'Geen kansacties gevonden!';
    } else {
        loading = false;
    }

    return (
        <form onKeyUp={handleKeyUp}>
            <DataTable>
                <DataTableHead>
                    <QuotationRequestsListHead refreshQuotationRequestsData={() => refreshQuotationRequestsData()} />
                    <QuotationRequestsListFilter onSubmitFilter={onSubmitFilter} />
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={11}>{loadingText}</td>
                        </tr>
                    ) : (
                        data.map(quotationRequest => {
                            return <QuotationRequestsListItem key={quotationRequest.id} {...quotationRequest} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
            <div className="col-md-4 col-md-offset-4">
                <DataTablePagination
                    onPageChangeAction={handlePageClick}
                    totalRecords={meta.total}
                    initialPage={quotationRequestsPagination.page}
                />
            </div>
        </form>
    );
}

export default QuotationRequestsList;
