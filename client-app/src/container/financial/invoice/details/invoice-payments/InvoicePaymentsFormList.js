import React from 'react';
import { connect } from 'react-redux';

import InvoicePaymentsFormItem from './InvoicePaymentsFormItem';

const InvoicePaymentsFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Datum betaald</div>
                <div className="col-sm-2">Bedrag</div>
                <div className="col-sm-3">Betalingskenmerk</div>
                <div className="col-sm-3">Datum aangemaakt</div>
                <div className="col-sm-1" />
            </div>
            {props.payments.length > 0 ? (
                props.payments.map(payment => {
                    return <InvoicePaymentsFormItem key={payment.id} payment={payment} />;
                })
            ) : (
                <div>Geen betalingen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        payments: state.invoiceDetails.payments,
    };
};

export default connect(mapStateToProps)(InvoicePaymentsFormList);
