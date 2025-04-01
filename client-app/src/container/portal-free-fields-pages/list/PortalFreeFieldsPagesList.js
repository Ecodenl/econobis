import React, { useState } from 'react';

import PortalFreeFieldsPagesListItem from './PortalFreeFieldsPagesListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import PortalFreeFieldsPagesListHead from './PortalFreeFieldsPagesListHead';
import PortalFreeFieldsPagesListFilter from './PortalFreeFieldsPagesListFilter';
import PortalFreeFieldsPagesDeleteItem from './PortalFreeFieldsPagesDeleteItem';

function PortalFreeFieldsPagesList({
    portalFreeFieldsPages,
    portalFreeFieldsTotal,
    recordsPerPage,
    isLoading,
    filter,
    handlePageClick,
    handleChangeSort,
    handleChangeFilter,
    handleKeyUp,
    deletePortalFreeFieldsPage,
}) {
    const [showDeleteItem, setShowDeleteItem] = useState(false);
    const [deleteItem, setDeleteItem] = useState({ id: '', description: '' });

    function showDeleteItemModal(id, description) {
        setShowDeleteItem(true);
        setDeleteItem({ id, description });
    }

    function closeDeleteItemModal() {
        setShowDeleteItem(false);
        setDeleteItem({ id: '', description: '' });
    }

    return (
        <div>
            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <PortalFreeFieldsPagesListHead handleChangeSort={handleChangeSort} />
                        <PortalFreeFieldsPagesListFilter filter={filter} handleChangeFilter={handleChangeFilter} />
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3}>Bezig met gegevens laden</td>
                            </tr>
                        ) : portalFreeFieldsPages.length > 0 ? (
                            portalFreeFieldsPages.map(portalFreeFieldsPage => {
                                return (
                                    <PortalFreeFieldsPagesListItem
                                        key={portalFreeFieldsPage.id}
                                        {...portalFreeFieldsPage}
                                        showDeleteItemModal={showDeleteItemModal}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={3}>Geen resultaten!</td>
                            </tr>
                        )}
                    </DataTableBody>
                </DataTable>

                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={portalFreeFieldsTotal}
                        initialPage={0}
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
            {showDeleteItem && (
                <PortalFreeFieldsPagesDeleteItem
                    closeDeleteItemModal={closeDeleteItemModal}
                    {...deleteItem}
                    deletePortalFreeFieldsPage={deletePortalFreeFieldsPage}
                />
            )}
        </div>
    );
}

export default PortalFreeFieldsPagesList;
