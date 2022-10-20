import axiosInstance from "../default-setup/AxiosInstance";

export default {
    fetchMeDetails: function () {
        return axiosInstance.get(`me`);
    },

    enableTwoFactor: function (password) {
        return axiosInstance.post(`me/two-factor-authentication`, {
            password,
        }, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    disableTwoFactor: function (password) {
        return axiosInstance.delete(`me/two-factor-authentication`, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    confirmTwoFactor: function (data) {
        return axiosInstance.post(`me/confirmed-two-factor-authentication`, data);
    },

    hideTwoFactorNotification: function () {
        return axiosInstance.post(`me/hide-two-factor-notification`);
    },

    recoverTwoFactor: function (data) {
        return axiosInstance.post(`me/two-factor-challenge`, data);
    },

    fetchTwoFactorQr: function (password) {
        return axiosInstance.get(`me/two-factor-qr-code`, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    fetchTwoFactorRecoveryCodes: function (password) {
        return axiosInstance.get(`me/two-factor-recovery-codes`, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    fetchTwoFactorStatus: function () {
        return axiosInstance.get(`me/two-factor-status`);
    },

    checkPassword: function (password) {
        return axiosInstance.get(`me/check-password`, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

};
