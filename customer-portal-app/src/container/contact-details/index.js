import React, { useState, useEffect, useRef } from 'react';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import LoadingView from '../../components/general/LoadingView';
import ContactDetailsPersonal from './Personal';
import ContactDetailsOrganisation from './Organisation';
import PortalSettingsAPI from '../../api/portal-settings/PortalSettingsAPI';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const ContactDetails = function(props) {
    const [contact, setContact] = useState({});
    const [portalSettings, setPortalSettings] = useState({});
    const [isLoading, setLoading] = useState(true);
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);
    const [editForm, setEditForm] = useState(false);

    useEffect(() => {
        const keys =
            '?keys[]=portalName' +
            '&keys[]=portalWebsite' +
            '&keys[]=portalUrl' +
            '&keys[]=responsibleUserId' +
            '&keys[]=checkContactTaskResponsibleUserId' +
            '&keys[]=linkPrivacyPolicy' +
            '&keys[]=pcrPowerKwhConsumptionPercentage' +
            '&keys[]=pcrGeneratingCapacityOneSolorPanel';
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

        function doSetContact(contactData) {
            setContact(contactData);
            props.updateNameSelectedContact(
                contactData.fullNameFnf,
                contactData.typeId,
                contactData.firstName,
                contactData.lastNamePrefix,
                contactData.lastName
            );
        }

        axios
            .all([
                ContactAPI.fetchContact(props.currentSelectedContact.id),
                ContactAPI.fetchContactFreeFields(props.currentSelectedContact.id),
            ])
            .then(
                axios.spread((payloadContact, payloadContactFreeFields) => {
                    let contactData = rebaseContact(payloadContact.data.data, true);
                    contactData.freeFieldsFieldRecords = payloadContactFreeFields.data;

                    const typeContact = contactData.typeId ? contactData.typeId : null;
                    switch (typeContact) {
                        case 'person':
                            if (contactData.primaryAddress.id) {
                                ContactAPI.fetchAddressFreeFields(contactData.primaryAddress.id)
                                    .then(payload => {
                                        contactData.primaryAddress.freeFieldsFieldRecords = payload.data;
                                        doSetContact(contactData);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            }
                            break;
                        case 'organisation':
                            axios
                                .all([
                                    contactData.visitAddress.id
                                        ? ContactAPI.fetchAddressFreeFields(contactData.visitAddress.id)
                                        : null,
                                    contactData.postalAddress.id
                                        ? ContactAPI.fetchAddressFreeFields(contactData.postalAddress.id)
                                        : null,
                                    contactData.invoiceAddress.id
                                        ? ContactAPI.fetchAddressFreeFields(contactData.invoiceAddress.id)
                                        : null,
                                ])
                                .then(
                                    axios.spread(
                                        (payloadVisitAddressFF, payloadPostalAddressFF, payloadInvoiceAddressFF) => {
                                            if (payloadVisitAddressFF) {
                                                contactData.visitAddress.freeFieldsFieldRecords =
                                                    payloadVisitAddressFF.data;
                                            }
                                            if (payloadPostalAddressFF) {
                                                contactData.postalAddress.freeFieldsFieldRecords =
                                                    payloadPostalAddressFF.data;
                                            }
                                            if (payloadInvoiceAddressFF) {
                                                contactData.invoiceAddress.freeFieldsFieldRecords =
                                                    payloadInvoiceAddressFF.data;
                                            }
                                            doSetContact(contactData);
                                        }
                                    )
                                )
                                .catch(error => {
                                    console.log(error);
                                });

                        default:
                            doSetContact(contactData);
                            break;
                    }

                    setLoading(false);
                })
            )
            .catch(error => {
                // console.log(error);
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
        const updatedContact = { ...contact, ...values, projectId: null };
        ContactAPI.updateContact(updatedContact)
            .then(payload => {
                callFetchContact();
                actions.setSubmitting(false);
                switchToView();
            })
            .catch(error => {
                actions.setSubmitting(false);
                actions.setStatus({
                    message: error.response.data.message,
                });
                // alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
            });
    }

    const editButtonGroup = (
        <ButtonGroup aria-label="contact-details" className={'float-right'}>
            <Button
                className={'w-button'}
                size="sm"
                onClick={function() {
                    setEditForm(true);
                }}
            >
                Wijzig
            </Button>
        </ButtonGroup>
    );

    return (
        <div className="content-section">
            {isLoading ? (
                <LoadingView />
            ) : (
                <div className="content-container w-container">
                    {editForm ? (
                        <Row>
                            <Col>
                                <h1 className="content-heading mt-0">Contactgegevens</h1>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <h1 className="content-heading mt-0">Contactgegevens</h1>
                            </Col>
                            <Col>{editButtonGroup}</Col>
                        </Row>
                    )}
                    <div className="w-form" />
                    {/* If contact is person */}
                    {contact.typeId === 'person' ? (
                        <ContactDetailsPersonal
                            portalSettings={portalSettings}
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                            editButtonGroup={editButtonGroup}
                            editForm={editForm}
                            setEditForm={setEditForm}
                        />
                    ) : null}
                    {/* If contact is organisation */}
                    {contact.typeId === 'organisation' ? (
                        <ContactDetailsOrganisation
                            portalSettings={portalSettings}
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                            editButtonGroup={editButtonGroup}
                            editForm={editForm}
                            setEditForm={setEditForm}
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
            {({ currentSelectedContact, updateNameSelectedContact }) => (
                <ContactDetails
                    {...props}
                    currentSelectedContact={currentSelectedContact}
                    updateNameSelectedContact={updateNameSelectedContact}
                />
            )}
        </PortalUserConsumer>
    );
}
