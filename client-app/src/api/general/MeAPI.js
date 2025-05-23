import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchMeDetails: function() {
        return getAxiosInstance().get(`me`);
    },

    enableTwoFactor: function(password) {
        return getAxiosInstance().post(
            `me/two-factor-authentication`,
            {},
            {
                headers: {
                    PasswordConfirmation: password,
                },
            }
        );
    },

    disableTwoFactor: function(password) {
        return getAxiosInstance().post(
            `me/two-factor-authentication/delete`,
            {},
            {
                headers: {
                    PasswordConfirmation: password,
                },
            }
        );
    },

    confirmTwoFactor: function(data) {
        return getAxiosInstance().post(`me/confirmed-two-factor-authentication`, data);
    },

    hideTwoFactorNotification: function() {
        return getAxiosInstance().post(`me/hide-two-factor-notification`);
    },

    recoverTwoFactor: function(data) {
        return getAxiosInstance().post(`me/two-factor-challenge`, data);
    },

    fetchTwoFactorQr: function(password) {
        return getAxiosInstance().get(`me/two-factor-qr-code`, {
            headers: {
                PasswordConfirmation: password,
            },
        });
    },

    fetchTwoFactorRecoveryCodes: function(password) {
        return getAxiosInstance().get(`me/two-factor-recovery-codes`, {
            headers: {
                PasswordConfirmation: password,
            },
        });
    },

    fetchTwoFactorStatus: function() {
        return getAxiosInstance().get(`me/two-factor-status`);
    },

    checkPassword: function(password) {
        return getAxiosInstance().get(`me/check-password`, {
            headers: {
                PasswordConfirmation: password,
            },
        });
    },
};
