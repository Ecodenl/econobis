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
                        <DataTableHeadTitle title={'Items te verwijderen'} width={'10%'} />
                        <DataTableHeadTitle title={'Laatst bepaald'} width={'15%'} />
                        <DataTableHeadTitle title={'Actie'} width={'5%'} />
                        <DataTableHeadTitle title={'Items verwijderd'} width={'10%'} />
                        <DataTableHeadTitle title={'Items geweigerd'} width={'10%'} />
                        <DataTableHeadTitle title={'Laatst opgeschoond'} width={'15%'} />
                        <DataTableHeadTitle title={'Actie'} width={'5%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={8}>Gegevens aan het laden.</td>
                        </tr>
                    ) : cleanupData.length === 0 ? (
                        <tr>
                            <td colSpan={8}>Geen opschoon gegevens gevonden!</td>
                        </tr>
                    ) : (
                        cleanupData.map(item => {
                            console.log('item');
                            console.log(item);
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
