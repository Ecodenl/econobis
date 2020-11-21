import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AuthConsumer } from '../../../context/AuthContext';
import LoginForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PortalSettingsAPI from '../../../api/portal-settings/PortalSettingsAPI';

export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [showError, toggleError] = useState(false);

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = props.location.state || { from: { pathname: '/gegevens' } };

    const [portalActive, setPortalActive] = useState(false);
    const [showNewAtCooperativeLink, setShowNewAtCooperativeLink] = useState(false);
    const [newAtCooperativeLinkText, setNewAtCooperativeLinkText] = useState(false);

    useEffect(() => {
        (function callFetchPortalActive() {
            PortalSettingsAPI.fetchPortalActive()
                .then(payload => {
                    setPortalActive(payload.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    // alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setIsLoading(false);
                });
        })();

        (function callFetchShowNewAtCooperativeLink() {
            PortalSettingsAPI.fetchShowNewAtCooperativeLink()
                .then(payload => {
                    setShowNewAtCooperativeLink(payload.data);
                })
                .catch(error => {
                    // alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                });
        })();

        (function callFetchNewAtCooperativeLinkText() {
            PortalSettingsAPI.fetchNewAtCooperativeLinkText()
                .then(payload => {
                    setNewAtCooperativeLinkText(payload.data);
                })
                .catch(error => {
                    // alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                });
        })();
    }, []);

    function handleSubmit(values, actions, login) {
        AuthAPI.login(values)
            .then(payload => {
                toggleError(false);
                login(payload.data, () => toggleRedirect(true));
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
                <AuthConsumer>
                    {({ isAuth, login }) => (
                        <Container fluid className="authorization-container">
                            <Row className="justify-content-center align-content-center full-height">
                                <Col xs="12" sm="6" md="4" lg="3" xl="2">
                                    <img src="images/logo.png" alt="" className="image logo-container" />

                                    {!portalActive ? (
                                        <React.Fragment>
                                            <Row className="justify-content-center">
                                                <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                    Deze applicatie kan op dit moment niet gebruikt worden.
                                                </Alert>
                                            </Row>
                                        </React.Fragment>
                                    ) : !isLoading ? (
                                        <React.Fragment>
                                            <LoginForm handleSubmit={handleSubmit} login={login} />
                                            {showError ? (
                                                <Row className="justify-content-center">
                                                    <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                        Gebruikte logingegevens zijn onjuist!
                                                    </Alert>
                                                </Row>
                                            ) : null}
                                            <Row className="justify-content-center">
                                                <Link to={'/wachtwoord-vergeten'} className="authorization-link">
                                                    Wachtwoord vergeten?
                                                </Link>
                                            </Row>
                                            {showNewAtCooperativeLink ? (
                                                <Row className="justify-content-center">
                                                    <a
                                                        href={'/#/nieuw-account'}
                                                        className="authorization-link"
                                                        target="_blank"
                                                    >
                                                        {newAtCooperativeLinkText}
                                                    </a>
                                                </Row>
                                            ) : null}
                                        </React.Fragment>
                                    ) : null}
                                </Col>
                            </Row>
                        </Container>
                    )}
                </AuthConsumer>
            )}
        </>
    );
};
