import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_LAYOUT = `portal-settings-layout`;

export default {
    fetchPortalSettingsLayoutDetails: id => {
        const requestUrl = `jory/portal-settings-layout/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'description',
                        'isDefault',
                        'portalLogoFileName',
                        'portalLogoFileNameHeader',
                        'portalImageBgFileNameLogin',
                        'useTransparentBackgroundLogin',
                        'portalImageBgFileNameHeader',
                        'useTransparentBackgroundHeader',
                        'portalFaviconFileName',
                        'portalMainBackgroundColor',
                        'portalMainTextColor',
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

    fetchDefaultPortalSettingsLayoutDetails: () => {
        const requestUrl = `${URL_PORTAL_SETTINGS_LAYOUT}/default`;

        return getAxiosInstance().get(requestUrl);
    },

    newPortalSettingsLayout: portalSettingsLayout => {
        const requestUrl = URL_PORTAL_SETTINGS_LAYOUT;

        portalSettingsLayout.jory = JSON.stringify({
            fld: ['id'],
        });

        return getAxiosInstance().post(requestUrl, portalSettingsLayout);
    },

    updatePortalSettingsLayout: (portalSettingsLayoutId, portalSettingsLayout) => {
        const requestUrl = `${URL_PORTAL_SETTINGS_LAYOUT}/${portalSettingsLayoutId}`;

        return getAxiosInstance().post(requestUrl, portalSettingsLayout);
    },

    deletePortalSettingsLayout: id => {
        const requestUrl = `${URL_PORTAL_SETTINGS_LAYOUT}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
