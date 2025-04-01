import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const PortalFreeFieldsPageListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'name'}
                title={'Naam'}
                width={'70%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'Actief'} width={'25%'} />
            <th width={'5%'} />
        </tr>
    );
};

export default PortalFreeFieldsPageListHead;
