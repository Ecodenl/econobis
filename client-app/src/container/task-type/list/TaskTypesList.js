import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import TaskTypesListItem from './TaskTypesListItem';

const TaskTypesLists = ({ taskTypes, hasError, isLoading }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van taak types.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (taskTypes.length === 0) {
        loadingText = 'Geen taak types gevonden!';
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
                        taskTypes.map(taskType => {
                            return <TaskTypesListItem key={taskType.id} {...taskType} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </div>
    );
};

export default TaskTypesLists;
