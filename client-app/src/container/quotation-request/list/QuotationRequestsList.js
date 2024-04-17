import React, { useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import QuotationRequestsListHead from './QuotationRequestsListHead';
import QuotationRequestsListFilter from './QuotationRequestsListFilter';
import QuotationRequestsListItem from './QuotationRequestsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';

function QuotationRequestsList({
    quotationRequests,
    multiSelectEnabled,
    onSubmitFilter,
    refreshQuotationRequestsData,
    quotationRequestsPagination,
    handlePageClick,
}) {
    const [checkedAll, setCheckedAll] = useState(false);
    const [quotationRequestIds, setQuotationRequestIds] = useState([]);
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function toggleCheckedAll() {
        const isChecked = event.target.checked;
        let quotationRequestIds = [];

        if (isChecked) {
            quotationRequestIds = meta.quotationRequestIdsTotal;
        }
        setQuotationRequestIds(quotationRequestIds);
        setCheckedAll(isChecked);
    }

    function toggleQuotationRequestCheck(event) {
        const isChecked = event.target.checked;
        const quotationRequestId = Number(event.target.name);

        if (isChecked) {
            setQuotationRequestIds([...quotationRequestIds, quotationRequestId]);
            checkAllTasksAreChecked();
        } else {
            setQuotationRequestIds([...quotationRequestIds.filter(item => item !== quotationRequestId)]);
            setCheckedAll(false);
        }
    }

    function checkAllTasksAreChecked() {
        setCheckedAll(quotationRequestIds.length === meta.quotationRequestIdsTotal.length);
    }

    function updateSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
    }
    function deleteSelection() {
        // todo WM: nog doen
        console.log('updateSelection goes here');
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

    let numberSelectedNumberTotal = 0;

    if (quotationRequestIds) {
        if (meta && meta.quotationRequestIdsTotal) {
            numberSelectedNumberTotal = quotationRequestIds.length + '/' + meta.quotationRequestIdsTotal.length;
        } else {
            numberSelectedNumberTotal = quotationRequestIds.length;
        }
    }

    return (
        <div>
            <form onKeyUp={handleKeyUp}>
                {multiSelectEnabled && (
                    <>
                        <div className="col-md-12">
                            <div className="alert alert-success">
                                Geselecteerde kansacties: {numberSelectedNumberTotal}
                            </div>
                        </div>

                        <div className="col-md-12 margin-10-bottom">
                            <div className="btn-group" role="group">
                                <ButtonIcon
                                    iconName={'pencil'}
                                    onClickAction={updateSelection}
                                    title="Bijwerken geselecteerde kansacties"
                                />
                                <ButtonIcon
                                    iconName={'trash'}
                                    onClickAction={deleteSelection}
                                    title="Verwijderen geselecteerde kansacties"
                                />
                            </div>
                        </div>
                    </>
                )}

                <DataTable>
                    <DataTableHead>
                        <QuotationRequestsListHead
                            refreshQuotationRequestsData={() => refreshQuotationRequestsData()}
                        />
                        <QuotationRequestsListFilter
                            onSubmitFilter={onSubmitFilter}
                            showSelectQuotationRequests={multiSelectEnabled}
                            toggleCheckedAll={toggleCheckedAll}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={11}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(quotationRequest => {
                                return (
                                    <QuotationRequestsListItem
                                        key={quotationRequest.id}
                                        {...quotationRequest}
                                        showSelectQuotationRequests={multiSelectEnabled}
                                        toggleQuotationRequestCheck={toggleQuotationRequestCheck}
                                        quotationRequestIds={quotationRequestIds}
                                    />
                                );
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
        </div>
    );
}

export default QuotationRequestsList;
