import axiosInstance from '../../default-setup/AxiosInstance';
import { getApiUrl } from '../../utils/LoginRouteFields';
import { generateCodeChallenge, generateCodeVerifier } from '../../utils/pkceUtils';

export default {
    startLoginWithPKCE: async (username, password) => {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        localStorage.setItem('pkce_code_verifier', codeVerifier);
        console.log('startLoginWithPKCE portal', {
            username,
            codeChallenge,
        });

        const response = await axiosInstance.post(
            `${getApiUrl()}/pkce-login`,
            {
                username,
                password,
                code_challenge: codeChallenge,
                code_challenge_method: 'S256',
            },
            { withCredentials: true }
        );

        localStorage.setItem('client_id', response.data.client_id);
        localStorage.setItem('redirect_uri', response.data.redirect_uri);

        window.location.href = response.data.authorize_url;
    },

    newAccount: payload => {
        const requestUrl = `${getApiUrl()}/new-account`;
        return axiosInstance.post(requestUrl, payload);
    },

    newAccountSuccess: payload => {
        const requestUrl = `${getApiUrl()}/new-account-success`;
        return axiosInstance.post(requestUrl, payload);
    },

    register: payload => {
        const requestUrl = `${getApiUrl()}/register`;
        return axiosInstance.post(requestUrl, payload);
    },

    forgot: email => {
        const requestUrl = `${getApiUrl()}/password/email`;
        return axiosInstance.post(requestUrl, email);
    },

    reset: payload => {
        const requestUrl = `${getApiUrl()}/password/reset`;
        return axiosInstance.post(requestUrl, payload);
    },
};
