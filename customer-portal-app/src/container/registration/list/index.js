import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

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
        <div className={'content-section'}>
            <div className="content-container w-container">
                <Row>
                    <Col>
                        <h1 className="content-heading">
                            De projecten waarin <strong>{contact.fullNameFnf}</strong> deelneemt.
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {isLoading ? (
                            <LoadingView />
                        ) : contact.participations.length === 0 ? (
                            'Geen huidige deelnames aanwezig.'
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Organisatie</th>
                                        <th>Project</th>
                                        <th>Deelname</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contact.participations.map(participation => {
                                        if (
                                            !participation.project.dateEnd ||
                                            moment(participation.project.dateEnd).format('YYYY-MM-DD') >=
                                                moment().format('YYYY-MM-DD')
                                        ) {
                                            return (
                                                <tr key={participation.id}>
                                                    <td>{participation.project.administration.name}</td>
                                                    <td>
                                                        <Link to={`/project-deelname/${participation.id}`}>
                                                            {participation.project.name}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {participation.project.projectType.codeRef == 'loan' ? (
                                                            <>
                                                                {participation.amountInteressed != 0 ? (
                                                                    <span>
                                                                        Lening{' '}
                                                                        {MoneyPresenter(participation.amountInteressed)}{' '}
                                                                        <em>(Interesse)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.amountOptioned != 0 ? (
                                                                    <span>
                                                                        Lening{' '}
                                                                        {MoneyPresenter(participation.amountOptioned)}{' '}
                                                                        <em>(Ingeschreven)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.amountGranted != 0 ? (
                                                                    <span>
                                                                        Lening{' '}
                                                                        {MoneyPresenter(participation.amountGranted)}{' '}
                                                                        <em>(Toegekend)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.amountDefinitive != 0 ? (
                                                                    <span>
                                                                        Lening{' '}
                                                                        {MoneyPresenter(participation.amountDefinitive)}{' '}
                                                                        <em>(Definitief)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}

                                                        {participation.project.projectType.codeRef == 'obligation' ? (
                                                            <>
                                                                {participation.participationsInteressed != 0 ? (
                                                                    <span>
                                                                        {participation.participationsInteressed}
                                                                        {' obligaties '} <em> (Interesse)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsOptioned != 0 ? (
                                                                    <span>
                                                                        {participation.participationsOptioned}
                                                                        {' obligaties '} <em>(Ingeschreven)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsGranted != 0 ? (
                                                                    <span>
                                                                        {participation.participationsGranted}
                                                                        {' obligaties '} <em>(Toegekend)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsDefinitive != 0 ? (
                                                                    <span>
                                                                        {participation.participationsDefinitive}
                                                                        {' obligaties '}
                                                                        <em>(Definitief)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}

                                                        {participation.project.projectType.codeRef == 'capital' ? (
                                                            <>
                                                                {participation.participationsInteressed != 0 ? (
                                                                    <span>
                                                                        {participation.participationsInteressed}
                                                                        {' participaties '} <em>(Interesse)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsOptioned != 0 ? (
                                                                    <span>
                                                                        {participation.participationsOptioned}
                                                                        {' participaties '} <em>(Ingeschreven)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsGranted != 0 ? (
                                                                    <span>
                                                                        {participation.participationsGranted}
                                                                        {' participaties '} <em>(Toegekend)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsDefinitive != 0 ? (
                                                                    <span>
                                                                        {participation.participationsDefinitive}
                                                                        {' participaties '} <em>(Definitief)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}

                                                        {participation.project.projectType.codeRef ==
                                                        'postalcode_link_capital' ? (
                                                            <>
                                                                {participation.participationsInteressed != 0 ? (
                                                                    <span>
                                                                        {participation.participationsInteressed}
                                                                        {' participaties '} <em>(Interesse)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsOptioned != 0 ? (
                                                                    <span>
                                                                        {participation.participationsOptioned}
                                                                        {' participaties '} <em>(Ingeschreven)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsGranted != 0 ? (
                                                                    <span>
                                                                        {participation.participationsGranted}
                                                                        {' participaties '} <em>(Toegekend)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {participation.participationsDefinitive != 0 ? (
                                                                    <span>
                                                                        {participation.participationsDefinitive}
                                                                        {' participaties '} <em>(Definitief)</em>
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
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
