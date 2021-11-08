import { Card } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const ContactDetailsDashboardWidget = function({ contact }) {
    const history = useHistory();
    const key = 'widget-' + 'contact-details';

    return (
        <Card key={key} id={key}>
            <div className="card-body">
                <h5 className="card-title">{contact.fullName}</h5>
                <div className="card-text">
                    <div>
                        <b>Adres</b>
                        <br />
                        {contact.primaryAddress.street} {contact.primaryAddress.number}
                        <br />
                        {contact.primaryAddress.postalCode} {contact.primaryAddress.city},{' '}
                        {contact.primaryAddress.country.name}
                    </div>
                    <div>
                        <br />
                        <b>Telefoon</b>
                        <br />
                        {contact.phoneNumberPrimary.number}
                    </div>
                    <div>
                        <br />
                        <b>E-mail</b>
                        <br />
                        {contact.emailCorrespondence.email}
                    </div>
                </div>
                <br />
                <button className="btn btn-primary btn-sm" onClick={() => history.push('/gegevens')}>
                    Gegevens beheren
                </button>
            </div>
        </Card>
    );
};
