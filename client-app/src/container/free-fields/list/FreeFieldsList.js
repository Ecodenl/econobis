import React, { useState } from 'react';

import FreeFieldsListItem from './FreeFieldsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import FreeFieldsListHead from './FreeFieldsListHead';
import FreeFieldsListFilter from './FreeFieldsListFilter';
import FreeFieldsDeleteItem from './FreeFieldsDeleteItem';

function FreeFieldsList({
    freeFieldsFields,
    freeFieldsTotal,
    recordsPerPage,
    isLoading,
    filter,
    handlePageClick,
    handleChangeSort,
    handleChangeFilter,
    handleKeyUp,
    deleteFreeFieldsField,
    freeFieldsTables,
    freeFieldsFieldFormats,
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
                        <FreeFieldsListHead handleChangeSort={handleChangeSort} />
                        <FreeFieldsListFilter
                            filter={filter}
                            handleChangeFilter={handleChangeFilter}
                            freeFieldsTables={freeFieldsTables}
                            freeFieldsFieldFormats={freeFieldsFieldFormats}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4}>Bezig met gegevens laden</td>
                            </tr>
                        ) : freeFieldsFields.length > 0 ? (
                            freeFieldsFields.map(freeFieldsField => {
                                return (
                                    <FreeFieldsListItem
                                        key={freeFieldsField.id}
                                        {...freeFieldsField}
                                        showDeleteItemModal={showDeleteItemModal}
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

                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={freeFieldsTotal}
                        initialPage={0}
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
            {showDeleteItem && (
                <FreeFieldsDeleteItem
                    closeDeleteItemModal={closeDeleteItemModal}
                    {...deleteItem}
                    deleteFreeFieldsField={deleteFreeFieldsField}
                />
            )}
        </div>
    );
}

export default FreeFieldsList;
