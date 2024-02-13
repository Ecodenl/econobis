import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchOpportunityStatus: () => {
        const requestUrl = `jory/opportunity-status`;

        // todo WM: opschonen velden emailTemplateIdWf en numberOfDaysToSendEmail
        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'usesWf', 'emailTemplateIdWf', 'numberOfDaysToSendEmail'],
                },
            },
        });
    },
};
