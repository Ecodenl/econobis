import React, { useState, useEffect, useRef } from 'react';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import LoadingView from '../../components/general/LoadingView';
import ContactDetailsPersonal from './Personal';
import ContactDetailsOrganisation from './Organisation';
import PortalSettingsAPI from '../../api/portal-settings/PortalSettingsAPI';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ContactDetails = function(props) {
    const [contact, setContact] = useState({});
    const [portalSettings, setPortalSettings] = useState({});
    const [isLoading, setLoading] = useState(true);
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);

    useEffect(() => {
        const keys =
            '?keys[]=portalName&keys[]=portalWebsite&keys[]=portalUrl&keys[]=backgroundColor&keys[]=responsibleUserId&keys[]=checkContactTaskResponsibleUserId&keys[]=linkPrivacyPolicy';
        PortalSettingsAPI.fetchPortalSettings(keys)
            .then(payload => {
                setPortalSettings({ ...payload.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });

        // Call Api if current selected contact id is filled
        if (props.currentSelectedContact.id) {
            // If there is no previous selected contact OR previous selected contact is not the same as current selected contact
            if (!prevCurrentSelectedContact || prevCurrentSelectedContact.id != props.currentSelectedContact.id) {
                callFetchContact();
            }
        }
    }, [props.currentSelectedContact]);

    function callFetchContact() {
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
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function handleSubmitContactValues(values, actions, switchToView) {
        const updatedContact = { ...contact, ...values };
        ContactAPI.updateContact(updatedContact)
            .then(payload => {
                callFetchContact();
                actions.setSubmitting(false);
                switchToView();
            })
            .catch(error => {
                actions.setSubmitting(false);
                alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
            });
    }

    return (
        <div className="content-section">
            {isLoading ? (
                <LoadingView />
            ) : (
                <div className="content-container w-container">
                    <ButtonGroup aria-label="Steps" className="float-left">
                        <Link to={`/inschrijven-projecten`}>
                            <Button className={'w-button'} size="sm">
                                Inschrijven projecten
                            </Button>
                        </Link>
                        &nbsp;
                        <Link to={`/inschrijvingen-projecten`}>
                            <Button className={'w-button'} size="sm">
                                Huidige deelnames
                            </Button>
                        </Link>
                    </ButtonGroup>
                    <p>&nbsp;</p>
                    <h1 className="content-heading">Contactgegevens</h1>
                    <div className="w-form" />
                    {/* If contact is person */}
                    {contact.typeId === 'person' ? (
                        <ContactDetailsPersonal
                            portalSettings={portalSettings}
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                        />
                    ) : null}
                    {/* If contact is organisation */}
                    {contact.typeId === 'organisation' ? (
                        <ContactDetailsOrganisation
                            portalSettings={portalSettings}
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                        />
                    ) : null}
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
