import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const ContactsInGroupListHead = (props) => {
    return (
        <tr className="thead-title-quaternary">
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'#'} width={'3%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Type'} width={'5%'}  />
            <DataTableHeadTitle sortColumn={'fullName'} title={'Naam'} width={'11%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Adres'} width={'12%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Postcode'} width={'7%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Plaats'} width={'10%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Email'} width={'12%'} />
            <DataTableHeadTitle sortColumn={'phoneNumber'} title={'Telefoon'} width={'7%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Status'} width={'9%'} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} title={'Gemaakt op'} width={'10%'} />
            <th width="3%" />
        </tr>
    );
};

export default ContactsInGroupListHead;
