import React from 'react';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const PortalFreeFieldsPageListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'name'}
                title={'Naam'}
                width={'95%'}
                setSorts={props.handleChangeSort}
            />
            <th width={'5%'} />
        </tr>
    );
};

export default PortalFreeFieldsPageListHead;
