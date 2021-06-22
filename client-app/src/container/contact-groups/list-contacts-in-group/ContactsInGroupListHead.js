import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const ContactsInGroupListHead = props => {
    return (
        <tr className="thead-title-quaternary">
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'#'} width={'3%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Type'} width={'5%'} />
            <DataTableHeadTitle sortColumn={'fullName'} title={'Naam'} width={'21%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'E-mail'} width={'12%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Laposta Id'} width={'12%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Status'} width={'7%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Toegevoegd op'} width={'10%'} />
            <th width="3%" />
        </tr>
    );
};

export default ContactsInGroupListHead;
