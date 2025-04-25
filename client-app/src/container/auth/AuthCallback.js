import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../api/general/AuthAPI';
import { getApiUrl } from '../../api/utils/ApiUrl';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash; // Bijvoorbeeld: "#/auth/callback?code=abc123"
        const urlParams = new URLSearchParams(hash.split('?')[1]); // Haal alles ná de ?
        const code = urlParams.get('code');
        console.log('AuthCallback - useEffect - Code =', code); // Debug
        console.log('AuthCallback - useEffect - verifier =', localStorage.getItem('pkce_verifier'));
        console.log(`AuthCallback - useEffect - redirect_uri = ${getApiUrl()}/oauth/authorize`);
        console.log('AuthCallback - useEffect - client_id =', window.env?.CLIENT_ID);
        if (code) {
            AuthAPI.handleAuthCallback(code).then(res => {
                if (res.success) {
                    console.log('handleAuthCallback Ok');
                    navigate('/');
                } else {
                    alert('Login mislukt');
                    navigate('/');
                }
            });
        }
    }, []);

    return <div>Bezig met inloggen...</div>;
};

export default AuthCallback;
