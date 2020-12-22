import axiosInstance from '../default-setup/AxiosInstance';

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
