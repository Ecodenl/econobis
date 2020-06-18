import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import ResetForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthConsumer } from '../../../context/AuthContext';
import ButtonText from '../../../components/button/ButtonText';

const Reset = ({ location, match, login }) => {
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const token = decodeURIComponent(match.params.token);
    const email = decodeURIComponent(match.params.email);

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = location.state || { from: { pathname: '/gegevens' } };

    function handleSubmit(values, actions) {
        AuthAPI.reset({ token, email, password: values.password, password_confirmation: values.passwordConfirmation })
            .then(payload => {
                toggleSuccessMessage(true);
                AuthAPI.login({ username: email, password: values.password })
                    .then(payload => {
                        toggleError(false);
                        login(payload.data, () => {});

                        setTimeout(() => {
                            toggleRedirect(true);
                        }, 15000);
                    })
                    .catch(error => {
                        // If login fails show error and then set submitting back to false
                        toggleError(true);
                        actions.setSubmitting(false);
                    });
            })
            .catch(error => {
                // If login fails show error and then set submitting back to false
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
                <Container fluid className="authorization-container">
                    <Row className="justify-content-center align-content-center full-height">
                        <Col xs="12" sm="8" md="6" lg="4" xl="2">
                            <img src="images/logo.png" alt="" className="image logo-container" />
                            {showSuccessMessage ? (
                                <>
                                    <Row className="justify-content-center">
                                        <h3 className={'authorization-text'}>Je wachtwoord is ingesteld</h3>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <p className={'authorization-text'}>Je bent nu ingelogd</p>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <ButtonText
                                            buttonText={'Ga verder'}
                                            onClickAction={toggleRedirect}
                                            buttonClassName={'authorization-button'}
                                            size="sm"
                                        />
                                    </Row>
                                </>
                            ) : (
                                <>
                                    <Row className="justify-content-center">
                                        <h3 className={'authorization-text'}>Wachtwoord wijzigen</h3>
                                    </Row>
                                    <ResetForm handleSubmit={handleSubmit} email={email} />
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default function ResetWithContext(props) {
    return <AuthConsumer>{({ login }) => <Reset {...props} login={login} />}</AuthConsumer>;
}
