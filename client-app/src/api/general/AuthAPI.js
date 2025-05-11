import axios from 'axios';
import { generatePKCECodes } from '../../container/auth/pkce';
import { getApiUrl, getClientId, getRedirectUri } from '../utils/loginRouteFields';

const startLoginWithPKCE = async (username, password) => {
    const clientId = getClientId();
    console.log('AuthAPI - cliendId: ' + clientId);
    const redirectUri = getRedirectUri();
    console.log('AuthAPI - redirectUri: ' + redirectUri);

    const { codeVerifier, codeChallenge } = await generatePKCECodes();
    console.log('codeVerifier', codeVerifier);
    console.log('codeChallenge', codeChallenge);

    // Bewaar de verifier tijdelijk in localStorage (of sessionStorage)
    localStorage.setItem('pkce_code_verifier', codeVerifier);

    const response = await axios.post(
        `${getApiUrl()}/pkce-login`,
        {
            email: username,
            password,
        },
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    console.log('/pkce-login - response', response);

    // Redirect naar Laravel Passport authorize route
    const authUrl = `${getApiUrl()}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    // const authUrl = `${getApiUrl()}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=use-app`;
    console.log('authUrl', authUrl);
    window.location.href = authUrl;
};

export default {
    startLoginWithPKCE,
};
