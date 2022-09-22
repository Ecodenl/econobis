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

    fetchTwoFactorQr: function() {
        const requestUrl = `${URL_API}/api/me/two-factor-qr-code`;

        return axiosInstance.get(requestUrl);
    },

    fetchTwoFactorStatus: function() {
        return axiosInstance.get(`${URL_API}/api/me/two-factor-status`);
    },
};
