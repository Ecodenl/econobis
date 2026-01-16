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

    updateCleanupItem: (cleanupItemId, payload) => {
        const requestUrl = `cooperation-cleanup-item/${cleanupItemId}`;

        return getAxiosInstance().post(requestUrl, payload);
    },

    getExcludedGroups: function() {
        const requestUrl = `cooperation-cleanup-contacts-excluded-groups`;

        return getAxiosInstance().get(requestUrl);
    },

    createCleanupContactsExcludedGroup: payload => {
        const requestUrl = `cooperation-cleanup-contacts-excluded-group`;

        return getAxiosInstance().post(requestUrl, payload);
    },

    deleteCleanupContactsExcludedGroup: cleanupContactsExcludedGroupId => {
        const requestUrl = `cooperation-cleanup-contacts-excluded-group/${cleanupContactsExcludedGroupId}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    syncAllWithLaposta: id => {
        const requestUrl = `cooperation/${id}/sync-all-with-laposta`;

        return getAxiosInstance().post(requestUrl);
    },
};
