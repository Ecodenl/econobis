import React from 'react';
import { connect } from 'react-redux';

import InvoiceMolliePaymentsFormItem from './InvoiceMolliePaymentsFormItem';

const InvoiceMolliePaymentsFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-4">Transactie referentie</div>
                <div className="col-sm-4">Aanvraag gedaan op</div>
                <div className="col-sm-4">Betaald op</div>
            </div>
            {props.molliePayments.length > 0 ? (
                props.molliePayments.map(molliePayment => {
                    return <InvoiceMolliePaymentsFormItem key={molliePayment.id} molliePayment={molliePayment} />;
                })
            ) : (
                <div>Geen online betalingstransacties bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        molliePayments: state.invoiceDetails.molliePayments,
    };
};

export default connect(mapStateToProps)(InvoiceMolliePaymentsFormList);
