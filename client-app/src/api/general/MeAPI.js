import axiosInstance from "../default-setup/AxiosInstance";

export default {
    fetchMeDetails: function() {
        const requestUrl = `${URL_API}/api/me`;

        return axiosInstance.get(requestUrl);
    },

    activateTwoFactor: function() {
        const requestUrl = `${URL_API}/api/me/two-factor-authentication`;

        return axiosInstance.post(requestUrl);
    },

    confirmTwoFactor: function(data) {
        const requestUrl = `${URL_API}/api/me/confirmed-two-factor-authentication`;

        return axiosInstance.post(requestUrl, data);
    },

    hideTwoFactorNotification: function() {
        const requestUrl = `${URL_API}/api/me/hide-two-factor-notification`;

        return axiosInstance.post(requestUrl);
    },

    recoverTwoFactor: function(data) {
        const requestUrl = `${URL_API}/api/me/two-factor-challenge`;

        return axiosInstance.post(requestUrl, data);
    },

    fetchTwoFactorQr: function() {
        const requestUrl = `${URL_API}/api/me/two-factor-qr-code`;

        return axiosInstance.get(requestUrl);
    },

    fetchTwoFactorRecoveryCodes: function() {
        const requestUrl = `${URL_API}/api/me/two-factor-recovery-codes`;

        return axiosInstance.get(requestUrl);
    },

    fetchTwoFactorStatus: function() {
        return axiosInstance.get(`${URL_API}/api/me/two-factor-status`);
    },
};
