import React from 'react';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const FreeFieldsListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'tableName'}
                title={'Op onderdeel'}
                width={'33%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'fieldName'}
                title={'Vrije velden'}
                width={'33%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'fieldFormatName'}
                title={'Type'}
                width={'34%'}
                setSorts={props.handleChangeSort}
            />
        </tr>
    );
};

export default FreeFieldsListHead;
