import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import { PortalUserContext } from '../../../context/PortalUserContext';
import { Card, Table } from 'react-bootstrap';
import AdministrationAPI from '../../../api/administration/AdministrationAPI';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function AboutUsAdministration({ match }) {
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [administration, setAdministration] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function callFetchAdministration() {
                setLoading(true);
                console.log(match);
                AdministrationAPI.fetchAdministration(match.params.id)
                    .then(payload => {
                        setAdministration(payload.data.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [match, currentSelectedContact]);

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <Row>
                        <ButtonGroup aria-label="Steps" className="float-left">
                            <Link to={`/over-ons`}>
                                <Button className={'w-button'} size="sm">
                                    Over ons
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </Row>
                    <Row className={'justify-content-center align-content-center flex-wrap'}>
                        <Col xs={12} lg={6} className={'mb-3'}>
                            <Card>
                                <Card.Header className={'card-header_title'}>
                                    Informatie over {administration.name}
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Naam</strong>
                                                </td>
                                                <td>{administration.name}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Adres</strong>
                                                </td>
                                                <td>{administration.address}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Postcode / Plaats</strong>
                                                </td>
                                                <td>
                                                    {administration.postalCode} {administration.city}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Kvk</strong>
                                                </td>
                                                <td>{administration.kvkNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Website</strong>
                                                </td>
                                                <td>{administration.website}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>IBAN</strong>
                                                </td>
                                                <td>{administration.iBAN}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>IBAN t.n.v.</strong>
                                                </td>
                                                <td>{administration.ibanAttn}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>BTW nummer</strong>
                                                </td>
                                                <td>{administration.btwNumber}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default AboutUsAdministration;
