import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_DASHBOARD = `setting-dashboard`;

export default {
    fetchDashboardSettings: keys => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/multiple${keys}`;

        return axiosInstance.get(requestUrl);
    },
};
