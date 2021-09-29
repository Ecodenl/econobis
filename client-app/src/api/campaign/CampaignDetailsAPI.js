import axiosInstance from '../default-setup/AxiosInstance';

const URL_CAMPAIGN = `/campaign`;

export default {
    fetchCampaign: ({ id }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;

        return axiosInstance.get(requestUrl);
    },

    fetchCampaignIntakes: ({ id, page }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/intakes?page=${page}`;

        return axiosInstance.get(requestUrl);
    },

    fetchCampaignOpportunities: ({ id, page }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/opportunities?page=${page}`;

        return axiosInstance.get(requestUrl);
    },

    updateCampaign: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;

        return axiosInstance.post(requestUrl, data);
    },

    storeCampaign: data => {
        const requestUrl = `${URL_CAMPAIGN}`;

        return axiosInstance.post(requestUrl, data);
    },

    deleteCampaign: id => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    attachResponse: (campaignId, contactId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/response/${contactId}/attach`;

        return axiosInstance.post(requestUrl);
    },

    detachResponse: (campaignId, contactId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/response/${contactId}/detach`;

        return axiosInstance.post(requestUrl);
    },

    attachOrganisation: (campaignId, organisationId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/organisation/${organisationId}/attach`;

        return axiosInstance.post(requestUrl);
    },

    detachOrganisation: (campaignId, organisationId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/organisation/${organisationId}/detach`;

        return axiosInstance.post(requestUrl);
    },

    updateCampaignOwner: (campaignId, userId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/owner/${userId}/associate`;

        return axiosInstance.post(requestUrl);
    },
};
