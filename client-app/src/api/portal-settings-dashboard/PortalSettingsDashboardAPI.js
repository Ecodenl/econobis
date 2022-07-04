import axiosInstance from '../default-setup/AxiosInstance';

// todo WM: chcek / opschonen
//
const URL_PORTAL_SETTINGS_DASHBOARD = `portal-settings-dashboard`;
const URL_PORTAL_SETTINGS_DASHBOARD_WIDGET = `portal-settings-dashboard-widget`;

export default {
    fetchPortalSettingsDashboardDetails: id => {
        const requestUrl = `jory/${URL_PORTAL_SETTINGS_DASHBOARD}/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'welcomeTitle',
                        'welcomeMessage',
                        'defaultWidgetBackgroundColor',
                        'defaultWidgetTextColor',
                    ],
                    rlt: {
                        widgets: {
                            fld: [
                                'id',
                                'codeRef',
                                'order',
                                'title',
                                'widgetImageFileName',
                                'active',
                                // 'text',
                                // 'buttonText',
                                // 'buttonLink',
                                // 'showGroupId',
                                // 'backgroundColor',
                                // 'textColor',
                            ],
                        },
                    },
                },
            },
        });
    },
    // todo WM: opschonen
    //
    // updateDashboardSettings: dashboardSettings => {
    //     const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}`;
    //
    //     return axiosInstance.post(requestUrl, dashboardSettings);
    // },

    updateDashboardWidget: data => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/widget`;

        return axiosInstance.post(requestUrl, data);
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
