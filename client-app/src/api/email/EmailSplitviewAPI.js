import axiosInstance from '../default-setup/AxiosInstance';

const URL_EMAIL = `${URL_API}/api/email-splitview`;

export default {
    fetchSelectList: ({ filter, sorts, limit, offset }) => {
        const requestUrl = `${URL_EMAIL}/select-list`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [],
                    flt: filter,
                    srt: sorts,
                    lmt: limit,
                    ofs: offset,
                }
            },
        });
    },

    fetchEmail: id => {
        const requestUrl = `${URL_EMAIL}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data);
    },

    update: (id, attributes) => {
        const requestUrl = `${URL_EMAIL}/${id}`;

        return axiosInstance
            .post(requestUrl, attributes);
    }
};