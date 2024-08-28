import React, { useState } from 'react';

import ContactToImportsListItem from './ContactToImportsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactToImportsListHead from './ContactToImportsListHead';
import ContactToImportsListFilter from './ContactToImportsListFilter';

function ContactToImportsList({
    ContactToImports,
    ContactToImportsTotal,
    recordsPerPage,
    isLoading,
    filter,
    handlePageClick,
    handleChangeSort,
    handleChangeFilter,
    handleKeyUp,
    refreshContactToImports,
    selectAllNew,
    setCheckedContactNew,
    selectAllCheckboxesNew,
    selectedImportsNew,
    selectAllUpdate,
    setCheckedContactUpdate,
    selectAllCheckboxesUpdate,
    selectedContactsUpdate,
}) {
    return (
        <div>
            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <table className="table table-condensed col-xs-12">
                    <DataTableHead>
                        <ContactToImportsListHead
                            handleChangeSort={handleChangeSort}
                            selectAllNew={selectAllNew}
                            selectAllUpdate={selectAllUpdate}
                            selectAllCheckboxesNew={selectAllCheckboxesNew}
                            selectAllCheckboxesUpdate={selectAllCheckboxesUpdate}
                        />
                        {/*<ContactToImportsListFilter filter={filter} handleChangeFilter={handleChangeFilter} />*/}
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={15}>Bezig met gegevens laden</td>
                            </tr>
                        ) : ContactToImports.length > 0 ? (
                            ContactToImports.map(ContactToImport => {
                                return (
                                    <ContactToImportsListItem
                                        // todo WM: FF snel voor test
                                        showCheckboxNew={selectAllNew}
                                        // checkedNew={false}
                                        checkedNew={
                                            selectedImportsNew ? selectedImportsNew.includes(ContactToImport.id) : false
                                        }
                                        setCheckedContactNew={setCheckedContactNew}
                                        showCheckboxUpdate={selectAllUpdate}
                                        // checkedUpdate={
                                        //     selectedContactsUpdate
                                        //         ? selectedContactsUpdate.includes(ContactToImport.id)
                                        //         : false
                                        // }
                                        selectedContactsUpdate={selectedContactsUpdate}
                                        setCheckedContactUpdate={setCheckedContactUpdate}
                                        key={ContactToImport.id}
                                        refreshContactToImports={refreshContactToImports}
                                        {...ContactToImport}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={15}>Geen resultaten!</td>
                            </tr>
                        )}
                    </DataTableBody>
                </table>

                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={ContactToImportsTotal}
                        initialPage={0}
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
        </div>
    );
}

export default ContactToImportsList;
