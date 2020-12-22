import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_LAYOUT = `portal-settings-layout`;

export default {
    fetchPortalSettingsLayoutDetails: id => {
        const requestUrl = `jory/portal-settings-layout/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'description',
                        'isDefault',
                        'portalLogoFileName',
                        'portalFaviconFileName',
                        'portalBackgroundColor',
                        'portalBackgroundTextColor',
                        'loginHeaderBackgroundColor',
                        'loginHeaderBackgroundTextColor',
                        'headerIconsColor',
                        'loginFieldBackgroundColor',
                        'loginFieldBackgroundTextColor',
                        'buttonColor',
                        'buttonTextColor',
                    ],
                },
            },
        });
    },

    newPortalSettingsLayout: portalSettingsLayout => {
        const requestUrl = URL_PORTAL_SETTINGS_LAYOUT;

        portalSettingsLayout.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, portalSettingsLayout);
    },

    updatePortalSettingsLayout: (portalSettingsLayoutId, portalSettingsLayout) => {
        const requestUrl = `${URL_PORTAL_SETTINGS_LAYOUT}/${portalSettingsLayoutId}`;

        return axiosInstance.post(requestUrl, portalSettingsLayout);
    },

    deletePortalSettingsLayout: id => {
        const requestUrl = `${URL_PORTAL_SETTINGS_LAYOUT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
