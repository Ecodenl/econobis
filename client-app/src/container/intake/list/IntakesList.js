import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import IntakesListHead from './IntakesListHead';
import IntakesListFilter from './IntakesListFilter';
import IntakesListItem from './IntakesListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { useSelector } from 'react-redux';

function IntakesList({
    intakes,
    showCheckboxList,
    onSubmitFilter,
    checkedAllCheckboxes,
    handlePageClick,
    intakesPagination,
}) {
    const isLoading = useSelector(state => state.loadingData.isLoading);
    const hasError = useSelector(state => state.loadingData.hasError);

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            props.onSubmitFilter();
        }
    };

    const { data = [], meta = {} } = intakes;

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van intakes.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (data.length === 0) {
        loadingText = 'Geen intakes gevonden!';
    } else {
        loading = false;
    }

    return (
        <form onKeyUp={handleKeyUp}>
            <DataTable>
                <DataTableHead>
                    <IntakesListHead showCheckbox={showCheckboxList} refreshIntakesData={() => refreshIntakesData()} />
                    <IntakesListFilter
                        showCheckbox={showCheckboxList}
                        selectAllCheckboxes={() => selectAllCheckboxes()}
                        onSubmitFilter={onSubmitFilter}
                    />
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={6}>{loadingText}</td>
                        </tr>
                    ) : (
                        data.map(intake => {
                            return (
                                <IntakesListItem
                                    key={intake.id}
                                    {...intake}
                                    showCheckbox={showCheckboxList}
                                    checkedAllCheckboxes={checkedAllCheckboxes}
                                />
                            );
                        })
                    )}
                </DataTableBody>
            </DataTable>
            <div className="col-md-4 col-md-offset-4">
                <DataTablePagination
                    onPageChangeAction={handlePageClick}
                    totalRecords={meta.total}
                    initialPage={intakesPagination.page}
                />
            </div>
        </form>
    );
}

export default IntakesList;
