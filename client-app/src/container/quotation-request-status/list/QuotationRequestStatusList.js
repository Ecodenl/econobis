import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import QuotationRequestStatusListItem from './QuotationRequestStatusListItem';

const QuotationRequestStatusLists = ({ quotationRequestStatus, hasError, isLoading }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van kans statussen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (quotationRequestStatus.length === 0) {
        loadingText = 'Geen kans statussen gevonden!';
    } else {
        loading = false;
    }

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Omschrijving'} width={'100%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={4}>{loadingText}</td>
                        </tr>
                    ) : (
                        quotationRequestStatus.map(quotationRequestStatus => {
                            return (
                                <QuotationRequestStatusListItem
                                    key={quotationRequestStatus.id}
                                    {...quotationRequestStatus}
                                />
                            );
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </div>
    );
};

export default QuotationRequestStatusLists;
