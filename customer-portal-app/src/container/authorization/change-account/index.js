import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormLabel from 'react-bootstrap/FormLabel';
import ChangeAccountEmail from './Email';
import ProjectAPI from '../../../api/project/ProjectAPI';
import PortalUserAPI from '../../../api/portal-user/PortalUserAPI';
import ChangeAccountPassword from './Password';

function ChangeAccount() {
    const [portalUserEmail, setPortalUserEmail] = useState('');

    useEffect(() => {
        (function callFetchUserEmail() {
            PortalUserAPI.fetchPortalUserEmail()
                .then(payload => {
                    setPortalUserEmail(payload.data);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                });
        })();
    }, []);

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Wijzig inloggegevens</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6} className={'mb-5'}>
                    <h3 className={'h3'}>Wijzig inlog email</h3>

                    <ChangeAccountEmail portalUserEmail={portalUserEmail} />
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
