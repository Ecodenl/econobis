import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const MailboxesListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'name'}
                title={'Weergavenaam'}
                width={'25%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'E-mail'} width={'25%'} />
            <DataTableHeadTitle title={'Inkomend'} width={'20%'} />
            <DataTableHeadTitle title={'Uitgaand'} width={'20%'} />
            <DataTableHeadTitle title={'Primair'} width={'5%'} />
            <DataTableHeadTitle title={'Actief'} width={'5%'} />
            <DataTableHeadTitle title={''} width={'5%'} />
        </tr>
    );
};

export default MailboxesListHead;
