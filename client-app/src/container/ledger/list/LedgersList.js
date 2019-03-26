import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import LedgersListItem from './LedgersListItem';

const VatCodesLists = ({ ledgers, hasError, isLoading }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van grootboekrekeningen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (ledgers.length === 0) {
        loadingText = 'Geen grootboekrekeningen gevonden!';
    } else {
        loading = false;
    }

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Omschrijving'} width={'35%'} />
                        <DataTableHeadTitle title={'BTW code'} width={'60%'} />
                        <DataTableHeadTitle title={''} width={'5%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={5}>{loadingText}</td>
                        </tr>
                    ) : (
                        ledgers.map(ledger => {
                            return <LedgersListItem key={ledger.id} {...ledger} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </div>
    );
};

export default VatCodesLists;
