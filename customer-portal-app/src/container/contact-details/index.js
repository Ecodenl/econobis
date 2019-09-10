import React, { useState, useEffect, useRef } from 'react';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import LoadingView from '../../components/general/LoadingView';
import ContactDetailsPersonal from './Personal';

const ContactDetails = function(props) {
    const [contact, setContact] = useState({});
    const [isLoading, setLoading] = useState(true);
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);

    useEffect(() => {
        // Call Api if current selected contact id is filled
        if (props.currentSelectedContact.id) {
            // If there is no previous selected contact OR previous selected contact is not the same as current selected contact
            if (!prevCurrentSelectedContact || prevCurrentSelectedContact.id != props.currentSelectedContact.id) {
                (function callFetchContact() {
                    setLoading(true);
                    ContactAPI.fetchContact(props.currentSelectedContact.id)
                        .then(payload => {
                            const contactData = rebaseContact(payload.data.data);

                            setContact(contactData);
                            setLoading(false);
                        })
                        .catch(error => {
                            alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                            setLoading(false);
                        });
                })();
            }
        }
    }, [props.currentSelectedContact]);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function handleSubmitContactValues(values, actions, switchToView) {
        // TODO Do Api request to update contact values
        setContact({ ...contact, ...values });
        actions.setSubmitting(false);
        switchToView();
    }

    return (
        <div className="content-section">
            {isLoading ? (
                <LoadingView />
            ) : (
                <div className="content-container w-container">
                    <h1 className="content-heading">Contactgegevens</h1>
                    <div className="w-form" />
                    {/* If contact is person */}
                    {contact.typeId === 'person' ? (
                        <ContactDetailsPersonal
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                        />
                    ) : null}
                    {/* If contact is organisation */}
                    {contact.typeId === 'organisation' ? <div>{contact.fullName}</div> : null}
                </div>
            )}
        </div>
    );
};

export default function ContactDetailsWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ currentSelectedContact }) => (
                <ContactDetails {...props} currentSelectedContact={currentSelectedContact} />
            )}
        </PortalUserConsumer>
    );
}
