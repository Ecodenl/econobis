import React, { useState } from 'react';

import LogoImage from '../../../images/logo.png';
import AuthAPI from '../../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewAccountFormPersonal from './NewAccountFormPersonal';
import NewAccountFormOrganisation from './NewAccountFormOrganisation';
import { Link } from 'react-router-dom';

const NewAccount = props => {
    const [contactType, setContactType] = useState('person');
    const [showError, toggleError] = useState(false);
    const [showSuccessMessage, toggleSuccessMessage] = useState(false);

    function handleSubmit(values, actions) {
        AuthAPI.newAccount({ ...values, contactType: contactType })
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
        <Container fluid className="authorization-container text-light">
            <Row className="justify-content-center align-content-center full-height">
                <Col xs="12" sm="10" md="8" lg="6" xl="4">
                    <img src={LogoImage} alt="" className="image" />
                    {showSuccessMessage ? (
                        <div>
                            <h3>Een E-mail is onderweg!</h3>
                            <p>
                                Binnen enkele minuten ontvang je een e-mail met een persoonlijke link. Via deze link kun
                                je je account activeren.
                            </p>
                            <Link to={'/login'} className="authorization-link">
                                Terug naar inloggen
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h3 className={'text-light'}>Nieuw account</h3>
                            <p className={'text-light'}>Maak binnen 2 minuten een account aan.</p>
                            <br />
                            <Row>
                                <Col xs={12} md={10}>
                                    <div className="form-check form-check-inline">
                                        <label className="radio-inline">
                                            <input
                                                type="radio"
                                                id="personal"
                                                checked={contactType === 'person'}
                                                value={'person'}
                                                onChange={() => setContactType('person')}
                                            />
                                            &nbsp;voor jezelf
                                        </label>
                                        &nbsp;&nbsp;
                                        <label className="radio-inline">
                                            <input
                                                type="radio"
                                                id="organisation"
                                                checked={contactType === 'organisation'}
                                                value={'organisation'}
                                                onChange={() => {
                                                    setContactType('organisation');
                                                }}
                                            />
                                            &nbsp;voor je organisatie
                                        </label>
                                    </div>
                                </Col>
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
                                <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                    Fout bij aanmaken nieuw account!
                                </Alert>
                            ) : null}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default NewAccount;
