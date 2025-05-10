import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getClientId, getApiUrl, getRedirectUri } from '../../api/utils/loginRouteFields';
import resetAxiosInstance from '../../api/default-setup/AxiosInstance';
const AuthCallback = () => {
    const navigate = useNavigate();
    console.log('Huidige pathname is:', window.location.pathname);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');
        const codeVerifier = localStorage.getItem('pkce_code_verifier');
        const clientId = getClientId();
        const redirectUri = getRedirectUri();
        console.log('AuthCallback - useEffect - authCode =', authCode); // Debug
        console.log('AuthCallback - useEffect - pkce_code_verifier =', localStorage.getItem('pkce_code_verifier'));
        console.log('AuthCallback - useEffect - client_id =', clientId);
        console.log('AuthCallback - useEffect - redirect_uri=', redirectUri);

        if (authCode && codeVerifier) {
            axios
                .post(`${getApiUrl()}/oauth/token`, {
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    code: authCode,
                    code_verifier: codeVerifier,
                    redirect_uri: redirectUri,
                })
                .then(response => {
                    console.log('handleAuthCallback Ok');
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    resetAxiosInstance(); // stel instance = null

                    // navigate('/');
                    const storedAuthorizeUrl = localStorage.getItem('authorize_url');
                    if (storedAuthorizeUrl) {
                        localStorage.removeItem('authorize_url'); // opschonen
                        window.location.href = storedAuthorizeUrl;
                    } else {
                        navigate('/');
                    }
                })
                .catch(() => {
                    alert('Login mislukt');
                    navigate('/');
                });
        }
    }, [navigate]);

    // return <div>Authenticatie afronden…</div>;
    return <div>Bezig met inloggen...</div>;
};

export default AuthCallback;
