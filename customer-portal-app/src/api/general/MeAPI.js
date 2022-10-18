import axiosInstance from "../default-setup/AxiosInstance";

export default {
    confirmTwoFactor: function({password, code}) {
        return axiosInstance.post(`me/confirmed-two-factor-authentication`, {
            password,
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

    fetchTwoFactorStatus: function(password) {
        return axiosInstance.get(`me/two-factor-status`, {
            params: {
                password
            }
        });
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
};
