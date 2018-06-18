import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    setContactFilterPaymentInvoices, setNumberFilterPaymentInvoices,
    setStatusIdFilterPaymentInvoices, setPayoutFilterPaymentInvoices
} from '../../../../actions/payment-invoice/PaymentInvoicesFiltersActions';

const PaymentInvoicesListFilter = props => {
    const onNumberChange = (e) => {
        props.setNumberFilterPaymentInvoices(e.target.value);
    };

    const onContactChange = (e) => {
        props.setContactFilterPaymentInvoices(e.target.value);
    };

    const onPayoutChange = (e) => {
        props.setAmountFilterPaymentInvoices(e.target.value);
    };

    const onStatusIdChange = (e) => {
        props.setStatusIdFilterPaymentInvoices(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th><input type="text" className="form-control input-sm" value={ props.filters.number.data} onChange={onNumberChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.contact.data} onChange={onContactChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.payout.data} onChange={onPayoutChange} /></th>
            <th>
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusIdChange}>
                    <option/>
                    {
                        props.paymentInvoiceStatuses.map((paymentInvoiceStatus) => {
                            return <option key={paymentInvoiceStatus.id } value={ paymentInvoiceStatus.id }>{ paymentInvoiceStatus.name }</option>
                        })
                    }
                </select>
            </th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.paymentInvoices.filters,
    paymentInvoiceStatuses: state.systemData.paymentInvoiceStatuses,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setStatusIdFilterPaymentInvoices,
        setContactFilterPaymentInvoices,
        setNumberFilterPaymentInvoices,
        setPayoutFilterPaymentInvoices
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInvoicesListFilter);