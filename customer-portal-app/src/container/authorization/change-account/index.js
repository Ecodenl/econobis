import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ChangeAccountEmail from './Email';
import ChangeAccountPassword from './Password';

function ChangeAccount() {
    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Wijzig inloggegevens</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6} className={'mb-5'}>
                    <h3 className={'h3'}>Wijzig inlog e-mailadres</h3>

                    <ChangeAccountEmail />
                </Col>
                <Col xs={12} md={6}>
                    <h3 className={'h3'}>Wijzig wachtwoord</h3>

                    <ChangeAccountPassword />
                </Col>
            </Row>
        </Container>
    );
}

export default ChangeAccount;
