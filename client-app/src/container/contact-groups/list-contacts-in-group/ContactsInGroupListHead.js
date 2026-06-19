import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const ContactsInGroupListHead = props => {
    return (
        <tr className="thead-title-quaternary">
            {props.isUsedInLaposta ? (
                <>
                    <DataTableHeadTitleAndSort
                        RowClassName={'hidden-xs'}
                        title={'#'}
                        width={'10%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'number'}
                    />
                    <DataTableHeadTitleAndSort
                        RowClassName={'hidden-xs hidden-sm'}
                        title={'Type'}
                        width={'10%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'typeName'}
                    />
                    <DataTableHeadTitleAndSort
                        title={'Naam'}
                        width={'25%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'fullName'}
                    />
                    <DataTableHeadTitleAndSort
                        RowClassName={'hidden-xs'}
                        title={'E-mail'}
                        width={'25%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'emailAddress'}
                    />
                    <DataTableHeadTitle RowClassName={'hidden-xs'} title={'Laposta status'} width={'10%'} />
                    <DataTableHeadTitle
                        RowClassName={'hidden-xs hidden-sm'}
                        title={'Toegevoegd aan groep op'}
                        width={'10%'}
                    />
                    <th width="10%" />
                </>
            ) : (
                <>
                    <DataTableHeadTitleAndSort
                        RowClassName={'hidden-xs'}
                        title={'#'}
                        width={'15%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'number'}
                    />
                    <DataTableHeadTitleAndSort
                        RowClassName={'hidden-xs hidden-sm'}
                        title={'Type'}
                        width={'15%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'typeName'}
                    />
                    <DataTableHeadTitleAndSort
                        title={'Naam'}
                        width={'30%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'fullName'}
                    />
                    <DataTableHeadTitleAndSort
                        RowClassName={'hidden-xs'}
                        title={'E-mail'}
                        width={'30%'}
                        setSorts={props.handleChangeSort}
                        sortColumn={'emailAddress'}
                    />
                    <DataTableHeadTitle
                        RowClassName={'hidden-xs hidden-sm'}
                        title={'Toegevoegd aan groep op'}
                        width={'10%'}
                    />
                    <th width="10%" />
                </>
            )}
        </tr>
    );
};

export default ContactsInGroupListHead;
