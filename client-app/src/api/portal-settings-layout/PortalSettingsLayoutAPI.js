import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_LAYOUT = `portal-settings-layout`;

export default {
    fetchPortalSettingsLayouts: () => {
        const requestUrl = `jory/portal-settings-layout`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'isDefault'],
                },
            },
        });
    },
};
