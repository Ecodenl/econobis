import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getClientId, getRedirectUri, getApiUrl } from '../../api/utils/loginRouteFields';
import resetAxiosInstance from '../../api/default-setup/AxiosInstance';
import MeAPI from '../../api/general/MeAPI';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../../actions/general/AuthActions';
import moment from 'moment';

const AuthCallback = () => {
    const navigate = useNavigate();
    console.log('Huidige pathname is:', window.location.pathname);

    const dispatch = useDispatch();

    useEffect(() => {
        // const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash; // bijv. "#/auth/callback?code=abc123&state=xyz"
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const urlParams = new URLSearchParams(queryString);
        const authCode = urlParams.get('code');
        const codeVerifier = localStorage.getItem('pkce_code_verifier');
        const clientId = getClientId();
        const redirectUri = getRedirectUri();
        console.log('AuthCallback - useEffect - authCode =', authCode); // Debug
        console.log('AuthCallback - useEffect - pkce_code_verifier =', localStorage.getItem('pkce_code_verifier'));
        console.log('AuthCallback - useEffect - client_id =', clientId);
        console.log('AuthCallback - useEffect - redirect_uri=', redirectUri);

        if (authCode && codeVerifier) {
            console.log('AuthCallback - useEffect - authCode en codeVerifier bekend');
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
                    localStorage.setItem('last_activity', moment().format());
                    resetAxiosInstance();

                    dispatch(authSuccess());
                    navigate('/');

                    // MeAPI.fetchTwoFactorStatus().then(payload => {
                    //     const data = payload.data;
                    //
                    //     if (!data.requireTwoFactorAuthentication) {
                    //         navigate('/');
                    //     } else if (!data.twoFactorActivated) {
                    //         navigate('/two-factor/activate');
                    //     } else if (data.hasValidToken) {
                    //         navigate('/');
                    //     } else {
                    //         navigate('/two-factor/confirm');
                    //     }
                    // });
                })
                .catch(error => {
                    console.error('AuthCallback - token request error:', error);
                    alert('Login mislukt');
                    navigate('/');
                });
        } else {
            console.warn('AuthCallback - ontbrekende authCode of codeVerifier');
        }
    }, [navigate, dispatch]);

    return <div>Bezig met inloggen...</div>;
};

export default AuthCallback;
