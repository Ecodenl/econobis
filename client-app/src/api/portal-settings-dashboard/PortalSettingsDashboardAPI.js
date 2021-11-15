import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_DASHBOARD = `setting-dashboard`;

export default {
    fetchDashboardSettings: keys => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/multiple${keys}`;

        return axiosInstance.get(requestUrl);
    },

    updateDashboardSettings: dashboardSettings => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}`;

        return axiosInstance.put(requestUrl, dashboardSettings);
    },

    addDashboardWidget: widget => {
        const requestUrl = `portal-settings-dashboard`;

        return axiosInstance.post(requestUrl, widget);
    },

    removeDashboardWidget: id => {
        const requestUrl = `portal-settings-dashboard/delete`;

        return axiosInstance.post(requestUrl, { id: id });
    },
};
