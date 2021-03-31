import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import MeasureCategoriesListItem from './MeasureCategoriesListItem';

const MeasureCategoriesLists = ({ measureCategories, hasError, isLoading }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van maatregel categorieën.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (measureCategories.length === 0) {
        loadingText = 'Geen maatregel categorieën gevonden!';
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
                        measureCategories.map(measureCategory => {
                            return <MeasureCategoriesListItem key={measureCategory.id} {...measureCategory} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </div>
    );
};

export default MeasureCategoriesLists;
