import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import LogoImage from '../../../images/logo.png';
import RegisterForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthConsumer } from '../../../context/AuthContext';
import ButtonText from '../../../components/button/ButtonText';

const Register = ({ location, match, login }) => {
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const registrationCode = decodeURIComponent(match.params.registrationCode);
    const email = decodeURIComponent(match.params.email);

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = location.state || { from: { pathname: '/gegevens' } };

    function handleSubmit(values, actions) {
        AuthAPI.register({ registrationCode, email, password: values.password, password_confirmation: values.passwordConfirmation })
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
                            <img src={LogoImage} alt="" className="image" />
                            {showSuccessMessage ? (
                                <>
                                    <h3 className={'text-white'}>Je account is geactiveerd</h3>
                                    <p className={'text-white'}>Je bent nu ingelogd</p>
                                    <ButtonText
                                        buttonText={'Ga verder'}
                                        onClickAction={toggleRedirect}
                                        buttonClassName={'authorization-button'}
                                        size="sm"
                                    />
                                </>
                            ) : (
                                <>
                                    <h3 className={'text-white'}>Account activeren</h3>
                                    <RegisterForm handleSubmit={handleSubmit} email={email} />
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default function RegisterWithContext(props) {
    return <AuthConsumer>{({ login }) => <Register {...props} login={login} />}</AuthConsumer>;
}
