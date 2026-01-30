import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../components/dataTable/DataTableBody';

export default function DataCleanupContactsExcludedGroupList({ cleanupContactsExcludedGroupsData, isLoading }) {
    console.log('cleanupContactsExcludedGroupsData');
    console.log(cleanupContactsExcludedGroupsData);

    return (
        <>
            <p>
                <strong>
                    Uitzonderingsgroepen voor opschonen contacten ({cleanupContactsExcludedGroupsData.length})
                </strong>
            </p>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Groepnaam'} width={'100%'} />
                        {/*<DataTableHeadTitle title={'Acties'} width={'10%'} />*/}
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={1}>Gegevens aan het laden.</td>
                        </tr>
                    ) : cleanupContactsExcludedGroupsData.length === 0 ? (
                        <tr>
                            <td colSpan={1}>Geen uitzonderingsgroepen gevonden!</td>
                        </tr>
                    ) : (
                        cleanupContactsExcludedGroupsData.map(item => (
                            <tr key={item.contactGroupId}>
                                <td>{item.contactGroupName}</td>
                            </tr>
                        ))
                    )}
                </DataTableBody>
            </DataTable>
        </>
    );
}
