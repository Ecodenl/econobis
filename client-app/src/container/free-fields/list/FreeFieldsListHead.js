import React from 'react';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const FreeFieldsListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'tableName'}
                title={'Op onderdeel'}
                width={'25%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'fieldName'}
                title={'Vrije velden'}
                width={'35%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'fieldFormatName'}
                title={'Type'}
                width={'35%'}
                setSorts={props.handleChangeSort}
            />
            <th width={'5%'} />
        </tr>
    );
};

export default FreeFieldsListHead;
