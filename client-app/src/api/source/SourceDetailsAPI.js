import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_SOURCE = `source`;

export default {
    fetchSourceDetails: id => {
        const requestUrl = `jory/source/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name'],
                },
            },
        });
    },

    updateSource: source => {
        const requestUrl = `${URL_SOURCE}/${source.id}`;

        return getAxiosInstance().post(requestUrl, source);
    },
};
