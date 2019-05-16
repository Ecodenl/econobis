import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import VatCodesListItem from './VatCodesListItem';

const VatCodesLists = ({ vatCodes, hasError, isLoading }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van btw codes.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (vatCodes.length === 0) {
        loadingText = 'Geen btw codes gevonden!';
    } else {
        loading = false;
    }

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Startdatum'} width={'20%'} />
                        <DataTableHeadTitle title={'Omschrijving'} width={'35%'} />
                        <DataTableHeadTitle title={'Percentage'} width={'40%'} />
                        <DataTableHeadTitle title={''} width={'5%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={4}>{loadingText}</td>
                        </tr>
                    ) : (
                        vatCodes.map(vatCode => {
                            return <VatCodesListItem key={vatCode.id} {...vatCode} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </div>
    );
};

export default VatCodesLists;
