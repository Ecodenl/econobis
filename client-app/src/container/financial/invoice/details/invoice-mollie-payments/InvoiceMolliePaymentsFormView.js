import React from 'react';
import moment from 'moment/moment';

moment.locale('nl');

const InvoiceMolliePaymentsFormView = props => {
    const { mollieId, createdAt, datePaid, dateActivated } = props.molliePayment;

    return (
        <div
            className={`row border`}
        >
            <div>
                <div className="col-sm-4">{mollieId}</div>
                <div className="col-sm-4">{dateActivated ? moment(dateActivated).format('L HH:mm') : ''}</div>
                <div className="col-sm-4">{datePaid ? moment(datePaid).format('L HH:mm') : ''}</div>
            </div>
        </div>
    );
};

export default InvoiceMolliePaymentsFormView;
