import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const ContactsInGroupListHead = props => {
    return (
        <tr className="thead-title-quaternary">
            {props.isUsedInLaposta ? (
                <>
                    <DataTableHeadTitle RowClassName={'hidden-xs'} title={'#'} width={'10%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Type'} width={'10%'} />
                    <DataTableHeadTitle sortColumn={'fullName'} title={'Naam'} width={'25%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs'} title={'E-mail'} width={'25%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Laposta status'} width={'10%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Toegevoegd op'} width={'10%'} />
                    <th width="10%" />
                </>
            ) : (
                <>
                    <DataTableHeadTitle RowClassName={'hidden-xs'} title={'#'} width={'15%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Type'} width={'15%'} />
                    <DataTableHeadTitle sortColumn={'fullName'} title={'Naam'} width={'30%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs'} title={'E-mail'} width={'30%'} />
                    <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Toegevoegd op'} width={'10%'} />
                    <th width="10%" />
                </>
            )}
        </tr>
    );
};

export default ContactsInGroupListHead;
