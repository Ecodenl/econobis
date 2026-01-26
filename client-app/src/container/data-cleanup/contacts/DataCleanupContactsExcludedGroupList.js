import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableBody from '../../../components/dataTable/DataTableBody';

export default function DataCleanupContactsExcludedGroupList({
    cleanupContactsExcludedGroupsData,
    isLoading,
    loadingText,
}) {
    // console.log('cleanupContactsExcludedGroupsData');
    // console.log(cleanupContactsExcludedGroupsData);
    return (
        <>
            <h4>Uitzonderingsgroepen voor opschonen contacten</h4>

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
                            <td colSpan={1}>{loadingText()}</td>
                        </tr>
                    ) : (
                        cleanupContactsExcludedGroupsData.map(item => {
                            <tr>
                                <td>{item.contact_group_id}</td>
                            </tr>;
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </>
    );
}
