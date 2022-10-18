import axiosInstance from "../default-setup/AxiosInstance";

export default {
    confirmTwoFactor: function(code) {
        return axiosInstance.post(`me/confirmed-two-factor-authentication`, {
            code
        });
    },

    fetchTwoFactorQr: function(password) {
        return axiosInstance.get(`me/two-factor-qr-code`, {
            params: {
                password
            }
        });
    },

    fetchTwoFactorRecoveryCodes: function(password) {
        return axiosInstance.get(`me/two-factor-recovery-codes`, {
            params: {
                password
            }
        });
    },

    checkPassword: function(password) {
        return axiosInstance.get(`me/check-password`, {
            params: {
                password
            }
        });
    },

    fetchTwoFactorStatus: function() {
        return axiosInstance.get(`me/two-factor-status`);
    },

    enableTwoFactor: function(password) {
        return axiosInstance.post(`me/two-factor-authentication`, {
            password
        });
    },

    disableTwoFactor: function(password) {
        return axiosInstance.delete(`me/two-factor-authentication`, {
            params: {
                password
            }
        });
    },

    recoverTwoFactor: function(code) {
        return axiosInstance.post(`me/two-factor-challenge`, {
            recovery_code: code
        });
    },
};
