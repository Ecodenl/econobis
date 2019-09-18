import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../../../context/AuthContext';
import LogoImage from '../../../images/logo.png';
import ForgotForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Forgot = props => {
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = props.location.state || { from: { pathname: '/gegevens' } };

    function handleSubmit(values, actions) {
        AuthAPI.forgot(values)
            .then(payload => {
                toggleError(false);
                toggleSuccessMessage(true);
                actions.setSubmitting(false);
            })
            .catch(error => {
                // If login fails show error and then set submitting back to false
                toggleError(true);
                actions.setSubmitting(false);
            });
    }

    function redirect() {
        return <Redirect to={from} />;
    }

    return (
        <>
            {redirectToReferrer ? (
                redirect()
            ) : (
                <Container fluid className="container-login">
                    <Row
                        className="justify-content-center align-content-center"
                        style={{ minHeight: '100vh', height: '100vh' }}
                    >
                        <Col xs="12" sm="10" md="8" lg="6" xl="4">
                            <img src={LogoImage} alt="" className="image" />
                            <h3 className={'text-light'}>Wachtwoord vergeten</h3>
                            <p className={'text-light'}>
                                Weet je het wachtwoord niet meer? Vul hieronder je e-mailadres in. We sturen dan binnen
                                enkele minuten een e-mail waarmee een nieuw wachtwoord kan worden aangemaakt.
                            </p>
                            <Row className={'justify-content-center '}>
                                <Col xs={12} md={6}>
                                    <ForgotForm handleSubmit={handleSubmit} />
                                    {showError ? (
                                        <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                            E-mailadres is niet bekend!
                                        </Alert>
                                    ) : null}
                                    {showSuccessMessage ? (
                                        <Alert className={'p-1 m-1 text-white'} style={{ background: '#00d371' }}>
                                            E-mail om het wachtwoord opnieuw in te stellen is zojuist verstuurd!
                                        </Alert>
                                    ) : null}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Forgot;
