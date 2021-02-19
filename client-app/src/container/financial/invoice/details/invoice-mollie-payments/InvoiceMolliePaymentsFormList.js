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
            {props.molliePayment && props.molliePayment.mollieId ? ( // Als er nog geen mollie_id is, is er nog geen "echte" mollie transactie. Dan niet weergeven.
                <InvoiceMolliePaymentsFormItem molliePayment={props.molliePayment} />
            ) : (
                <div>Geen online betalingstransacties bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        molliePayment: state.invoiceDetails.molliePayment,
    };
};

export default connect(mapStateToProps)(InvoiceMolliePaymentsFormList);
