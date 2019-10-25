import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

function RegistrationList(props) {
    const [contact, setContact] = useState({});
    const [isLoading, setLoading] = useState(true);
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
        ContactAPI.fetchContactWithParticipants(props.currentSelectedContact.id)
            .then(payload => {
                setContact(payload.data.data);
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

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Inschrijvingen</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isLoading ? (
                        <LoadingView />
                    ) : contact.length === 0 ? (
                        'Nog geen inschrijvingen.'
                    ) : (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Aantal Deelname</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact.participations.map(participation => (
                                    <tr key={participation.id}>
                                        <td>{participation.project.name}</td>
                                        <td>
                                            {participation.project.projectType.codeRef == 'loan' ? (
                                                <>
                                                    {participation.amountInteressed != 0 ? (
                                                        <span>
                                                            {MoneyPresenter(participation.amountInteressed)}{' '}
                                                            <em>(Interesse)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {participation.amountOptioned != 0 ? (
                                                        <span>
                                                            {MoneyPresenter(participation.amountOptioned)}{' '}
                                                            <em>(Ingeschreven)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {participation.amountGranted != 0 ? (
                                                        <span>
                                                            {MoneyPresenter(participation.amountGranted)}{' '}
                                                            <em>(Toegewezen)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {participation.amountDefinitive != 0 ? (
                                                        <span>
                                                            {MoneyPresenter(participation.amountDefinitive)}{' '}
                                                            <em>(Definitief)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {participation.participationsInteressed != 0 ? (
                                                        <span>
                                                            {participation.participationsInteressed}{' '}
                                                            <em>(Interesse)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {participation.participationsOptioned != 0 ? (
                                                        <span>
                                                            {participation.participationsOptioned}{' '}
                                                            <em>(Ingeschreven)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {participation.participationsGranted != 0 ? (
                                                        <span>
                                                            {participation.participationsGranted} <em>(Toegewezen)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {participation.participationsDefinitive != 0 ? (
                                                        <span>
                                                            {participation.participationsDefinitive}{' '}
                                                            <em>(Definitief)</em>
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
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
