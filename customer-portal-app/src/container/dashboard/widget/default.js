import { Button, Card } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export const ContactDetailsDashboardWidget = function({ contact }) {
    const history = useHistory();
    const key = 'widget-' + 'contact-details';

    return (
        <Card key={key} id={key}>
            <div className="card-body">
                <h5 className="card-title">{contact.fullName}</h5>
                <div className="card-text">
                    {contact.primaryAddress !== undefined ? (
                        <div>
                            <b>Adres</b>
                            <br />
                            {contact.primaryAddress.street} {contact.primaryAddress.number}
                            <br />
                            {contact.primaryAddress.postalCode} {contact.primaryAddress.city},{' '}
                            {contact.primaryAddress.country.name}
                        </div>
                    ) : (
                        <></>
                    )}
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

export const SwitchContactDashboardWidget = function({ user, currentSelectedContact, switchCurrentContact }) {
    const history = useHistory();
    const key = 'widget-' + 'switch-contact';

    return (
        <Card key={key} id={key}>
            <div className="card-body">
                <h5 className="card-title">Wissel van contact</h5>
                <div
                    className="card-text"
                    style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}
                >
                    {user.occupations && user.occupations.length > 0 ? (
                        <>
                            <Button
                                onClick={() => {
                                    switchCurrentContact(user);
                                }}
                                disabled={currentSelectedContact.id === user.id}
                                style={{ margin: '5px' }}
                            >
                                {user.fullName}
                            </Button>
                            {user.occupations.map(occupationContact =>
                                (occupationContact.primaryContact.typeId === 'organisation' &&
                                    occupationContact.primary) ||
                                (occupationContact.primaryContact.typeId === 'person' &&
                                    occupationContact.occupation.occupationForPortal) ? (
                                    <Button
                                        onClick={() => {
                                            switchCurrentContact(occupationContact.primaryContact);
                                        }}
                                        disabled={currentSelectedContact.id === occupationContact.primaryContact.id}
                                        style={{ margin: '5px' }}
                                    >
                                        {occupationContact.primaryContact.fullName}
                                    </Button>
                                ) : null
                            )}
                        </>
                    ) : null}
                </div>
            </div>
        </Card>
    );
};
