import React, { useState } from 'react';

import ContactsToImportListItem from './ContactsToImportListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsToImportListHead from './ContactsToImportListHead';
import ContactsToImportListFilter from './ContactsToImportListFilter';

function ContactsToImportList({
    ContactsToImport,
    ContactsToImportTotal,
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
                        <ContactsToImportListHead handleChangeSort={handleChangeSort} />
                        {/*<ContactsToImportListFilter filter={filter} handleChangeFilter={handleChangeFilter} />*/}
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={15}>Bezig met gegevens laden</td>
                            </tr>
                        ) : ContactsToImport.length > 0 ? (
                            ContactsToImport.map(ContactToImport => {
                                return <ContactsToImportListItem key={ContactToImport.id} {...ContactToImport} />;
                            })
                        ) : (
                            <tr>
                                <td colSpan={15}>Geen resultaten!</td>
                            </tr>
                        )}
                    </DataTableBody>
                </DataTable>

                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={ContactsToImportTotal}
                        initialPage={0}
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
        </div>
    );
}

export default ContactsToImportList;
