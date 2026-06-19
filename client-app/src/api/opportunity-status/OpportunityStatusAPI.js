import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchOpportunityStatus: () => {
        const requestUrl = `jory/opportunity-status`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'usesWf'],
                },
            },
        });
    },
};
