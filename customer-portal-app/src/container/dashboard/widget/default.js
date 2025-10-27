import { Button, Card } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

export const ContactDetailsDashboardWidget = function({ contact, backgroundColorUsed, textColorUsed }) {
    const history = useHistory();
    const key = 'widget-' + 'contact-details';

    const typeContact = contact.typeId ? contact.typeId : null;

    return (
        <Card
            key={key}
            id={key}
            style={{ marginTop: '30px', backgroundColor: backgroundColorUsed, color: textColorUsed }}
        >
            <div className="card-body">
                <h5 className="card-title">{contact.fullNameFnf}</h5>
                <div className="card-text">
                    {typeContact === 'person' ? (
                        <>
                            {contact.primaryAddress !== undefined ? (
                                <div>
                                    <b>Adres</b>
                                    <br />
                                    {contact.primaryAddress.street} {contact.primaryAddress.number} {contact.primaryAddress.addition}
                                    <br />
                                    {contact.primaryAddress.postalCode} {contact.primaryAddress.city},{' '}
                                    {contact.primaryAddress.country ? contact.primaryAddress.country.name : ''}
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : null}
                    {typeContact === 'organisation' ? (
                        <>
                            {contact.visitAddress !== undefined ? (
                                <div>
                                    <b>Bezoekadres</b>
                                    <br />
                                    {contact.visitAddress.street} {contact.visitAddress.number} {contact.visitAddress.addition}
                                    <br />
                                    {contact.visitAddress.postalCode} {contact.visitAddress.city},{' '}
                                    {contact.visitAddress.country ? contact.visitAddress.country.name : ''}
                                </div>
                            ) : (
                                <></>
                            )}
                            {contact.postalAddress !== undefined &&
                            contact.postalAddress &&
                            !isEmpty(contact.postalAddress.postalCode) ? (
                                <div>
                                    <b>Postadres</b>
                                    <br />
                                    {contact.postalAddress.street} {contact.postalAddress.number} {contact.postalAddress.addition}
                                    <br />
                                    {contact.postalAddress.postalCode} {contact.postalAddress.city},{' '}
                                    {contact.postalAddress.country ? contact.postalAddress.country.name : ''}
                                </div>
                            ) : (
                                <></>
                            )}
                            {contact.invoiceAddress !== undefined &&
                            contact.invoiceAddress &&
                            !isEmpty(contact.invoiceAddress.postalCode) ? (
                                <div>
                                    <b>Nota adres</b>
                                    <br />
                                    {contact.invoiceAddress.street} {contact.invoiceAddress.number} {contact.invoiceAddress.addition}
                                    <br />
                                    {contact.invoiceAddress.postalCode} {contact.invoiceAddress.city},{' '}
                                    {contact.invoiceAddress.country ? contact.invoiceAddress.country.name : ''}
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : null}

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
                <button className="w-button btn btn-primary btn-sm" onClick={() => history.push('/gegevens')}>
                    Gegevens beheren
                </button>
            </div>
        </Card>
    );
};

export const SwitchContactDashboardWidget = function({
    user,
    currentSelectedContact,
    switchCurrentContact,
    backgroundColorUsed,
    textColorUsed,
}) {
    const history = useHistory();
    const key = 'widget-' + 'switch-contact';

    return (
        <Card
            key={key}
            id={key}
            style={{ marginTop: '30px', backgroundColor: backgroundColorUsed, color: textColorUsed }}
        >
            <div className="card-body">
                <h5 className="card-title">Wissel van contact</h5>
                <div
                    className="card-text"
                    style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}
                >
                    {user.occupationsActive && user.occupationsActive.length > 0 ? (
                        <>
                            <Button
                                className="w-button btn btn-primary btn-sm"
                                key={'user-' + user.id}
                                id={'user-' + user.id}
                                onClick={() => {
                                    switchCurrentContact(user);
                                }}
                                disabled={currentSelectedContact.id === user.id}
                                style={{ margin: '5px' }}
                            >
                                {user.fullNameFnf}
                            </Button>
                            {user.occupationsActive.map(occupationContact =>
                                occupationContact.allowManageInPortal ? (
                                    <Button
                                        className="w-button btn btn-primary btn-sm"
                                        key={'user-' + occupationContact.primaryContact.id}
                                        id={'user-' + occupationContact.primaryContact.id}
                                        onClick={() => {
                                            switchCurrentContact(occupationContact.primaryContact);
                                        }}
                                        disabled={currentSelectedContact.id === occupationContact.primaryContact.id}
                                        style={{ margin: '5px' }}
                                    >
                                        {occupationContact.primaryContact.fullNameFnf}
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
