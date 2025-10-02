import getAxiosInstance from '../default-setup/AxiosInstance';

const getAuthKey = () => ({
    grant_type: 'password',
    client_id: window.env?.CLIENT_ID,
    client_secret: window.env?.CLIENT_KEY,
});

export default {
    loginUser: loginCredentials => {
        const requestUrl = `${window.env?.URL_API}/oauth/token`;

        delete getAxiosInstance().defaults.headers.common['Authorization'];

        return getAxiosInstance()
            .post(requestUrl, { ...getAuthKey(), ...loginCredentials })
            .then(response => response)
            .catch(error => {
                return { error: error?.response?.data?.errorBlocked ?? 'Verkeerde inloggegevens ingevuld!' };
            });
    },

    refreshToken: () => {
        const request = {
            grant_type: 'refresh_token',
            refresh_token: localStorage.getItem('refresh_token'),
            client_id: window.env?.CLIENT_ID,
            client_secret: window.env?.CLIENT_KEY,
        };

        const requestUrl = `${window.env?.URL_API}/oauth/token`;

        return getAxiosInstance().post(requestUrl, request);
    },
};
