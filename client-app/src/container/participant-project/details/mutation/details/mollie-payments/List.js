import React from 'react';
import moment from 'moment/moment';

const ParticipantDetailsMutationMolliePaymentsList = ({ molliePayments }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Transactie referentie</div>
                <div className="col-sm-2">Aanvraag gedaan op</div>
                <div className="col-sm-2">Betaald op</div>
                <div className="col-sm-3">Iban</div>
                <div className="col-sm-3">Rekeninghouder</div>
            </div>
            {molliePayments.map(molliePayment => (
                <div className="row border">
                    <div className="col-sm-2">{molliePayment.mollieId}</div>
                    <div className="col-sm-2">{molliePayment.dateActivated ? moment(molliePayment.dateActivated).format('L HH:mm') : ''}</div>
                    <div className="col-sm-2">{molliePayment.datePaid ? moment(molliePayment.datePaid).format('L HH:mm') : ''}</div>
                    <div className="col-sm-3">{molliePayment.iban}</div>
                    <div className="col-sm-3">{molliePayment.ibanName}</div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantDetailsMutationMolliePaymentsList;
