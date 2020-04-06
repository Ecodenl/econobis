import React, { useState } from 'react';

import ForgotForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Forgot = props => {
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);

    function handleSubmit(values, actions) {
        AuthAPI.forgot(values)
            .then(payload => {
                toggleError(false);
                toggleSuccessMessage(true);
                actions.setSubmitting(false);
            })
            .catch(error => {
                // If forgot API fails show error and then set submitting back to false
                // toggleError(true);
                // If forgot API fails show succesmessage anyway
                toggleError(false);
                toggleSuccessMessage(true);
                actions.setSubmitting(false);
            });
    }

    return (
        <Container fluid className="authorization-container">
            <Row className="justify-content-center align-content-center full-height">
                <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <img src="images/logo.png" alt="" className="image logo-container" />
                    {showSuccessMessage ? (
                        <div>
                            <Row className={'justify-content-center '}>
                                <h3 className={'authorization-text'}>Een E-mail is onderweg!</h3>
                            </Row>
                            <Row className={'justify-content-center '}>
                                <p className={'authorization-text'}>
                                    Als het e-mailadres bij ons bekend is, dan ontvang je binnen enkele minuten een
                                    e-mail met een persoonlijke link. Via deze link kun je een nieuw wachtwoord
                                    instellen.
                                    <br />
                                    Het kan zijn dat de mail door een spamfilter is geblokkeerd. Spamfilters van
                                    bijvoorbeeld Gmail en Hotmail staan erg "scherp". Kijk even bij de Spam/Reclame of
                                    je onze mail daar terug vindt.
                                </p>
                            </Row>
                        </div>
                    ) : (
                        <div>
                            <Row className={'justify-content-center '}>
                                <h3 className={'authorization-text'}>Wachtwoord vergeten</h3>
                            </Row>
                            <Row className={'justify-content-center '}>
                                <p className={'authorization-text'}>
                                    Vul het e-mailadres in waarmee je inlogt en die bij ons bekend is. Je ontvangt van
                                    ons een e-mail waarmee je een nieuw wachtwoord kunt instellen.
                                </p>
                            </Row>
                            <Row className={'justify-content-center '}>
                                <Col xs={12} md={6}>
                                    <ForgotForm handleSubmit={handleSubmit} showSuccessMessage={showSuccessMessage} />
                                    {showError ? (
                                        <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                            E-mailadres is niet bekend!
                                        </Alert>
                                    ) : null}
                                </Col>
                            </Row>
                        </div>
                    )}
                    <Row className={'justify-content-center '}>
                        <Link to={'/login'} className="authorization-link">
                            Terug naar inloggen
                        </Link>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Forgot;
