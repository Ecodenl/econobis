import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_OPPORTUNITY_STATUS = `opportunity-status`;

const defaultFields = {
    fld: ['id', 'name', 'usesWf'],
    rlt: { emailTemplateWorkflow: [] },
};

export default {
    fetchOpportunityStatusDetails: id => {
        const requestUrl = `jory/opportunity-status/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateOpportunityStatus: opportunityStatus => {
        const requestUrl = `${URL_OPPORTUNITY_STATUS}/${opportunityStatus.id}`;
        return getAxiosInstance().post(requestUrl, opportunityStatus, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
