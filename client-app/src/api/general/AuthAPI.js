import axios from 'axios';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkceUtils';
import { getApiUrl } from '../utils/loginRouteFields';

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

        const authorizeUrl = response.data.authorize_url;
        console.log('AuthAPI - authorizeUrl: ' + authorizeUrl);

        localStorage.setItem('authorize_url', window.location.href); // waar de user vandaan kwam

        window.location.href = authorizeUrl;
    },
};

export default AuthAPI;
