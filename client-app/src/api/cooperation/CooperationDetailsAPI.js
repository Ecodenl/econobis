import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchDetails: function() {
        const requestUrl = `cooperation`;

        return getAxiosInstance().get(requestUrl);
    },

    create: payload => {
        const requestUrl = `cooperation`;

        return getAxiosInstance().post(requestUrl, payload);
    },

    update: (id, payload) => {
        const requestUrl = `cooperation/${id}`;

        return getAxiosInstance().post(requestUrl, payload);
    },

    createHoomCampaign: payload => {
        const requestUrl = `cooperation-hoom-campaign`;

        return getAxiosInstance().post(requestUrl, payload);
    },

    updateHoomCampaign: (hoomCampaignId, payload) => {
        const requestUrl = `cooperation-hoom-campaign/${hoomCampaignId}`;

        return getAxiosInstance().post(requestUrl, payload);
    },

    deleteHoomCampaign: hoomCampaignId => {
        const requestUrl = `cooperation-hoom-campaign/${hoomCampaignId}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    syncAllWithLaposta: id => {
        const requestUrl = `cooperation/${id}/sync-all-with-laposta`;

        return getAxiosInstance().post(requestUrl);
    },
};
