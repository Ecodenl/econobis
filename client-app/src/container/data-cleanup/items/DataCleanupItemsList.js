import React from 'react';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataCleanupItemsItem from './DataCleanupItemsItem';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableBody from '../../../components/dataTable/DataTableBody';

export default function DataCleanupItemsList({ cleanupData, handleDataCleanupUpdateItem, confirmCleanup, isLoading }) {
    return (
        <>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Onderdeel'} width={'40%'} />
                        <DataTableHeadTitle title={'Items'} width={'10%'} />
                        <DataTableHeadTitle title={'Laatst bepaald'} width={'20%'} />
                        <DataTableHeadTitle title={'Laatst opgeschoond'} width={'20%'} />
                        <DataTableHeadTitle title={'Acties'} width={'10%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={5}>Gegevens aan het laden.</td>
                        </tr>
                    ) : cleanupData.length === 0 ? (
                        <tr>
                            <td colSpan={5}>Geen opschoon gegevens gevonden!</td>
                        </tr>
                    ) : (
                        cleanupData.map(item => {
                            return (
                                <DataCleanupItemsItem
                                    key={item.id}
                                    cleanupDataItem={item}
                                    handleDataCleanupUpdateItem={handleDataCleanupUpdateItem}
                                    confirmCleanup={confirmCleanup}
                                />
                            );
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </>
    );
}
