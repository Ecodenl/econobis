import React from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';

function AboutUs() {
    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Informatie over Energie Dongen</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Naam</strong>
                                </td>
                                <td>Energie Dongen</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Adres</strong>
                                </td>
                                <td>Heuvelrug 31 4591 JK Dongen</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Kvk</strong>
                                </td>
                                <td>12345678</td>
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
                                <td>12ABNA123123123</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>IBAN t.n.v.</strong>
                                </td>
                                <td>Energie Dongen</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>BTW nummer</strong>
                                </td>
                                <td>987987.097809.0890</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutUs;
