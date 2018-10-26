import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../../components/dataTable/DataTableHeadTitleAndSort';
import { setOrdersSortsFilter } from '../../../../actions/order/OrdersSortsActions';
import DataTableHeadTitle from "../../../../components/dataTable/DataTableHeadTitle";

const OrdersListHead = (props) => {
    const setSorts = (field, order) => {
        props.setOrdersSortsFilter(field, order);

        setTimeout(() => {
            props.fetchOrdersData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showSelectOrdersToCreate &&
            <th width="5%"></th>
            }
            <DataTableHeadTitleAndSort sortColumn={'number'} title={'Nummer'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'dateRequested'} title={'Datum'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'subject'} title={'Onderwerp'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'contact'} title={'Contact'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitle title={'Bedrag incl. BTW'} width={'15%'}/>
            <DataTableHeadTitleAndSort sortColumn={'paymentTypeId'} title={'Betaalwijze'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'statusId'} title={'Status'} width={'12%'} setSorts={setSorts} />
            <th width="9%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setOrdersSortsFilter: (field, order) => {
        dispatch(setOrdersSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(OrdersListHead);
