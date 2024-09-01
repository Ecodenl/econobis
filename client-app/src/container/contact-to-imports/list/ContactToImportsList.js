import React, { useState } from 'react';

import ContactToImportsListItem from './ContactToImportsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
// import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactToImportsListHead from './ContactToImportsListHead';
// import ContactToImportsListFilter from './ContactToImportsListFilter';
import ButtonText from '../../../components/button/ButtonText';

function ContactToImportsList({
    ContactToImports,
    ContactToImportsTotal,
    checkedAllNew,
    checkedAllUpdate,
    recordsPerPage,
    isLoading,
    filter,
    handlePageClick,
    handleChangeSort,
    handleChangeFilter,
    // handleKeyUp,
    refreshContactToImports,
    selectAllNew,
    toggleCheckedImportNew,
    toggleAllCheckboxesNew,
    selectedImportsNew,
    numberSelectedNewTotal,
    totalContactIds,
    selectAllUpdate,
    toggleCheckedContactUpdate,
    toggleAllCheckboxesUpdate,
    selectedContactsUpdate,
    numberSelectedUpdateTotal,
    createContactsFromImport,
    updateContactsFromImport,
}) {
    let showSelectImportsInProgress = false;
    let inProgressText = 'Importeren/Bijwerken contacten';

    // console.log('totalContactIds');
    // console.log(totalContactIds);
    return (
        <div>
            {/*<form onKeyUp={handleKeyUp} className={'margin-10-top'}>*/}
            <form className={'margin-10-top'}>
                {showSelectImportsInProgress ? (
                    <div className="col-md-12">
                        <div className="alert alert-warning">{inProgressText}</div>
                    </div>
                ) : (
                    <>
                        <div className="col-md-12">&nbsp;</div>
                        {selectedImportsNew && selectedImportsNew.length > 0 ? (
                            <div className="col-md-12">
                                <div className="alert alert-success">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {'  Geselecteerde imports nieuw: '}
                                            {numberSelectedNewTotal}
                                        </div>
                                        <div className="col-md-3">
                                            <ButtonText
                                                buttonText={'Aanmaken als nieuwe contact(en)'}
                                                onClickAction={createContactsFromImport}
                                            />
                                        </div>
                                        <div className="col-md-6">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {selectedContactsUpdate && selectedContactsUpdate.length > 0 ? (
                            <div className="col-md-12">
                                <div className="alert alert-success">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {'  Geselecteerde contacten bijwerken: '}
                                            {numberSelectedUpdateTotal}
                                        </div>
                                        <div className="col-md-3">
                                            <ButtonText
                                                buttonText={'Bijwerken contact(en)'}
                                                onClickAction={updateContactsFromImport}
                                            />
                                        </div>
                                        <div className="col-md-6">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </>
                )}

                <table className="table table-condensed col-xs-12">
                    <DataTableHead>
                        <ContactToImportsListHead
                            handleChangeSort={handleChangeSort}
                            checkedAllNew={checkedAllNew}
                            checkedAllUpdate={checkedAllUpdate}
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
                                        totalContactIds={totalContactIds}
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
