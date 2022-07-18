import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_DASHBOARD = `/portal-settings-dashboard`;

export default {
    fetchDashboardSettings: (id, contactId) => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/${id}/${contactId}`;

        return axiosInstance.get(requestUrl);
    },
};
