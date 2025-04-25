import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';
import pkceChallenge from 'pkce-challenge';

// const REDIRECT_URI = `${window.location.origin}/auth/callback`;
// const AUTH_URL = `${window.env?.URL_API}/oauth/authorize`;
// const TOKEN_URL = `${window.env?.URL_API}/oauth/token`;
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

let codeVerifier = null;

const startLogin = () => {
    const CLIENT_ID = window.env?.CLIENT_ID;
    const AUTH_URL = `${getApiUrl()}/oauth/authorize`;
    const pkce = pkceChallenge(); // generate { code_verifier, code_challenge }
    codeVerifier = pkce.code_verifier;
    localStorage.setItem('pkce_verifier', codeVerifier);

    console.log('startLogin - pkce_verifier ', codeVerifier);
    console.log('startLogin - AUTH_URL ', AUTH_URL);
    console.log('startLogin - REDIRECT_URI ', REDIRECT_URI);
    console.log('startLogin - CLIENT_ID ', CLIENT_ID);

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: '', // eventueel: 'app'
        code_challenge: pkce.code_challenge,
        code_challenge_method: 'S256',
    });

    window.location.href = `${AUTH_URL}?${params.toString()}`;
};

const handleAuthCallback = async authorizationCode => {
    const CLIENT_ID = window.env?.CLIENT_ID;
    const TOKEN_URL = `${getApiUrl()}/oauth/token`;
    const storedVerifier = localStorage.getItem('pkce_verifier');

    console.log('handleAuthCallback - pkce_verifier ', storedVerifier);
    console.log('handleAuthCallback - TOKEN_URL ', TOKEN_URL);
    console.log('handleAuthCallback - REDIRECT_URI ', REDIRECT_URI);
    console.log('handleAuthCallback - CLIENT_ID ', CLIENT_ID);

    const data = {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code: authorizationCode,
        code_verifier: storedVerifier,
    };

    try {
        const response = await getAxiosInstance().post(TOKEN_URL, data);
        // Opslaan tokens in localStorage of state (zoals eerder)
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        return { success: true };
    } catch (error) {
        console.error('Auth error', error);
        return { success: false, error };
    }
};

export default {
    startLogin,
    handleAuthCallback,
};
