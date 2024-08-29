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
    toggleCheckedImportNew,
    toggleAllCheckboxesNew,
    selectedImportsNew,
    selectAllUpdate,
    toggleCheckedContactUpdate,
    toggleAllCheckboxesUpdate,
    selectedContactsUpdate,
    numberSelectedTotal,
}) {
    let showSelectImportsInProgress = false;
    let inProgressText = 'Importeren/Bijwerken contacten';

    return (
        <div>
            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                {showSelectImportsInProgress ? (
                    <div className="col-md-12">
                        <div className="alert alert-warning">{inProgressText}</div>
                    </div>
                ) : (
                    <>
                        <div className="col-md-12">&nbsp;</div>
                        <div className="col-md-12">
                            {numberSelectedTotal ? (
                                <div className="alert alert-success">Geselecteerde imports: {numberSelectedTotal}</div>
                            ) : null}
                        </div>
                    </>
                )}

                <table className="table table-condensed col-xs-12">
                    <DataTableHead>
                        <ContactToImportsListHead
                            handleChangeSort={handleChangeSort}
                            selectAllNew={selectAllNew}
                            selectAllUpdate={selectAllUpdate}
                            toggleAllCheckboxesNew={toggleAllCheckboxesNew}
                            toggleAllCheckboxesUpdate={toggleAllCheckboxesUpdate}
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
                                        checkedNew={
                                            selectedImportsNew ? selectedImportsNew.includes(ContactToImport.id) : false
                                        }
                                        toggleCheckedImportNew={toggleCheckedImportNew}
                                        showCheckboxUpdate={selectAllUpdate}
                                        selectedContactsUpdate={selectedContactsUpdate}
                                        toggleCheckedContactUpdate={toggleCheckedContactUpdate}
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
