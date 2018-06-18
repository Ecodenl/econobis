import React from 'react';
import {connect} from 'react-redux';

import DataTableHeadTitleAndSort from '../../../../components/dataTable/DataTableHeadTitleAndSort';
import {setPaymentInvoicesSortsFilter} from '../../../../actions/payment-invoice/PaymentInvoicesSortsActions';

const PaymentInvoicesListHead = (props) => {
    const setSorts = (field, order) => {
        props.setPaymentInvoicesSortsFilter(field, order);

        setTimeout(() => {
            props.fetchPaymentInvoicesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'number'} title={'Nummer'} width={'25%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'contact'} title={'Contact'} width={'25%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'payout'} title={'Bedrag'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'statusId'} title={'Status'} width={'25%'} setSorts={setSorts} />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setPaymentInvoicesSortsFilter: (field, order) => {
        dispatch(setPaymentInvoicesSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(PaymentInvoicesListHead);
