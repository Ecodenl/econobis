import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { AuthConsumer } from '../../../context/AuthContext';
import LoginForm from './Form';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PortalSettingsAPI from '../../../api/portal-settings/PortalSettingsAPI';
import MeAPI from '../../../api/general/MeAPI';

import { generateCodeChallenge, generateCodeVerifier } from '../../../utils/pkceUtils';
export default props => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [showError, toggleError] = useState(false);

    const [redirectToReferrer, toggleRedirect] = useState(false);
    let { from } = props.location.state || { from: { pathname: '/dashboard' } };

    const [portalActive, setPortalActive] = useState(false);
    const [showNewAtCooperativeLink, setShowNewAtCooperativeLink] = useState(false);
    const [newAtCooperativeLinkText, setNewAtCooperativeLinkText] = useState('');
    const [imageHash, setImageHash] = useState(Date.now());

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

    // function handleSubmit(values, actions, login) {
    //     AuthAPI.login(values)
    //         .then(payload => {
    //             toggleError(false);
    //             login(payload.data, () => {
    //                 MeAPI.fetchTwoFactorStatus().then(payload => {
    //                     if(payload.data.hasTwoFactorEnabled && !payload.data.hasValidToken) {
    //                         history.push('/two-factor/confirm');
    //                         return;
    //                     }
    //
    //                     toggleRedirect(true)
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //             // If login fails show error and then set submitting back to false
    //             toggleError(true);
    //             actions.setSubmitting(false);
    //         });
    // }

    function handlePkceLogin() {
        const state = crypto.randomUUID();
        const verifier = generateCodeVerifier();
        const challenge = generateCodeChallenge(verifier);

        // Save verifier & state temporarily (e.g. in localStorage or sessionStorage)
        sessionStorage.setItem('pkce_verifier', verifier);
        sessionStorage.setItem('pkce_state', state);

        const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID_PORTAL;
        const redirectUri = `${window.location.origin}/login/callback`;

        const authorizeUrl = new URL(`${process.env.REACT_APP_API_BASE}/oauth/authorize`);
        authorizeUrl.searchParams.set('client_id', clientId);
        authorizeUrl.searchParams.set('redirect_uri', redirectUri);
        authorizeUrl.searchParams.set('response_type', 'code');
        authorizeUrl.searchParams.set('scope', '');
        authorizeUrl.searchParams.set('state', state);
        authorizeUrl.searchParams.set('code_challenge', challenge);
        authorizeUrl.searchParams.set('code_challenge_method', 'S256');

        window.location.href = authorizeUrl.toString();
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
                                    <img src={`images/logo.png?${imageHash}`} alt="" className="image logo-container" />
                                    {isLoading ? (
                                        <React.Fragment>
                                            <Row className="justify-content-center">
                                                <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                    Applicatie wordt geladen...
                                                </Alert>
                                            </Row>
                                        </React.Fragment>
                                    ) : !portalActive ? (
                                        <React.Fragment>
                                            <Row className="justify-content-center">
                                                <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                    Deze applicatie kan op dit moment niet gebruikt worden.
                                                </Alert>
                                            </Row>
                                        </React.Fragment>
                                    ) : !isLoading ? (
                                        <React.Fragment>
                                            <LoginForm handleSubmit={handlePkceLogin} login={login} />
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
