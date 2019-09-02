import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthConsumer } from '../../context/AuthContext';
import LogoImage from '../../images/logo.png';
import LoginForm from './Form';
import AuthAPI from '../../api/auth/AuthAPI';
import Alert from 'react-bootstrap/Alert';

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
                // TODO Rob Error melding goed tonen
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
                        <div className="body full-page-section">
                            <div className="div-block">
                                <div className="div-block">
                                    <div className="div-block">
                                        <img src={LogoImage} alt="" className="image" />
                                        <LoginForm handleSubmit={handleSubmit} login={login} />
                                        {error ? (
                                            <Alert className={'p-1 m-1 text-danger'} variant={'danger'}>
                                                {error}
                                            </Alert>
                                        ) : null}
                                        <a href="wachtwoord-vergeten.html" className="link">
                                            Wachtwoord vergeten?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AuthConsumer>
            )}
        </>
    );
};
