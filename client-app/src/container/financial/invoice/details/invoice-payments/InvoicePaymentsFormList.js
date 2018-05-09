import React from 'react';
import {connect} from 'react-redux';

import InvoicePaymentsFormItem from "./InvoicePaymentsFormItem";

const InvoicePaymentsFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-4">Datum betaald</div>
                <div className="col-sm-3">Bedrag</div>
                <div className="col-sm-4">Datum aangemaakt</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.payments.length > 0 ?
                    props.payments.map(payment => {
                        return <InvoicePaymentsFormItem
                            key={payment.id}
                            payment={payment}
                        />;
                    })
                    :
                    <div>Geen betalingen bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        payments: state.invoiceDetails.payments,
    };
};

export default connect(mapStateToProps)(InvoicePaymentsFormList);
