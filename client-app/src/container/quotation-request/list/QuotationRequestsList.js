import React, { useEffect, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import QuotationRequestsListHead from './QuotationRequestsListHead';
import QuotationRequestsListFilter from './QuotationRequestsListFilter';
import QuotationRequestsListItem from './QuotationRequestsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';
import QuotationRequestsBulkDelete from '../../quotation-request/list/QuotationRequestsBulkDelete';
import QuotationRequestsBulkUpdate from '../../quotation-request/list/QuotationRequestsBulkUpdate';

function QuotationRequestsList({
    quotationRequests,
    multiSelectEnabled,
    setMultiSelectDisabled,
    setOpportunityActionTypeAll,
    quotationRequestsPagination,
    onSubmitFilter,
    refreshQuotationRequestsData,
    handlePageClick,
    opportunityActionType,
    opportunityActionId,
    opportunityActionName,
}) {
    const [checkedAll, setCheckedAll] = useState(false);
    const [quotationRequestIds, setQuotationRequestIds] = useState([]);
    const [showBulkDelete, setShowBulkDelete] = useState(false);
    const [showBulkUpdate, setShowBulkUpdate] = useState(false);
    const permissions = useSelector(state => state.meDetails.permissions);
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    useEffect(() => {
        if (!multiSelectEnabled) {
            setCheckedAll(false);
            setQuotationRequestIds([]);
        }
    }, [multiSelectEnabled]);

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

    function showBulkDeleteModal(id, name) {
        setShowBulkDelete(true);
    }
    function closeBulkDeleteModal(id, name) {
        setShowBulkDelete(false);
    }
    function confirmActionsBulkDelete(id, name) {
        setShowBulkDelete(false);
        setOpportunityActionTypeAll();
        setMultiSelectDisabled();
        refreshQuotationRequestsData();
    }
    function showBulkUpdateModal(id, name) {
        setShowBulkUpdate(true);
    }
    function closeBulkUpdateModal(id, name) {
        setShowBulkUpdate(false);
    }
    function confirmActionsBulkUpdate(id, name) {
        setShowBulkUpdate(false);
        setOpportunityActionTypeAll();
        setMultiSelectDisabled();
        refreshQuotationRequestsData();
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
                {multiSelectEnabled && permissions.manageQuotationRequest && (
                    <>
                        <div className="col-md-12">
                            <div className="alert alert-success">
                                Geselecteerde kansacties {opportunityActionName} : {numberSelectedNumberTotal}
                            </div>
                        </div>

                        <div className="col-md-12 margin-10-bottom">
                            <div className="btn-group" role="group">
                                {opportunityActionType !== 'visit' ? (
                                    <ButtonIcon
                                        iconName={'pencil'}
                                        onClickAction={showBulkUpdateModal}
                                        title="Bijwerken geselecteerde kansacties"
                                    />
                                ) : null}
                                <ButtonIcon
                                    iconName={'trash'}
                                    onClickAction={showBulkDeleteModal}
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
                            multiSelectEnabled={multiSelectEnabled}
                        />
                        <QuotationRequestsListFilter
                            onSubmitFilter={onSubmitFilter}
                            multiSelectEnabled={multiSelectEnabled}
                            toggleCheckedAll={toggleCheckedAll}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={multiSelectEnabled ? 13 : 12}>{loadingText}</td>
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
            {showBulkDelete && (
                <QuotationRequestsBulkDelete
                    confirmActionsBulkDelete={confirmActionsBulkDelete}
                    closeBulkDeleteModal={closeBulkDeleteModal}
                    quotationRequestIds={quotationRequestIds}
                />
            )}
            {showBulkUpdate && (
                <QuotationRequestsBulkUpdate
                    confirmActionsBulkUpdate={confirmActionsBulkUpdate}
                    closeBulkUpdateModal={closeBulkUpdateModal}
                    quotationRequestIds={quotationRequestIds}
                    opportunityActionId={opportunityActionId}
                />
            )}
        </div>
    );
}

export default QuotationRequestsList;
