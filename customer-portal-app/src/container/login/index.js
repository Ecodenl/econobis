import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../../context/AuthContext';
import LogoImage from '../../images/logo.png';
import LoginForm from './Form';
import AuthAPI from '../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default props => {
    const [error, setError] = useState('');

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = props.location.state || { from: { pathname: '/gegevens' } };

    function handleSubmit(values, actions, login) {
        AuthAPI.login(values)
            .then(payload => {
                login(payload.data, () => toggleRedirect(true));
            })
            .catch(error => {
                // If login fails show error and then set submitting back to false
                setError('Gebruikte logingegevens zijn onjuist');
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
                <AuthConsumer>
                    {({ isAuth, login }) => (
                        <Container fluid className="container-login">
                            <Row
                                className="justify-content-center align-content-center"
                                style={{ minHeight: '100vh', height: '100vh' }}
                            >
                                <Col xs="12" sm="6" md="4" lg="3" xl="2">
                                    <img src={LogoImage} alt="" className="image" />
                                    <LoginForm handleSubmit={handleSubmit} login={login} />
                                    {error ? (
                                        <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                            {error}
                                        </Alert>
                                    ) : null}
                                    <Row className="justify-content-center">
                                        <a href="wachtwoord-vergeten.html" className="login-link">
                                            Wachtwoord vergeten?
                                        </a>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </AuthConsumer>
            )}
        </>
    );
};
