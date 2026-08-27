import React, { useEffect, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import OpportunitiesListHead from './OpportunitiesListHead';
import OpportunitiesListFilter from './OpportunitiesListFilter';
import OpportunitiesListItem from './OpportunitiesListItem';
import OpportunityDeleteItem from './OpportunityDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../../components/button/ButtonIcon';
import OpportunitiesBulkDelete from '../../opportunities/list/OpportunitiesBulkDelete';
import OpportunitiesBulkUpdate from '../../opportunities/list/OpportunitiesBulkUpdate';

function OpportunitiesList({
    opportunities,
    multiSelectEnabled,
    setMultiSelectDisabled,
    opportunitiesPagination,
    onSubmitFilter,
    fetchOpportunitiesData,
    handlePageClick,
}) {
    const [checkedAll, setCheckedAll] = useState(false);
    const [opportunityIds, setOpportunityIds] = useState([]);
    const [showDeleteItem, setShowDeleteItem] = useState(false);
    const [deleteItem, setDeleteItem] = useState({
        id: '',
        contactName: '',
        measureCategoryName: '',
    });
    const [showBulkDelete, setShowBulkDelete] = useState(false);
    const [showBulkUpdate, setShowBulkUpdate] = useState(false);
    const permissions = useSelector(state => state.meDetails.permissions);
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    useEffect(() => {
        if (!multiSelectEnabled) {
            setCheckedAll(false);
            setOpportunityIds([]);
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
        let opportunityIds = [];

        if (isChecked) {
            opportunityIds = meta.opportunityIdsTotal;
        }
        setOpportunityIds(opportunityIds);
        setCheckedAll(isChecked);
    }

    function toggleOpportunityCheck(event) {
        const isChecked = event.target.checked;
        const opportunityId = Number(event.target.name);

        if (isChecked) {
            setOpportunityIds([...opportunityIds, opportunityId]);
            checkAllOpportunitiesAreChecked();
        } else {
            setOpportunityIds([...opportunityIds.filter(item => item !== opportunityId)]);
            setCheckedAll(false);
        }
    }

    function checkAllOpportunitiesAreChecked() {
        setCheckedAll(opportunityIds.length === meta.opportunityIdsTotal.length);
    }

    function showDeleteItemModal(id, contactName, measureCategoryName) {
        setShowDeleteItem(true);
        setDeleteItem({
            id: id,
            contactName: contactName,
            measureCategoryName: measureCategoryName,
        });
    }

    function closeDeleteItemModal() {
        setShowDeleteItem(false);
        setDeleteItem({
            id: '',
            contactName: '',
            measureCategoryName: '',
        });
    }
    function showBulkDeleteModal(id, name) {
        setShowBulkDelete(true);
    }
    function closeBulkDeleteModal(id, name) {
        setShowBulkDelete(false);
    }
    function confirmActionsBulkDelete(id, name) {
        setShowBulkDelete(false);
        setMultiSelectDisabled();
        fetchOpportunitiesData();
    }
    function showBulkUpdateModal(id, name) {
        setShowBulkUpdate(true);
    }
    function closeBulkUpdateModal(id, name) {
        setShowBulkUpdate(false);
    }
    function confirmActionsBulkUpdate(id, name) {
        setShowBulkUpdate(false);
        setMultiSelectDisabled();
        fetchOpportunitiesData();
    }

    const { data = [], meta = {} } = opportunities;

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van kansen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (data.length === 0) {
        loadingText = 'Geen kansen gevonden!';
    } else {
        loading = false;
    }

    let numberSelectedNumberTotal = 0;

    if (opportunityIds) {
        if (meta && meta.opportunityIdsTotal) {
            numberSelectedNumberTotal = opportunityIds.length + '/' + meta.opportunityIdsTotal.length;
        } else {
            numberSelectedNumberTotal = opportunityIds.length;
        }
    }

    return (
        <div>
            <form onKeyUp={handleKeyUp}>
                {multiSelectEnabled && permissions.manageOpportunity && (
                    <>
                        <div className="col-md-12">
                            <div className="alert alert-success">Geselecteerde kansen: {numberSelectedNumberTotal}</div>
                        </div>
                        <div className="col-md-12 margin-10-bottom">
                            <div className="btn-group" role="group">
                                <ButtonIcon
                                    iconName={'pencil'}
                                    onClickAction={showBulkUpdateModal}
                                    title="Bijwerken geselecteerde kansen"
                                />
                                <ButtonIcon
                                    iconName={'trash'}
                                    onClickAction={showBulkDeleteModal}
                                    title="Verwijderen geselecteerde kansen"
                                />
                            </div>
                        </div>
                    </>
                )}

                <DataTable>
                    <DataTableHead>
                        <OpportunitiesListHead
                            showCheckbox={multiSelectEnabled}
                            fetchOpportunitiesData={() => fetchOpportunitiesData()}
                        />

                        <OpportunitiesListFilter
                            onSubmitFilter={onSubmitFilter}
                            showCheckbox={multiSelectEnabled}
                            toggleCheckedAll={toggleCheckedAll}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={multiSelectEnabled ? 9 : 8}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(opportunities => (
                                <OpportunitiesListItem
                                    key={opportunities.id}
                                    {...opportunities}
                                    showDeleteItemModal={showDeleteItemModal}
                                    showCheckbox={multiSelectEnabled}
                                    toggleOpportunityCheck={toggleOpportunityCheck}
                                    opportunityIds={opportunityIds}
                                />
                            ))
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={meta.total}
                        initialPage={opportunitiesPagination.page}
                    />
                </div>
                {showDeleteItem && (
                    <OpportunityDeleteItem closeDeleteItemModal={closeDeleteItemModal} {...deleteItem} />
                )}
                {showBulkDelete && (
                    <OpportunitiesBulkDelete
                        confirmActionsBulkDelete={confirmActionsBulkDelete}
                        closeBulkDeleteModal={closeBulkDeleteModal}
                        opportunityIds={opportunityIds}
                    />
                )}
                {showBulkUpdate && (
                    <OpportunitiesBulkUpdate
                        confirmActionsBulkUpdate={confirmActionsBulkUpdate}
                        closeBulkUpdateModal={closeBulkUpdateModal}
                        opportunityIds={opportunityIds}
                    />
                )}
            </form>
        </div>
    );
}

export default OpportunitiesList;
