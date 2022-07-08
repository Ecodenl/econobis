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
    updatePortalSettingsDashboard: dashboardSettings => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/${dashboardSettings.id}`;

        return axiosInstance.post(requestUrl, dashboardSettings);
    },

    addPortalSettingsDashboardWidget: widget => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD_WIDGET}`;

        return axiosInstance.post(requestUrl, widget);
    },

    updatePortalSettingsDashboardWidget: widget => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD_WIDGET}/${widget.id}`;

        return axiosInstance.post(requestUrl, widget);
    },

    removePortalSettingsDashboardWidget: id => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD_WIDGET}/${id}/delete`;

        return axiosInstance.post(requestUrl, { id: id });
    },
};
