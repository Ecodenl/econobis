import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// import { getApiUrl } from '../../../utils/LoginRouteFields';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash; // bijv. "#/auth/callback?code=abc123&state=xyz"
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const urlParams = new URLSearchParams(queryString);
        const authCode = urlParams.get('code');
        const codeVerifier = localStorage.getItem('pkce_code_verifier');

        const apiBaseUrl = window.__SERVER_DATA__?.api_base_url;
        const clientId = window.__SERVER_DATA__?.client_id;
        const redirectUri = window.__SERVER_DATA__?.redirect_uri;

        if (authCode && codeVerifier) {
            axiosInstance
                .post(`${apiBaseUrl}/pkce-login`, {
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    code: authCode,
                    code_verifier: codeVerifier,
                    redirect_uri: redirectUri,
                })
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    localStorage.setItem('last_activity', moment().format());

                    navigate('/');
                })
                .catch(error => {
                    console.error('Portal AuthCallback - token request error:', error);
                    alert('Login mislukt');
                    navigate('/login');
                });
        } else {
            console.warn('Portal AuthCallback - ontbrekende authCode of codeVerifier');
            navigate('/login');
        }
    }, [navigate]);

    return <div>Bezig met inloggen...</div>;
};

export default AuthCallback;
