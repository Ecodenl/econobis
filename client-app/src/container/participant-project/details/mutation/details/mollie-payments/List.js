import React from 'react';
import moment from 'moment/moment';

const ParticipantDetailsMutationMolliePaymentsList = ({ molliePayments }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Transactie referentie</div>
                <div className="col-sm-3">Aanvraag gedaan op</div>
                <div className="col-sm-3">Betaald op</div>
                <div className="col-sm-3">Iban</div>
            </div>
            {molliePayments.map(molliePayment => (
                <div className="row border">
                    <div className="col-sm-3">{molliePayment.mollieId}</div>
                    <div className="col-sm-3">{molliePayment.dateActivated ? moment(molliePayment.dateActivated).format('L HH:mm') : ''}</div>
                    <div className="col-sm-3">{molliePayment.datePaid ? moment(molliePayment.datePaid).format('L HH:mm') : ''}</div>
                    <div className="col-sm-3">{molliePayment.iban}</div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantDetailsMutationMolliePaymentsList;
