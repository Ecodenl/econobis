import React, { useState } from 'react';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataCleanupItemsItem from './DataCleanupItemsItem';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataCleanupItemsToolbar from './DataCleanupItemsToolbar';

export default function DataCleanupItemsList({
    cleanupData,
    handleDataCleanupUpdateItems,
    confirmCleanup,
    isLoading,
    loadingText,
}) {
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
                            <td colSpan={5}>{loadingText()}</td>
                        </tr>
                    ) : (
                        cleanupData.map(item => {
                            return (
                                <DataCleanupItemsItem
                                    key={item.id}
                                    cleanupDataItem={item}
                                    handleDataCleanupUpdateItems={handleDataCleanupUpdateItems}
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
