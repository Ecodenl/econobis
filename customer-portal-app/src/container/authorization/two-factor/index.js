import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MeAPI from '../../../api/general/MeAPI';
import ButtonText from '../../../components/button/ButtonText';

export default () => {
    const history = useHistory();
    const [showError, toggleError] = useState(false);
    const [code, setCode] = useState('');
    const [imageHash, setImageHash] = useState(Date.now());

    function handleSubmit(event) {
        event.preventDefault();
        toggleError(false);

        MeAPI.confirmTwoFactor(code)
            .then(payload => {
                localStorage.setItem('portal_two_factor_token', payload.data.token);

                history.push('/dashboard');
            })
            .catch(error => {
                // If login fails show error and then set submitting back to false
                toggleError(true);
            });
    }

    return (
        <>
            <Container fluid className="authorization-container">
                <Row className="justify-content-center align-content-center full-height">
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <img src={`images/logo.png?${imageHash}`} alt="" className="image logo-container" />
                        <p>
                            Account is beveiligd met twee factor authenticatie, voer hier onder de code uit uw
                            authenticator app in.
                        </p>
                        <React.Fragment>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className={`text-input w-input`}
                                    placeholder="Twee factor code"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    autoFocus={true}
                                />
                                <ButtonText
                                    buttonText={'Bevestigen'}
                                    buttonClassName={'authorization-button'}
                                    type="submit"
                                />
                            </form>

                            {showError ? (
                                <Row className="justify-content-center">
                                    <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                        Code is onjuist
                                    </Alert>
                                </Row>
                            ) : null}
                            <Row className="justify-content-center">
                                <Link to={'/two-factor/recover'} className="authorization-link">
                                    Twee factor herstellen
                                </Link>
                            </Row>
                        </React.Fragment>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
