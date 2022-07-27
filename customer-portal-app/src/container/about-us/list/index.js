import React, { useEffect, useReducer, useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Redirect } from 'react-router-dom';
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
    const [hasSingleRelatedAdministration, setHasSingleRelatedAdministration] = useState(false);

    useEffect(
        function() {
            if (currentSelectedContact.id) {
                if (currentSelectedContact.singleRelatedAdministration) {
                    setIsLoading(false);
                    setHasSingleRelatedAdministration(true);
                } else {
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
            }
        },
        [currentSelectedContact.id]
    );

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    return (
        <>
            {hasSingleRelatedAdministration ? (
                <Redirect to={`/over-ons-organisatie/${currentSelectedContact.singleRelatedAdministration}`} />
            ) : (
                <Container className={'content-section'}>
                    <Row>
                        <Col>
                            <h1 className="content-heading">
                                Overzicht organisaties waar <strong>{currentSelectedContact.fullNameFnf}</strong> een
                                relatie mee heeft.
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
            )}
        </>
    );
}

export default AboutUs;
