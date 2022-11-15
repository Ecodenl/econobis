import axiosInstance from "../default-setup/AxiosInstance";

export default {
    confirmTwoFactor: function (code) {
        return axiosInstance.post(`me/confirmed-two-factor-authentication`, {
            code
        });
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

    regenerateTwoFactorRecoveryCodes: function (password) {
        return axiosInstance.post(`me/two-factor-recovery-codes`, {}, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    checkPassword: function (password) {
        return axiosInstance.get(`me/check-password`, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    fetchTwoFactorStatus: function () {
        return axiosInstance.get(`me/two-factor-status`);
    },

    enableTwoFactor: function (password) {
        return axiosInstance.post(`me/two-factor-authentication`, {}, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    disableTwoFactor: function (password) {
        return axiosInstance.post(`me/two-factor-authentication/delete`, {}, {
            headers: {
                PasswordConfirmation: password,
            }
        });
    },

    recoverTwoFactor: function (code) {
        return axiosInstance.post(`me/two-factor-challenge`, {
            recovery_code: code
        });
    },
};
