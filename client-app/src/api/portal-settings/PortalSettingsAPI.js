import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS = `setting`;

export default {
    fetchPortalSettings: keys => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/multiple${keys}`;

        return getAxiosInstance().get(requestUrl);
    },

    updatePortalSettings: portalSettings => {
        const requestUrl = `${URL_PORTAL_SETTINGS}`;

        return getAxiosInstance().post(requestUrl, portalSettings);
    },
};
