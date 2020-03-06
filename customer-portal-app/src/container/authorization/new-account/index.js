import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewAccountFormPersonal from './NewAccountFormPersonal';
import NewAccountFormOrganisation from './NewAccountFormOrganisation';
import { Redirect } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

const NewAccount = props => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [contactType, setContactType] = useState('person');
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(values, actions) {
        if (!executeRecaptcha) {
            return;
        }
        const reCaptchaToken = await executeRecaptcha('signup_page');

        AuthAPI.newAccount({ ...values, contactType: contactType, reCaptchaToken })
            .then(payload => {
                toggleError(false);
                toggleSuccessMessage(true);
                actions.setSubmitting(false);
            })
            .catch(error => {
                // If new account fails show error and then set submitting back to false
                toggleError(true);
                if (error.response && error.response.status === 404) {
                    setErrorMessage(
                        'Er bestaat al een account met het e-mailadres dat je hebt ingevuld. Je kunt met dit e-mailadres inloggen als bestaand contact. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres.'
                    );
                } else if (error.response && error.response.status === 405) {
                    setErrorMessage(
                        'Er bestaat al een contact met het e-mailadres, voornaam en achternaam dat je hebt ingevuld. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres, voornaam of achternaam.'
                    );
                } else {
                    setErrorMessage('Fout bij aanmaken nieuw account!');
                }

                actions.setSubmitting(false);
            });
    }

    function redirect() {
        return <Redirect to={'nieuw-account-succes'} />;
    }

    return (
        <div className="authorization-container">
            <Container fluid className="text-light">
                <Row className="justify-content-center align-content-start align-content-lg-center full-height p-2">
                    <Col xs="12" sm="6" md="4" lg="4" xl="4">
                        <img src="images/logo.png" alt="" className="image logo-container-small" />

                        {showSuccessMessage ? (
                            redirect()
                        ) : (
                            <>
                                <Row className="justify-content-center">
                                    <h3 className={'text-light'}>Nieuw account</h3>
                                </Row>
                                <Row className="justify-content-center">
                                    <p className={'text-light'}>Maak binnen 2 minuten een account aan.</p>
                                </Row>
                                <br />
                                <Row className="justify-content-center">
                                    <ButtonToolbar toggle>
                                        <Col>
                                            <Button
                                                variant={
                                                    contactType === 'person'
                                                        ? 'primary fixed-height'
                                                        : 'light fixed-height'
                                                }
                                                block
                                                onClick={() => setContactType('person')}
                                            >
                                                Voor jezelf
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant={contactType === 'organisation' ? 'primary' : 'light'}
                                                block
                                                onClick={() => setContactType('organisation')}
                                            >
                                                Voor je organisatie
                                            </Button>
                                        </Col>
                                    </ButtonToolbar>
                                </Row>
                                <br />

                                {contactType === 'person' ? (
                                    <NewAccountFormPersonal
                                        handleSubmit={handleSubmit}
                                        showSuccessMessage={showSuccessMessage}
                                    />
                                ) : (
                                    <NewAccountFormOrganisation
                                        handleSubmit={handleSubmit}
                                        showSuccessMessage={showSuccessMessage}
                                    />
                                )}
                                <br />

                                {showError ? (
                                    <Row>
                                        <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                            {errorMessage}
                                        </Alert>
                                    </Row>
                                ) : null}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

function NewAccountWithProvider() {
    const RE_CAPTCHA_KEY = process.env.REACT_APP_RE_CAPTCHA_KEY;

    return (
        <GoogleReCaptchaProvider reCaptchaKey={RE_CAPTCHA_KEY} language={'nl'}>
            <NewAccount />
        </GoogleReCaptchaProvider>
    );
}

export default NewAccountWithProvider;
