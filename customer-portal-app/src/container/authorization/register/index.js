import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import RegisterForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthConsumer } from '../../../context/AuthContext';
import ButtonText from '../../../components/button/ButtonText';
import Alert from 'react-bootstrap/Alert';

const Register = ({ location, match, login }) => {
    const [showError, toggleError] = useState(false);
    const [showLoginLink, setLoginLink] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const registrationCode = decodeURIComponent(match.params.registrationCode);
    const email = decodeURIComponent(match.params.email);

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = location.state || { from: { pathname: '/dashboard' } };
    const [imageHash, setImageHash] = useState(Date.now());

    function handleSubmit(values, actions) {
        AuthAPI.register({
            registrationCode,
            email,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
        })
            .then(payload => {
                toggleSuccessMessage(true);
                AuthAPI.login({ username: email, password: values.password })
                    .then(payload => {
                        toggleError(false);
                        setLoginLink(false);
                        setErrorMessage('');
                        login(payload.data, () => {});

                        setTimeout(() => {
                            toggleRedirect(true);
                        }, 15000);
                    })
                    .catch(error => {
                        // If login fails show error and then set submitting back to false
                        toggleError(true);
                        setLoginLink(true);
                        setErrorMessage('Er is iets fout gegaan bij automatisch inloggen na activeren.');
                        actions.setSubmitting(false);
                    });
            })
            .catch(error => {
                console.log(error.response.status);
                console.log(error.response.data.message);
                toggleError(true);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message &&
                    error.response.status === 423
                ) {
                    setLoginLink(true);
                    setErrorMessage(error.response.data.message);
                } else {
                    setLoginLink(false);
                    setErrorMessage(
                        'Er is iets fout gegaan bij activeren. Controleer of de activatie link juist en volledig is.'
                    );
                }
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
                            <img src={`images/logo.png?${imageHash}`} alt="" className="image logo-container" />
                            {showSuccessMessage ? (
                                <>
                                    <h3 className={'authorization-text'}>Je account is geactiveerd</h3>
                                    <p className={'authorization-text'}>Je bent nu ingelogd</p>
                                    <ButtonText
                                        buttonText={'Ga verder'}
                                        onClickAction={toggleRedirect}
                                        buttonClassName={'authorization-button'}
                                        size="sm"
                                    />
                                </>
                            ) : (
                                <>
                                    <h3 className={'authorization-text'}>Account activeren</h3>
                                    {!showLoginLink ? <RegisterForm handleSubmit={handleSubmit} email={email} /> : null}
                                    {showError ? (
                                        <Row className={'justify-content-center align-content-center '}>
                                            <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                {errorMessage}
                                            </Alert>
                                        </Row>
                                    ) : null}
                                </>
                            )}
                            {showLoginLink ? (
                                <ButtonText
                                    buttonText={'Ga naar loginscherm'}
                                    onClickAction={toggleRedirect}
                                    buttonClassName={'authorization-button'}
                                    size="sm"
                                />
                            ) : null}
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
