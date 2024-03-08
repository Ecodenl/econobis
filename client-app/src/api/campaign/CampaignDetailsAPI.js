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

    fetchCampaignWorkflowStatuses: ({ campaignId, workflowForType }) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/workflow-statuses/${workflowForType}`;

        return axiosInstance.get(requestUrl);
    },

    updateCampaign: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;

        return axiosInstance.post(requestUrl, data);
    },
    updateCampaignInspection: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/inspection/${id}`;

        return axiosInstance.post(requestUrl, data);
    },
    updateCampaignWorkflowSetting: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/workflow-setting/${id}`;

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

    attachCoach: (campaignId, coachId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/coach/${coachId}/attach`;

        return axiosInstance.post(requestUrl);
    },

    detachCoach: (campaignId, coachId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/coach/${coachId}/detach`;

        return axiosInstance.post(requestUrl);
    },

    attachProjectManager: (campaignId, projectManagerId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/projectManager/${projectManagerId}/attach`;

        return axiosInstance.post(requestUrl);
    },

    detachProjectManager: (campaignId, projectManagerId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/projectManager/${projectManagerId}/detach`;

        return axiosInstance.post(requestUrl);
    },

    attachExternalParty: (campaignId, externalPartyId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/externalParty/${externalPartyId}/attach`;

        return axiosInstance.post(requestUrl);
    },

    detachExternalParty: (campaignId, externalPartyId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/externalParty/${externalPartyId}/detach`;

        return axiosInstance.post(requestUrl);
    },

    updateCampaignOwner: (campaignId, userId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/owner/${userId}/associate`;

        return axiosInstance.post(requestUrl);
    },

    deleteCampaignWorkflow: campaignWorkflowId => {
        //todo van Patrick: netter om deze ook naar /${campaignId} te laten linken?
        const requestUrl = `${URL_CAMPAIGN}/campaignworkflow/${campaignWorkflowId}/delete`;

        return axiosInstance.post(requestUrl);
    },

    addCampaignWorkflow: campaignWorkflow => {
        //todo van Patrick: netter om deze ook naar /${campaignId} te laten linken?
        const requestUrl = `${URL_CAMPAIGN}/campaignworkflow/add`;

        return axiosInstance.post(requestUrl, campaignWorkflow);
    },

    editCampaignWorkflow: (campaignWorkflowId, campaignWorkflow) => {
        //todo van Patrick: netter om deze ook naar /${campaignId} te laten linken?
        const requestUrl = `${URL_CAMPAIGN}/campaignworkflow/${campaignWorkflowId}/edit`;

        return axiosInstance.post(requestUrl, campaignWorkflow);
    },
};
