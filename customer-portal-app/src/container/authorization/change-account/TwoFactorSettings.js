import React, { useRef, useState } from 'react';
import MeAPI from '../../../api/general/MeAPI';
import { Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TwoFactorSettings = function() {
    const activationCodeInput = useRef(null);
    const [password, setPassword] = useState('');
    const [hasValidPassword, setHasValidPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasTwoFactorEnabled, setHasTwoFactorEnabled] = useState(false);
    const [activationQr, setActivationQr] = useState(null);
    const [isActivatingTwoFactor, setIsActivatingTwoFactor] = useState(false);
    const [activationCode, setActivationCode] = useState('');
    const [recoveryCodes, setRecoveryCodes] = useState([]);

    const checkPasswordHandler = event => {
        event.preventDefault();

        setErrorMessage('');
        MeAPI.checkPassword(password)
            .then(payload => {
                setHasValidPassword(true);

                fetchTwoFactorStatus();
            })
            .catch(error => {
                setErrorMessage('Het wachtwoord is onjuist');
            });
    };

    const enableTwoFactorHandler = () => {
        MeAPI.enableTwoFactor(password).then(payload => {
            setIsActivatingTwoFactor(true);
            // activationCodeInput.current.focus();
            fetchQr();
        });
    };

    const disableTwoFactorHandler = () => {
        if (!window.confirm('Weet u zeker dat u twee factor authenticatie wilt uitschakelen.')) {
            return;
        }

        MeAPI.disableTwoFactor(password).then(payload => {
            setHasTwoFactorEnabled(false);
            localStorage.removeItem('portal_two_factor_token');
        });
    };

    const fetchTwoFactorStatus = () => {
        MeAPI.fetchTwoFactorStatus().then(payload => {
            setHasTwoFactorEnabled(payload.data.hasTwoFactorEnabled);
        });
    };

    const fetchQr = () => {
        MeAPI.fetchTwoFactorQr(password).then(payload => {
            setActivationQr(payload.data.svg);
        });
    };

    const confirmTwoFactorHandler = () => {
        setErrorMessage('');

        MeAPI.confirmTwoFactor(activationCode)
            .then(payload => {
                setIsActivatingTwoFactor(false);
                setHasTwoFactorEnabled(true);
                setActivationCode('');
                fetchRecoveryCodes();

                localStorage.setItem('portal_two_factor_token', payload.data.token);
            })
            .catch(() => {
                setErrorMessage('De code is onjuist');
            });
    };

    const fetchRecoveryCodes = () => {
        MeAPI.fetchTwoFactorRecoveryCodes(password).then(payload => {
            setRecoveryCodes(payload.data);
        });
    };

    const regenerateRecoveryCodes = () => {
        if (
            !window.confirm(
                'Weet u zeker dat u nieuwe recovery code wilt genereren? De huidige code is daarna niet meer geldig.'
            )
        ) {
            return;
        }

        MeAPI.regenerateTwoFactorRecoveryCodes(password).then(payload => {
            fetchRecoveryCodes();
        });
    };

    return (
        <Row>
            <Col xs={12} md={9}>
                {errorMessage && (
                    <>
                        <Alert variant={'danger'}>{errorMessage}</Alert>
                    </>
                )}

                {hasValidPassword ? (
                    <>
                        {hasTwoFactorEnabled ? (
                            <>
                                <p>U heeft twee factor authenticatie geactiveerd.</p>
                                <button onClick={disableTwoFactorHandler} className="btn btn-primary btn-sm">
                                    Twee factor uitschakelen
                                </button>
                                <br />
                                <br />
                                <strong>Recovery code</strong>
                                <p>
                                    <small>
                                        De recovery code kunt u gebruiken om uw account te herstellen bij problemen met
                                        uw authenticator app of verlies van uw telefoon. Sla deze op een veilige plek
                                        op.
                                    </small>
                                </p>

                                {recoveryCodes.length ? (
                                    <>
                                        <ul>
                                            {recoveryCodes.map(code => {
                                                return (
                                                    <li key={code} style={{ 'font-family': 'courier' }}>
                                                        {code}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <button onClick={() => setRecoveryCodes([])} className="btn btn-sm">
                                            Verbergen
                                        </button>
                                        <button onClick={regenerateRecoveryCodes} className="btn btn-sm btn-primary">
                                            Vernieuwen
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={fetchRecoveryCodes} className="btn btn-primary btn-sm">
                                            Toon recovery code
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {isActivatingTwoFactor ? (
                                    <>
                                        <p>
                                            Scan onderstaande QR met uw authenticator app en voer de zescijferige code
                                            in.
                                        </p>
                                        <div dangerouslySetInnerHTML={{ __html: activationQr }} />
                                        <br />
                                        <input
                                            ref={activationCodeInput}
                                            placeholder="Code"
                                            className="text-input w-input content"
                                            type="text"
                                            value={activationCode}
                                            onChange={e => setActivationCode(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setIsActivatingTwoFactor(false)}
                                            className="btn btn-sm btn-light"
                                        >
                                            Annuleren
                                        </button>
                                        <button onClick={confirmTwoFactorHandler} className="btn btn-primary btn-sm">
                                            Bevestigen
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            U heeft twee factor authenticatie <strong>niet</strong> geactiveerd.
                                        </p>
                                        <button onClick={enableTwoFactorHandler} className="btn btn-primary btn-sm">
                                            Twee factor inschakelen
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <form onSubmit={checkPasswordHandler}>
                            Voer uw wachtwoord in om de twee factor instellingen te wijzigen.
                            <br />
                            <input
                                placeholder="Wachtwoord"
                                className="text-input w-input content"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary btn-sm">
                                Ontgrendel
                            </button>
                        </form>
                    </>
                )}
            </Col>
        </Row>
    );
};

export default TwoFactorSettings;
