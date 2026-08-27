import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    loginUser: loginCredentials => {
        const requestUrl = `${window.env?.URL_API}/auth/token`;

        delete getAxiosInstance().defaults.headers.common['Authorization'];

        return getAxiosInstance()
            .post(requestUrl, loginCredentials)
            .then(response => response)
            .catch(error => {
                return { error: error?.response?.data?.error ?? 'Verkeerde inloggegevens ingevuld!' };
            });
    },

    refreshToken: () => {
        const requestUrl = `${window.env?.URL_API}/auth/token/refresh`;

        return getAxiosInstance().post(requestUrl, {
            refresh_token: localStorage.getItem('refresh_token'),
        });
    },
};
