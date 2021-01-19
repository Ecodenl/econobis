import React, { useEffect, useReducer, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserContext } from '../../../context/PortalUserContext';

const INITIAL_STATE = {
    result: [],
    isLoading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateIsLoading':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'updateResult':
            return {
                ...state,
                result: action.payload,
            };
        default:
            return INITIAL_STATE;
    }
};

function AboutUs() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { currentSelectedContact } = useContext(PortalUserContext);

    useEffect(
        function() {
            if (currentSelectedContact.id) {
                ContactAPI.fetchContactRelatedAdministrations(currentSelectedContact.id)
                    .then(payload => {
                        dispatch({
                            type: 'updateResult',
                            payload: payload.data.data,
                        });
                        setIsLoading(false);
                    })
                    .catch(() => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setIsLoading(false);
                    });
            }
        },
        [currentSelectedContact.id]
    );

    function formatFullName(fullName) {
        if (fullName) {
            if (fullName.search(',') < 0) {
                return fullName;
            } else {
                const firstName = fullName.slice(fullName.search(',') + 2);
                const lastName = fullName.slice(0, fullName.search(','));
                return firstName + ' ' + lastName;
            }
        } else {
            return ' ';
        }
    }

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">
                        Overzicht organisaties waar <strong>{formatFullName(currentSelectedContact.fullName)}</strong>{' '}
                        een relatie mee heeft.
                    </h1>
                </Col>
            </Row>
            {state.isLoading ? (
                <Row>
                    <Col>
                        <LoadingView />
                    </Col>
                </Row>
            ) : state.result.length === 0 ? (
                <Row>
                    <Col>Geen informatie organisaties beschikbaar waar contact een relatie mee heeft.</Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col>
                            <p>Klik op de organisatie voor meer details.</p>
                        </Col>
                    </Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Adres</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.result.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <Link to={`/over-ons-organisatie/${item.id}`}>{item.name}</Link>
                                    </td>
                                    <td>
                                        {item.address}, {item.city}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

export default AboutUs;
