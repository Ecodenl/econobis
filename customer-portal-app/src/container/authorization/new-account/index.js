import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewAccountFormPersonal from './NewAccountFormPersonal';
import NewAccountFormOrganisation from './NewAccountFormOrganisation';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import ButtonText from '../../../components/button/ButtonText';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const NewAccount = props => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [contactType, setContactType] = useState('person');
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectToReferrer, toggleRedirect] = useState(false);
    const [imageHash, setImageHash] = useState(Date.now());

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
                        <p>
                            {'U heeft al een account, klik op '}
                            <Link to={'/wachtwoord-vergeten'} className="authorization-link">
                                wachtwoord vergeten?
                            </Link>
                            {' om een nieuwe wachtwoord aan te vragen.'}
                        </p>
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

    function redirect(from) {
        return <Redirect to={from} />;
    }

    return (
        <>
            {redirectToReferrer && !showSuccessMessage ? (
                redirect('/dashboard')
            ) : (
                <div className="authorization-container">
                    <Container fluid className="authorization-text">
                        <Row className="justify-content-center align-content-start align-content-lg-center full-height p-2">
                            <Col xs="12" sm="6" md="4" lg="4" xl="4">
                                <img
                                    src={`images/logo.png?${imageHash}`}
                                    alt=""
                                    className="image logo-container-small"
                                />

                                {showSuccessMessage ? (
                                    redirect('nieuw-account-succes')
                                ) : (
                                    <>
                                        <Row className="justify-content-center">
                                            <h3 className={'authorization-text'}>Nieuw account</h3>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <p className={'authorization-text'}>
                                                Maak binnen 2 minuten een account aan.
                                            </p>
                                        </Row>
                                        <br />
                                        <Row className="justify-content-center">
                                            <ButtonToolbar toggle>
                                                <Col>
                                                    <Button
                                                        className={'authorization-button'}
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
                                                        className={'authorization-button'}
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
                                        {showError ? (
                                            <Row className="justify-content-center">
                                                <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                    {errorMessage}
                                                </Alert>
                                            </Row>
                                        ) : null}
                                        <Row className="justify-content-center">
                                            <ButtonGroup aria-label="redirect-to-login" className="w-button-group">
                                                <Col>
                                                    <ButtonText
                                                        buttonText={'Heb je al een account ?'}
                                                        onClickAction={toggleRedirect}
                                                        buttonClassName={'authorization-button'}
                                                        size="sm"
                                                    />
                                                </Col>
                                            </ButtonGroup>
                                        </Row>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>
    );
};

function NewAccountWithProvider() {
    const RE_CAPTCHA_KEY = getRecaptchaKeyByDomain();

    return (
        <GoogleReCaptchaProvider reCaptchaKey={RE_CAPTCHA_KEY} language={'nl'}>
            <NewAccount />
        </GoogleReCaptchaProvider>
    );
}
function getRecaptchaKeyByDomain() {
    const hostname = window.location.hostname;

    // Check of het om een .eu domein gaat
    if (hostname.endsWith('.eu')) {
        return process.env.REACT_APP_RE_CAPTCHA_KEY_EU;
    }

    // Standaard: oude key
    return process.env.REACT_APP_RE_CAPTCHA_KEY;
}

export default NewAccountWithProvider;
