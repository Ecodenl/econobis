import React, { useState } from 'react';

import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import MailboxesListItem from './MailboxesListItem';
import MailboxesListHead from './MailboxesListHead';
import MailboxesListFilter from './MailboxesListFilter';

function MailboxesList({
    mailboxes,
    mailboxesTotal,
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
                        <MailboxesListHead handleChangeSort={handleChangeSort} />
                        <MailboxesListFilter filter={filter} handleChangeFilter={handleChangeFilter} />
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7}>Bezig met gegevens laden</td>
                            </tr>
                        ) : mailboxes.length > 0 ? (
                            mailboxes.map(mailbox => {
                                return <MailboxesListItem key={mailbox.id} {...mailbox} />;
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
                        totalRecords={mailboxesTotal}
                        initialPage={0}
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
        </div>
    );
}

export default MailboxesList;
