import React from 'react';

import FreeFieldsListItem from './FreeFieldsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import FreeFieldsListHead from './FreeFieldsListHead';
import FreeFieldsListFilter from './FreeFieldsListFilter';

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
}) {
    return (
        <div>
            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <FreeFieldsListHead handleChangeSort={handleChangeSort} />
                        <FreeFieldsListFilter filter={filter} handleChangeFilter={handleChangeFilter} />
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3}>Bezig met gegevens laden</td>
                            </tr>
                        ) : freeFieldsFields.length > 0 ? (
                            freeFieldsFields.map(freeFieldsField => {
                                return <FreeFieldsListItem key={freeFieldsField.id} {...freeFieldsField} />;
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
                        totalRecords={freeFieldsTotal}
                        initialPage={0}
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
        </div>
    );
}

export default FreeFieldsList;
