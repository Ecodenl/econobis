import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_CAMPAIGN = `/campaign`;

export default {
    fetchCampaign: ({ id }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchCampaignIntakes: ({ id, page }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/intakes?page=${page}`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchCampaignOpportunities: ({ id, page }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/opportunities?page=${page}`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchCampaignWorkflowStatuses: ({ campaignId, workflowForType }) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/workflow-statuses/${workflowForType}`;

        return getAxiosInstance().get(requestUrl);
    },

    updateCampaign: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;

        return getAxiosInstance().post(requestUrl, data);
    },
    updateCampaignInspection: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/inspection/${id}`;

        return getAxiosInstance().post(requestUrl, data);
    },
    updateCampaignWorkflowSetting: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/workflow-setting/${id}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    storeCampaign: data => {
        const requestUrl = `${URL_CAMPAIGN}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    deleteCampaign: id => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    attachResponse: (campaignId, contactId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/response/${contactId}/attach`;

        return getAxiosInstance().post(requestUrl);
    },

    detachResponse: (campaignId, contactId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/response/${contactId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    attachOrganisation: (campaignId, organisationId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/organisation/${organisationId}/attach`;

        return getAxiosInstance().post(requestUrl);
    },

    detachOrganisation: (campaignId, organisationId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/organisation/${organisationId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    attachCoach: (campaignId, coachId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/coach/${coachId}/attach`;

        return getAxiosInstance().post(requestUrl);
    },

    detachCoach: (campaignId, coachId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/coach/${coachId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    attachProjectManager: (campaignId, projectManagerId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/projectManager/${projectManagerId}/attach`;

        return getAxiosInstance().post(requestUrl);
    },

    detachProjectManager: (campaignId, projectManagerId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/projectManager/${projectManagerId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    attachExternalParty: (campaignId, externalPartyId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/externalParty/${externalPartyId}/attach`;

        return getAxiosInstance().post(requestUrl);
    },

    detachExternalParty: (campaignId, externalPartyId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/externalParty/${externalPartyId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    updateCampaignOwner: (campaignId, userId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/owner/${userId}/associate`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteCampaignWorkflow: campaignWorkflowId => {
        //todo van Patrick: netter om deze ook naar /${campaignId} te laten linken?
        const requestUrl = `${URL_CAMPAIGN}/campaignworkflow/${campaignWorkflowId}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    addCampaignWorkflow: campaignWorkflow => {
        //todo van Patrick: netter om deze ook naar /${campaignId} te laten linken?
        const requestUrl = `${URL_CAMPAIGN}/campaignworkflow/add`;

        return getAxiosInstance().post(requestUrl, campaignWorkflow);
    },

    editCampaignWorkflow: (campaignWorkflowId, campaignWorkflow) => {
        //todo van Patrick: netter om deze ook naar /${campaignId} te laten linken?
        const requestUrl = `${URL_CAMPAIGN}/campaignworkflow/${campaignWorkflowId}/edit`;

        return getAxiosInstance().post(requestUrl, campaignWorkflow);
    },
};
