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

    syncStateAllMembersLaposta: id => {
        const requestUrl = `cooperation/${id}/sync-state-all-members-laposta`;

        return axiosInstance.post(requestUrl);
    },
};
