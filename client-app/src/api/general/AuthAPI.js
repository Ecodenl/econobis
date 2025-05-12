import axios from 'axios';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkceUtils';
import { getApiUrl } from '../utils/LoginRouteFields';

const AuthAPI = {
    startLoginWithPKCE: async (username, password) => {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        localStorage.setItem('pkce_code_verifier', codeVerifier);

        const response = await axios.post(`${getApiUrl()}/pkce-login`, {
            username,
            password,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
        });

        localStorage.setItem('client_id', response.data.client_id);
        localStorage.setItem('redirect_uri', response.data.redirect_uri);

        const authorizeUrl = response.data.authorize_url;

        window.location.href = authorizeUrl;
    },
};

export default AuthAPI;
