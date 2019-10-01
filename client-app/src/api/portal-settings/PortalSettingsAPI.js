import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS = `setting`;

export default {
    fetchPortalSettings: keys => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/multiple${keys}`;

        return axiosInstance
            .get(requestUrl);
    },

    updatePortalSettings: portalSettings => {
        const requestUrl = `${URL_PORTAL_SETTINGS}`;

        return axiosInstance.post(requestUrl, portalSettings);
    },
};
