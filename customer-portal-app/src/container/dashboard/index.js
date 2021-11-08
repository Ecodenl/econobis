import React, { useEffect, useRef, useState } from 'react';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import LoadingView from '../../components/general/LoadingView';
import { Col, Row } from 'react-bootstrap';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import DashboardWidget from './widget';
import { ContactDetailsDashboardWidget } from './widget/default';

const Dashboard = function(props) {
    const [isLoading, setLoading] = useState(true);
    const [contact, setContact] = useState({});
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);

    useEffect(() => {
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
                props.updateNameSelectedContact(contactData.fullName);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
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

    return (
        <div className="content-section">
            {isLoading ? (
                <LoadingView />
            ) : (
                <div className="content-container w-container">
                    <h1 className="content-heading mt-0 text-center">Welkom op jouw energieportaal</h1>
                    <p className={'text-center'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque facilis fugit incidunt
                        inventore iste labore magni modi molestias nemo nisi numquam, porro quaerat recusandae suscipit
                        tenetur unde ut, vel.
                    </p>
                    <Row>
                        <Col md={6}>
                            <DashboardWidget
                                id={'project-schrijf-je-in'}
                                image={'images/page-head5.jpg'}
                                title={'Schrijf je in'}
                                text={
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ex harum in\n' +
                                    '                                        incidunt ipsam minus nam, nisi nobis numquam quasi quidem repudiandae sed sint\n' +
                                    '                                        tempora voluptates? Adipisci dolores nesciunt tempore.'
                                }
                                buttonText={'Lees meer'}
                                buttonLink={'/'}
                            />
                        </Col>
                        <Col md={6}>
                            <DashboardWidget
                                id={'over-ons'}
                                image={'images/page-head5.jpg'}
                                title={'Over ons'}
                                text={
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ex harum in\n' +
                                    '                                        incidunt ipsam minus nam, nisi nobis numquam quasi quidem repudiandae sed sint\n' +
                                    '                                        tempora voluptates? Adipisci dolores nesciunt tempore.'
                                }
                                buttonText={'Lees meer'}
                                buttonLink={'/'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <ContactDetailsDashboardWidget contact={contact} />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default function DashboardWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ user, currentSelectedContact, updateNameSelectedContact }) => (
                <Dashboard
                    {...props}
                    user={user}
                    currentSelectedContact={currentSelectedContact}
                    updateNameSelectedContact={updateNameSelectedContact}
                />
            )}
        </PortalUserConsumer>
    );
}
