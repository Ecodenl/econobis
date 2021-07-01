import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

export default {
    fetchDetails: function() {
        const requestUrl = `cooperation`;

        return axiosInstance.get(requestUrl);
    },

    create: payload => {
        const requestUrl = `cooperation`;

        return axiosInstance.post(requestUrl, payload);
    },

    update: (id, payload) => {
        const requestUrl = `cooperation/${id}`;

        return axiosInstance.post(requestUrl, payload);
    },

    syncAllWithLaposta: id => {
        const requestUrl = `cooperation/${id}/sync-all-with-laposta`;

        return axiosInstance.post(requestUrl);
    },
};
