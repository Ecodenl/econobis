import React from 'react';
import moment from 'moment/moment';

moment.locale('nl');

const InvoiceMolliePaymentsFormView = props => {
    const { mollieId, createdAt, datePaid, dateActivated, iban, ibanName } = props.molliePayment;

    return (
        <div
            className={`row border`}
        >
            <div>
                <div className="col-sm-2">{mollieId}</div>
                <div className="col-sm-2">{dateActivated ? moment(dateActivated).format('L HH:mm') : ''}</div>
                <div className="col-sm-2">{datePaid ? moment(datePaid).format('L HH:mm') : ''}</div>
                <div className="col-sm-3">{iban}</div>
                <div className="col-sm-3">{ibanName}</div>
            </div>
        </div>
    );
};

export default InvoiceMolliePaymentsFormView;
