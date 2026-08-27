import getAxiosInstance from '../default-setup/AxiosInstance';

// todo WM: check / opschonen
//
const URL_PORTAL_SETTINGS_DASHBOARD = `portal-settings-dashboard`;
const URL_PORTAL_SETTINGS_DASHBOARD_WIDGET = `portal-settings-dashboard-widget`;

export default {
    fetchPortalSettingsDashboardDetails: id => {
        const requestUrl = `jory/${URL_PORTAL_SETTINGS_DASHBOARD}/${id}`;

        return getAxiosInstance().get(requestUrl, {
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
                                'text',
                                'buttonText',
                                'buttonLink',
                                'showGroupId',
                                'hideGroupId',
                                'backgroundColor',
                                'textColor',
                                'backgroundColorUsed',
                                'textColorUsed',
                            ],
                        },
                    },
                },
            },
        });
    },
    updatePortalSettingsDashboard: dashboardSettings => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/${dashboardSettings.id}`;

        return getAxiosInstance().post(requestUrl, dashboardSettings);
    },

    fetchPortalSettingsDashboardWidgetDetails: id => {
        const requestUrl = `jory/portal-settings-dashboard-widget/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'codeRef',
                        'order',
                        'title',
                        'widgetImageFileName',
                        'active',
                        'text',
                        'buttonText',
                        'buttonLink',
                        'showGroupId',
                        'hideGroupId',
                        'backgroundColor',
                        'textColor',
                        'backgroundColorUsed',
                        'textColorUsed',
                    ],
                    rlt: {
                        contactGroup: {
                            fld: ['name'],
                        },
                        hideForContactGroup: {
                            fld: ['name'],
                        },
                    },
                },
            },
        });
    },

    addPortalSettingsDashboardWidget: widget => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD_WIDGET}`;

        return getAxiosInstance().post(requestUrl, widget);
    },

    updatePortalSettingsDashboardWidget: (widgetId, widget) => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD_WIDGET}/${widgetId}`;

        return getAxiosInstance().post(requestUrl, widget);
    },

    deletePortalSettingsDashboardWidget: id => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD_WIDGET}/${id}/delete`;

        return getAxiosInstance().post(requestUrl, { id: id });
    },
};
