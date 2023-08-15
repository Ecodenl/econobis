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

    update: (id, payload) => {
        const requestUrl = `cooperation/${id}`;

        return axiosInstance.post(requestUrl, payload);
    },

    createHoomCampaign: payload => {
        const requestUrl = `cooperation-hoom-campaign`;

        return axiosInstance.post(requestUrl, payload);
    },

    updateHoomCampaign: (hoomCampaignId, payload) => {
        const requestUrl = `cooperation-hoom-campaign/${hoomCampaignId}`;

        return axiosInstance.post(requestUrl, payload);
    },

    deleteHoomCampaign: hoomCampaignId => {
        const requestUrl = `cooperation-hoom-campaign/${hoomCampaignId}/delete`;

        return axiosInstance.post(requestUrl);
    },

    syncAllWithLaposta: id => {
        const requestUrl = `cooperation/${id}/sync-all-with-laposta`;

        return axiosInstance.post(requestUrl);
    },
};
