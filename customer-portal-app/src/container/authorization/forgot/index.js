import React, { useState } from 'react';

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

    return (
        <Container fluid className="authorization-container">
            <Row className="justify-content-center align-content-center full-height">
                <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <img src={LogoImage} alt="" className="image" />
                    <h3 className={'text-light'}>Wachtwoord vergeten</h3>
                    <p className={'text-light'}>
                        Vul het e-mailadres in waarmee je inlogt en die bij ons bekend is. Je ontvangt van ons een
                        e-mail waarmee je een nieuw wachtwoord kunt instellen.
                    </p>
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
                </Col>
            </Row>
        </Container>
    );
};

export default Forgot;
