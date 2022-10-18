import React, {useEffect, useRef, useState} from 'react';
import MeAPI from "../../api/general/MeAPI";
import {Alert} from "react-bootstrap";

const TwoFactorSettings = function () {
    const activationCodeInput = useRef(null);
    const [password, setPassword] = useState('');
    const [hasValidPassword, setHasValidPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasTwoFactorEnabled, setHasTwoFactorEnabled] = useState(false);
    const [activationQr, setActivationQr] = useState(null);
    const [isActivatingTwoFactor, setIsActivatingTwoFactor] = useState(false);
    const [activationCode, setActivationCode] = useState('');
    const [recoveryCodes, setRecoveryCodes] = useState([]);

    const checkPasswordHandler = (event) => {
        event.preventDefault();

        setErrorMessage('');
        MeAPI.checkPassword(password).then(payload => {
            setHasValidPassword(true);

            fetchTwoFactorStatus();
        }).catch(error => {
            setErrorMessage('Het wachtwoord is onjuist');
        });
    }

    const enableTwoFactorHandler = () => {
        MeAPI.enableTwoFactor(password).then(payload => {
            setIsActivatingTwoFactor(true);
            activationCodeInput.current.focus();
            fetchQr();
        });
    }

    const disableTwoFactorHandler = () => {
        MeAPI.disableTwoFactor(password).then(payload => {
            setHasTwoFactorEnabled(false);
            localStorage.removeItem('portal_two_factor_token');
        });
    }

    const fetchTwoFactorStatus = () => {
        MeAPI.fetchTwoFactorStatus().then(payload => {
            setHasTwoFactorEnabled(payload.data.hasTwoFactorEnabled);
        });
    }

    const fetchQr = () => {
        MeAPI.fetchTwoFactorQr(password).then(payload => {
            setActivationQr(payload.data.svg);
        });
    }

    const confirmTwoFactorHandler = () => {
        setErrorMessage('');

        MeAPI.confirmTwoFactor(activationCode).then(payload => {
            setIsActivatingTwoFactor(false);
            setHasTwoFactorEnabled(true);
            setActivationCode('');
            fetchRecoveryCodes();

            localStorage.setItem('portal_two_factor_token', payload.data.token);
        }).catch(() => {
            setErrorMessage('De code is onjuist');
        });
    }

    const fetchRecoveryCodes = () => {
        MeAPI.fetchTwoFactorRecoveryCodes(password).then(payload => {
            setRecoveryCodes(payload.data);
        });
    }

    const regenerateRecoveryCodes = () => {
        setRecoveryCodes([]);

        MeAPI.regenerateTwoFactorRecoveryCodes(password).then(payload => {
            fetchRecoveryCodes();
        });
    }

    return (
        <div className="content-container w-container">
            <h4>Twee factor authenticatie</h4>

            {errorMessage && (<>
                <Alert variant={'danger'}>
                    {errorMessage}
                </Alert>
            </>)}

            {hasValidPassword ? (
                <>
                    {hasTwoFactorEnabled ? (
                        <>
                            <p>U heeft twee factor authenticatie geactiveerd.</p>
                            <button onClick={disableTwoFactorHandler}>Twee factor uitschakelen</button>
                            <br/><br/>
                            <p>U kunt recovery codes om uw account te herstellen bij problemen met uw authenticator app
                                of verlies van uw telefoon. Sla deze op een veilige plek op.</p>

                            {recoveryCodes.length ? (<>
                                <strong>Recovery codes</strong>
                                <ul style={{listStyleType: 'none', padding: 0}}>
                                    {recoveryCodes.map((code) => {
                                        return (
                                            <li key={code}>{code}</li>
                                        );
                                    })}
                                </ul>
                                <button onClick={regenerateRecoveryCodes}>Vernieuw recovery codes</button>
                                <button onClick={() => setRecoveryCodes([])}>Verberg recovery codes</button>
                            </>) : (<>
                                <button onClick={fetchRecoveryCodes}>Toon recovery codes</button>
                            </>)}
                        </>) : (
                        <>
                            {isActivatingTwoFactor ? (
                                <>
                                    <p>Scan onderstaande QR met uw authenticator app en voer de zescijferige code
                                        in.</p>
                                    <div dangerouslySetInnerHTML={{__html: activationQr}}/>
                                    <br/>
                                    <input ref={activationCodeInput} type="text" value={activationCode}
                                           onChange={(e) => setActivationCode(e.target.value)}/>
                                    <button onClick={() => setIsActivatingTwoFactor(false)}>Annuleren</button>
                                    <button onClick={confirmTwoFactorHandler}>Bevestigen</button>
                                </>
                            ) : (
                                <>
                                    <p>U heeft twee factor authenticatie <strong>niet</strong> geactiveerd.</p>
                                    <button onClick={enableTwoFactorHandler}>Twee factor inschakelen</button>
                                </>
                            )}
                        </>
                    )
                    }
                </>
            ) : (
                <>
                    <form onSubmit={checkPasswordHandler}>
                    Voer uw wachtwoord opnieuw in om de instellingen te wijzigen.<br/>
                    <input autoComplete="on" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Ontgrendel</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default TwoFactorSettings;