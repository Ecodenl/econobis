import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchDetails: function() {
        const requestUrl = `cooperation`;

        return axiosInstance.get(requestUrl);
    },

    create: payload => {
        const requestUrl = `cooperation`;

        return axiosInstance.post(requestUrl, payload);
    },

    update: payload => {
        const requestUrl = `cooperation/${payload.id}`;

        return axiosInstance.post(requestUrl, payload);
    },
};
