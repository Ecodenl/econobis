import React, { useContext, useEffect, useReducer } from 'react';
import { Row, Col, Container, Table, Card } from 'react-bootstrap';
import { PortalUserContext } from '../../context/PortalUserContext';
import ContactAPI from '../../api/contact/ContactAPI';
import LoadingView from '../../components/general/LoadingView';

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

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    return (
        <Container className={'content-section'}>
            {state.isLoading ? (
                <LoadingView />
            ) : (
                <Row>
                    {state.result.map(item => (
                        <Col xs={12} lg={6} className={'mb-3'}>
                            <Card>
                                <Card.Header className={'card-header_title'}>Informatie over {item.name}</Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Naam</strong>
                                                </td>
                                                <td>{item.name}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Adres</strong>
                                                </td>
                                                <td>{item.address}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Postcode / Plaats</strong>
                                                </td>
                                                <td>
                                                    {item.postalCode} {item.city}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Kvk</strong>
                                                </td>
                                                <td>{item.kvkNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Website</strong>
                                                </td>
                                                <td>http://energiedongen.nl</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>IBAN</strong>
                                                </td>
                                                <td>{item.iban}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>IBAN t.n.v.</strong>
                                                </td>
                                                <td>{item.ibanAttn}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>BTW nummer</strong>
                                                </td>
                                                <td>{item.btwNumber}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default AboutUs;
