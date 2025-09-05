import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import ContactAPI from '../../../api/contact/ContactAPI';
import rebaseContact from '../../../helpers/RebaseContact';

function RegistrationList(props) {
    const [contact, setContact] = useState({});
    const [contactGroups, setContactGroups] = useState([]);
    const [contactContactGroups, setContactContactGroups] = useState([]); // Fix: use [] instead of {}
    const [isLoading, setLoading] = useState(true);
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);

    useEffect(() => {
        if (props.currentSelectedContact.id) {
            if (!prevCurrentSelectedContact || prevCurrentSelectedContact.id !== props.currentSelectedContact.id) {
                callFetchContactGroups();
                callFetchContact();
                callFetchContactContactGroups();
            }
        }
    }, [props.currentSelectedContact]);

    function callFetchContactGroups() {
        setLoading(true);
        ContactGroupAPI.fetchContactGroups()
            .then(payload => {
                setContactGroups(payload.data);
                setLoading(false);
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }

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

    function callFetchContactContactGroups() {
        setLoading(true);
        ContactAPI.fetchContactContactGroups(props.currentSelectedContact.id)
            .then(payload => {
                setContactContactGroups(Array.isArray(payload.data) ? payload.data : []);
                setLoading(false);
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }

    function changeContactContactGroup(contactGroupId, isChecked) {
        setLoading(true);
        ContactAPI.changeContactToContactGroup(props.currentSelectedContact.id, contactGroupId, isChecked)
            .then(payload => {
                callFetchContactContactGroups();
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
        setLoading(false);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                <Row>
                    <Col>
                        <h1 className="content-heading">
                            Groepen beheer van <strong>{contact.fullNameFnf}</strong>.
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {isLoading ? (
                            <LoadingView />
                        ) : contactGroups.length === 0 ? (
                            'Geen huidige groepen aanwezig.'
                        ) : (
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Groep</th>
                                    <th>Deelname</th>
                                </tr>
                                </thead>
                                <tbody>
                                {contactGroups.filter(cg =>
                                    !cg.closed &&
                                    cg.show_portal &&
                                    cg.edit_portal &&
                                    cg.type_id === 'static' &&
                                    (cg.date_finished === null || new Date(cg.date_finished) >= new Date()) &&
                                    (cg.date_started === null || new Date(cg.date_started) <= new Date())
                                ).map(contactGroup => {
                                    return (
                                        <tr key={contactGroup.id}>
                                            <td>{contactGroup.name}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={contactGroup.id}
                                                    checked={Array.isArray(contactContactGroups) && contactContactGroups.some(obj => obj.id === contactGroup.id)}
                                                    onChange={e => changeContactContactGroup(e.target.value, Array.isArray(contactContactGroups) && contactContactGroups.some(obj => obj.id === contactGroup.id))}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default function RegistrationListWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ currentSelectedContact }) => (
                <RegistrationList {...props} currentSelectedContact={currentSelectedContact} />
            )}
        </PortalUserConsumer>
    );
}
