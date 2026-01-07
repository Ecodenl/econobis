import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchSources: () => {
        const requestUrl = `jory/intake-source`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'nameCustom', 'visible'],
                },
            },
        });
    },
};
