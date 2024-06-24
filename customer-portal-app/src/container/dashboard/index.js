import React, { useEffect, useRef, useState } from 'react';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import LoadingView from '../../components/general/LoadingView';
import { Col, Row } from 'react-bootstrap';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import DashboardWidget from './widget';
import { ContactDetailsDashboardWidget, SwitchContactDashboardWidget } from './widget/default';
import DashboardSettingsAPI from '../../api/dashboard/DashboardSettingsAPI';
import { isEmpty } from 'lodash';

const Dashboard = function(props) {
    const [isLoading, setLoading] = useState(true);
    const [contact, setContact] = useState({});
    const [dashboardSettings, setDashboardSettings] = useState({});
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
                props.updateNameSelectedContact(
                    contactData.fullNameFnf,
                    contactData.typeId,
                    contactData.firstName,
                    contactData.lastNamePrefix,
                    contactData.lastName
                );
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            })
            .finally(() => callFetchDashboardSettings());
    }

    function callFetchDashboardSettings() {
        setLoading(true);
        // todo WM: check anders
        //
        const id = 1;
        DashboardSettingsAPI.fetchDashboardSettings(id, props.currentSelectedContact.id)
            .then(payload => {
                setDashboardSettings(payload.data.data);
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
                    <Row>
                        <Col>
                            {!isEmpty(dashboardSettings.welcomeTitle) ? (
                                <h1 className="content-heading mt-0 text-center">{dashboardSettings.welcomeTitle}</h1>
                            ) : null}
                            {!isEmpty(dashboardSettings.welcomeMessage) ? (
                                <p className={'text-center'} style={{ whiteSpace: 'break-spaces' }}>
                                    {dashboardSettings.welcomeMessage}
                                </p>
                            ) : null}
                        </Col>
                    </Row>
                    <Row>
                        {dashboardSettings.widgets
                            .filter(w => w.active)
                            .sort((a, b) => (a.order > b.order ? 1 : -1))
                            .map(widget => (
                                <Col xl={4} md={6}>
                                    <DashboardWidget
                                        id={widget.codeRef}
                                        image={widget.widgetImageFileName}
                                        title={widget.title}
                                        text={widget.text}
                                        buttonText={widget.buttonText}
                                        buttonLink={widget.buttonLink}
                                        backgroundColorUsed={widget.backgroundColorUsed}
                                        textColorUsed={widget.textColorUsed}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Row>
                        <Col md={6}>
                            <ContactDetailsDashboardWidget
                                contact={contact}
                                backgroundColorUsed={dashboardSettings.defaultWidgetBackgroundColor}
                                textColorUsed={dashboardSettings.defaultWidgetTextColor}
                            />
                        </Col>
                        <PortalUserConsumer>
                            {({ user, currentSelectedContact, switchCurrentContact }) => {
                                if (user.occupationsActive && user.occupationsActive.length > 0) {
                                    return (
                                        <Col md={6}>
                                            <SwitchContactDashboardWidget
                                                user={user}
                                                currentSelectedContact={currentSelectedContact}
                                                switchCurrentContact={switchCurrentContact}
                                                backgroundColorUsed={dashboardSettings.defaultWidgetBackgroundColor}
                                                textColorUsed={dashboardSettings.defaultWidgetTextColor}
                                            />
                                        </Col>
                                    );
                                }
                            }}
                        </PortalUserConsumer>
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
                <>
                    {user.id > 0 && (
                        <Dashboard
                            {...props}
                            user={user}
                            currentSelectedContact={currentSelectedContact}
                            updateNameSelectedContact={updateNameSelectedContact}
                        />
                    )}
                </>
            )}
        </PortalUserConsumer>
    );
}
